from __future__ import annotations

import os
from typing import Dict

MODEL_NAME = os.getenv("MODEL_NAME", "baseline-crop-classifier")
MODEL_PATH = os.getenv("MODEL_PATH", "ml-model/artifacts/model.bin")


def predict(*, image_bytes: bytes, filename: str) -> Dict[str, object]:
    if not image_bytes:
        raise ValueError("image_bytes must not be empty")

    disease_index = (sum(image_bytes) + len(filename)) % 3
    disease_map = {
        0: ("Healthy", 0.93, "No immediate action required. Continue routine monitoring."),
        1: ("Leaf Spot", 0.86, "Isolate affected plants and apply recommended fungicide."),
        2: ("Rust", 0.82, "Remove infected leaves and improve field airflow."),
    }
    disease, confidence, recommendation = disease_map[disease_index]

    return {
        "model": MODEL_NAME,
        "model_path": MODEL_PATH,
        "disease": disease,
        "confidence": confidence,
        "recommendation": recommendation,
    }
