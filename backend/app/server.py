from __future__ import annotations

import os
import logging
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename

from .firebase_service import FirebaseService
from .model_service import ModelService

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}
logger = logging.getLogger(__name__)


def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app)

    model_service = ModelService()
    firebase_service = FirebaseService()

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok"}), 200

    @app.post("/api/predict")
    def predict():
        if "image" not in request.files:
            return jsonify({"error": "Missing 'image' file"}), 400

        file = request.files["image"]
        filename = secure_filename((file.filename or "").strip())
        if not filename:
            return jsonify({"error": "Image file name is required"}), 400

        extension = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
        if extension not in ALLOWED_EXTENSIONS:
            return jsonify({"error": "Unsupported file type. Use PNG or JPG."}), 400

        image_bytes = file.read()
        if not image_bytes:
            return jsonify({"error": "Uploaded file is empty"}), 400

        prediction = model_service.predict(image_bytes=image_bytes, filename=filename)
        persisted = firebase_service.save_prediction(
            filename=filename,
            content_type=file.content_type or "",
            size_bytes=len(image_bytes),
            prediction=prediction,
        )
        if firebase_service.enabled and not persisted:
            logger.warning("Prediction generated but Firebase persistence failed")
        return jsonify(prediction), 200

    @app.post("/api/predict_tabular")
    def predict_tabular():
        data = request.get_json()
        if not data:
            return jsonify({"error": "Missing JSON body"}), 400
        
        # We can add explicit validation here or rely on the model dropping it.
        # But for robustness, let's just pass data directly to model.
        try:
            prediction = model_service.predict_tabular(features=data)
        except Exception as e:
            logger.exception("Model prediction failed")
            return jsonify({"error": str(e)}), 400

        # We can try to persist it if useful, but we skip firebase for simplicity.
        return jsonify(prediction), 200

    return app


if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    app = create_app()
    app.run(host="0.0.0.0", port=port)
