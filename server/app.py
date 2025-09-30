from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, upgrade
from config import Config
from extensions import db, migrate
from routes.articles import articles_bp
from routes.documents import documents_bp
from routes.media import media_bp
from models import Article, Document

app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS for frontend integration (local + deployed)
CORS(app, resources={r"/*": {
    "origins": [
        "http://127.0.0.1:5174",  # Local dev
        "https://knowledge-base-alpha-nine.vercel.app",  # Vercel frontend
    ],
    "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    "allow_headers": "*",
    "supports_credentials": True
}})

# Initialize extensions
db.init_app(app)
migrate.init_app(app, db)

# Register blueprints
app.register_blueprint(articles_bp, url_prefix='/articles')
app.register_blueprint(documents_bp, url_prefix='/documents')
app.register_blueprint(media_bp, url_prefix='/media')

# Health check route
@app.route("/")
def home():
    return jsonify({"message": "Knowledge Base API running"}), 200

# Catch-all for unsupported methods
@app.errorhandler(405)
def method_not_allowed(e):
    return jsonify({"error": "Method Not Allowed"}), 405

# Optional: Run migrations and seed data on startup
# with app.app_context():
#     upgrade()
#     try:
#         from seed import seed_data
#         seed_data()
#     except Exception as e:
#         print("Seed error:", e)