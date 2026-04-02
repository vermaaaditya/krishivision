from __future__ import annotations
import os
import uuid
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
    CORS(app, origins=os.getenv("CORS_ORIGINS", "http://localhost:5173"))

    model_service = ModelService()
    firebase_service = FirebaseService()

    @app.get("/api/health")
    def health():
        return jsonify({
            "status": "ok",
            "firebase": firebase_service.enabled,
        }), 200

    @app.post("/api/predict")
    def predict():
        if "image" not in request.files:
            return jsonify({"error": "Missing 'image' file"}), 400

        file = request.files["image"]
        filename = secure_filename((file.filename or "").strip())
        if not filename:
            return jsonify({"error": "Image filename is required"}), 400

        ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
        if ext not in ALLOWED_EXTENSIONS:
            return jsonify({"error": "Unsupported file type. Use PNG or JPG."}), 400

        image_bytes = file.read()
        if not image_bytes:
            return jsonify({"error": "Uploaded file is empty"}), 400

        # Run ML prediction
        try:
            prediction = model_service.predict(
                image_bytes=image_bytes, filename=filename
            )
        except NotImplementedError:
            return jsonify({"error": "Model not ready — ML engineer needs to update classifier.py"}), 503
        except Exception as e:
            logger.exception("Model prediction failed")
            return jsonify({"error": str(e)}), 500

        prediction_id = str(uuid.uuid4())

        # Upload image to Storage
        image_url = firebase_service.upload_image(
            image_bytes=image_bytes,
            filename=filename,
            content_type=file.content_type or "image/jpeg",
            prediction_id=prediction_id,
        )

        # Save to Firestore
        persisted = firebase_service.save_prediction(
            prediction_id=prediction_id,
            filename=filename,
            content_type=file.content_type or "",
            size_bytes=len(image_bytes),
            image_url=image_url,
            prediction=prediction,
        )

        if firebase_service.enabled and not persisted:
            logger.warning("Prediction generated but Firestore persistence failed")

        return jsonify({
            **prediction,
            "id": prediction_id,
            "image_url": image_url,
        }), 200

    @app.get("/api/predictions")
    def get_predictions():
        limit = min(int(request.args.get("limit", 20)), 100)
        predictions = firebase_service.get_predictions(limit=limit)
        return jsonify(predictions), 200

    return app


if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    app = create_app()
    app.run(host="0.0.0.0", port=port)
