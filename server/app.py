from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, upgrade
from config import Config
from extensions import db, migrate
from routes.articles import articles_bp
from routes.documents import documents_bp
from routes.media import media_bp

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, resources={r"/*": {
    "origins": "http://127.0.0.1:5174",
    "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    "allow_headers": "*",
    "supports_credentials": True
}})

db.init_app(app)
migrate.init_app(app, db)

app.register_blueprint(articles_bp, url_prefix='/articles')
app.register_blueprint(documents_bp, url_prefix='/documents')
app.register_blueprint(media_bp, url_prefix='/media')

from models import Article, Document

@app.route("/")
def home():
    return jsonify({"message": "Knowledge Base API running"}), 200

@app.errorhandler(405)
def method_not_allowed(e):
    return jsonify({"text": "Method Not Allowed"}), 405

with app.app_context():
    upgrade()
    from seed import seed_data
    seed_data()