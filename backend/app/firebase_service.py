from __future__ import annotations
import logging
import os
import uuid
from datetime import datetime, timezone
from typing import Any, Dict, Optional

import firebase_admin
from firebase_admin import credentials, firestore, storage

logger = logging.getLogger(__name__)


class FirebaseService:
    def __init__(self) -> None:
        self._client, self._bucket = self._init_client()

    def _init_client(self):
        credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
        bucket_name = os.getenv("FIREBASE_STORAGE_BUCKET")  # e.g. yourproject.appspot.com

        if not credentials_path:
            logger.warning("GOOGLE_APPLICATION_CREDENTIALS not set — Firebase disabled")
            return None, None

        try:
            app = firebase_admin.get_app()
        except ValueError:
            app = firebase_admin.initialize_app(
                credentials.Certificate(credentials_path),
                {"storageBucket": bucket_name} if bucket_name else {}
            )

        client = firestore.client(app=app)
        bucket = storage.bucket(app=app) if bucket_name else None

        if not bucket_name:
            logger.warning("FIREBASE_STORAGE_BUCKET not set — image upload disabled")

        return client, bucket

    @property
    def enabled(self) -> bool:
        return self._client is not None

    def upload_image(
        self,
        *,
        image_bytes: bytes,
        filename: str,
        content_type: str,
        prediction_id: str,
    ) -> Optional[str]:
        """Upload image to Firebase Storage, return public URL or None."""
        if not self._bucket:
            return None
        try:
            blob = self._bucket.blob(f"predictions/{prediction_id}/{filename}")
            blob.upload_from_string(image_bytes, content_type=content_type)
            blob.make_public()
            return blob.public_url
        except Exception:
            logger.exception("Failed to upload image to Firebase Storage")
            return None

    def save_prediction(
        self,
        *,
        prediction_id: str,
        filename: str,
        content_type: str,
        size_bytes: int,
        image_url: Optional[str],
        prediction: Dict[str, Any],
    ) -> bool:
        """Save prediction metadata + result to Firestore."""
        if not self._client:
            return False
        try:
            self._client.collection("predictions").document(prediction_id).set({
                "id": prediction_id,
                "filename": filename,
                "content_type": content_type,
                "size_bytes": size_bytes,
                "image_url": image_url,
                "disease": prediction.get("disease"),
                "confidence": prediction.get("confidence"),
                "recommendation": prediction.get("recommendation"),
                "model": prediction.get("model"),
                "created_at": datetime.now(timezone.utc),
            })
            return True
        except Exception:
            logger.exception("Failed to persist prediction to Firestore")
            return False

    def get_predictions(self, limit: int = 20) -> list[Dict[str, Any]]:
        """Fetch recent predictions ordered by time descending."""
        if not self._client:
            return []
        try:
            docs = (
                self._client.collection("predictions")
                .order_by("created_at", direction=firestore.Query.DESCENDING)
                .limit(limit)
                .stream()
            )
            results = []
            for doc in docs:
                d = doc.to_dict()
                # Convert Firestore timestamp to ISO string for JSON serialisation
                if hasattr(d.get("created_at"), "isoformat"):
                    d["created_at"] = d["created_at"].isoformat()
                results.append(d)
            return results
        except Exception:
            logger.exception("Failed to fetch predictions from Firestore")
            return []
