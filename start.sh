#!/bin/bash
cd server
export FLASK_APP=app:app
python3 -m flask db upgrade
python3 -m gunicorn app:app --bind 0.0.0.0:$PORT