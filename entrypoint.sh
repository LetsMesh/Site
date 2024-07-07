#!/bin/bash

# Exit script in case of error
set -e

# Run Django migrations
pipenv run python manage.py makemigrations
pipenv run python manage.py migrate

# Start Daphne server
exec pipenv run uvicorn mesh.asgi:application --reload --host 0.0.0.0 --port 8000