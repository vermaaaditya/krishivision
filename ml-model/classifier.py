from __future__ import annotations

import os
import joblib
import pandas as pd
from typing import Dict, Any

MODEL_NAME = os.getenv("MODEL_NAME", "tabular-crop-classifier")

# We want the path to ml-model/artifacts/tabular_model.joblib
_current_dir = os.path.dirname(__file__)
MODEL_PATH = os.path.join(_current_dir, "artifacts", "tabular_model.joblib")

_model = None

def get_model():
    global _model
    if _model is None:
        if os.path.exists(MODEL_PATH):
            _model = joblib.load(MODEL_PATH)
        else:
            raise RuntimeError(f"Model not found at {MODEL_PATH}")
    return _model

def predict_tabular(features: Dict[str, Any]) -> Dict[str, object]:
    model = get_model()
    df = pd.DataFrame([features])
    prediction = model.predict(df)[0]
    
    probabilities = {cls: prob for cls, prob in zip(model.classes_, model.predict_proba(df)[0])}
    max_prob = max(probabilities.values())
    
    recommendations = {
        "None": "No immediate action required. Continue routine monitoring.",
        "Mild": "Isolate affected plants and monitor closely.",
        "Moderate": "Apply targeted fungicide/treatment to affected areas.",
        "Severe": "Immediate action needed. Remove infected plants and treat entire field."
    }
    
    return {
        "model": MODEL_NAME,
        "model_path": MODEL_PATH,
        "disease": prediction,
        "confidence": float(max_prob),
        "recommendation": recommendations.get(prediction, "Consult an agricultural expert."),
        "probabilities": {k: float(v) for k, v in probabilities.items()}
    }

def predict(*, image_bytes: bytes, filename: str) -> Dict[str, object]:
    # Legacy wrapper if any old test still wants to call it.
    raise NotImplementedError("Image prediction is replaced by predict_tabular.")
