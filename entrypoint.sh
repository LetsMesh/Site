#!/bin/bash

# Exit script in case of error
set -e

# Run Django migrations
pipenv run python manage.py makemigrations
pipenv run python manage.py migrate

# Start Daphne server
exec pipenv run daphne -b 0.0.0.0 -p 8000 mesh.asgi:application