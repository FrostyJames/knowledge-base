#!/bin/bash
export FLASK_APP=app:app
flask db upgrade
gunicorn app:app --bind 0.0.0.0:$PORT#!/bin/bash
export FLASK_APP=app:app
flask db upgrade
gunicorn app:app --bind 0.0.0.0:$PORT
