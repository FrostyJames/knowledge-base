#!/bin/bash
cd server
export FLASK_APP=app:app
python -m flask db upgrade
python -m gunicorn app:app --bind 0.0.0.0:$PORT