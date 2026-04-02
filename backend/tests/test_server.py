from io import BytesIO

from app.server import create_app


def test_health_endpoint() -> None:
    app = create_app()
    client = app.test_client()

    response = client.get("/api/health")

    assert response.status_code == 200
    assert response.get_json() == {"status": "ok"}


def test_predict_success() -> None:
    app = create_app()
    client = app.test_client()

    response = client.post(
        "/api/predict",
        data={"image": (BytesIO(b"sample-image"), "leaf.jpg")},
        content_type="multipart/form-data",
    )

    assert response.status_code == 200
    payload = response.get_json()
    assert "disease" in payload
    assert "confidence" in payload
    assert "recommendation" in payload


def test_predict_rejects_invalid_extension() -> None:
    app = create_app()
    client = app.test_client()

    response = client.post(
        "/api/predict",
        data={"image": (BytesIO(b"sample-image"), "leaf.gif")},
        content_type="multipart/form-data",
    )

    assert response.status_code == 400
    assert "Unsupported file type" in response.get_json()["error"]
