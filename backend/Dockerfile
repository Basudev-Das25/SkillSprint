FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Pre-download spaCy model to avoid runtime issues
RUN python -m spacy download en_core_web_sm

COPY . .

ENV GEMINI_API_KEY=${GEMINI_API_KEY}

EXPOSE 8000

# Use sh to execute uvicorn so it can pick up the $PORT env var correctly
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
