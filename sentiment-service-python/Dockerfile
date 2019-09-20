FROM python:3.7-slim

RUN pip install Flask gunicorn google-cloud-language==1.1.1 firebase-admin

WORKDIR /app
COPY . .

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 app:app
