# KrishiVision Architecture

## Workflow

Frontend (React) → API Layer (Fetch) → Backend (Flask) → ML Model (Crop Disease Classifier)

## Service boundaries

- **Frontend (`/frontend`)**
  - Handles image selection, preview, and result rendering.
  - Uses `src/api/client.js` as the single API layer for backend communication.
- **Backend (`/backend`)**
  - Exposes HTTP API endpoints (`/api/health`, `/api/predict`).
  - Validates uploads and invokes the ML classifier.
- **ML Model (`/ml-model`)**
  - Contains prediction logic in `classifier.py`.
  - Is only called by backend code.

## API contract

`POST /api/predict`

- Request: `multipart/form-data`
  - `image`: JPG/PNG file
- Success response (200):
  - `model` (string)
  - `model_path` (string)
  - `disease` (string)
  - `confidence` (number between 0 and 1)
  - `recommendation` (string)
- Error response (400):
  - `error` (string)
