from __future__ import annotations

import os
from datetime import datetime, timezone
from typing import Any, Dict

import firebase_admin
from firebase_admin import credentials, firestore


class FirebaseService:
    def __init__(self) -> None:
        self._client = self._init_client()

    def _init_client(self):
        credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
        if not credentials_path:
            return None

        try:
            app = firebase_admin.get_app()
        except ValueError:
            app = firebase_admin.initialize_app(credentials.Certificate(credentials_path))

        return firestore.client(app=app)

    @property
    def enabled(self) -> bool:
        return self._client is not None

    def save_prediction(
        self,
        *,
        filename: str,
        content_type: str,
        size_bytes: int,
        prediction: Dict[str, Any],
    ) -> None:
        if not self._client:
            return

        self._client.collection("predictions").add(
            {
                "filename": filename,
                "content_type": content_type,
                "size_bytes": size_bytes,
                "prediction": prediction,
                "created_at": datetime.now(timezone.utc),
            }
        )
