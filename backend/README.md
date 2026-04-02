# Backend (Flask)

## Run locally

```bash
cd /home/runner/work/krishivision/krishivision/backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m app.server
```

Backend serves:
- `GET /api/health`
- `POST /api/predict` (multipart form-data with `image`)

## Test

```bash
cd /home/runner/work/krishivision/krishivision/backend
PYTHONPATH=. pytest
```
