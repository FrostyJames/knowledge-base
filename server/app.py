from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, upgrade
from config import Config
from extensions import db, migrate
from routes.articles import articles_bp
from routes.documents import documents_bp
from routes.media import media_bp  # ✅ Add this line

app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS globally with full method support
CORS(app, resources={r"/*": {
    "origins": "http://127.0.0.1:5174",
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
app.register_blueprint(media_bp, url_prefix='/media')  # ✅ Add this line

# Import models so migrations detect them
from models import User, Role, Permission, Category, Article, Tag, ArticleMedia

# Health check route
@app.route("/")
def home():
    return jsonify({"message": "Knowledge Base API running"}), 200

# Register all route modules
from app_routes.articles import register_article_routes
register_article_routes(app)

from app_routes.categories import register_category_routes
register_category_routes(app)

from app_routes.roles import register_role_routes
register_role_routes(app)

from app_routes.permissions import register_permission_routes
register_permission_routes(app)

from app_routes.media import register_media_routes
register_media_routes(app)

# Catch-all for unsupported methods
@app.errorhandler(405)
def method_not_allowed(e):
    return jsonify({"text": "Method Not Allowed"}), 405

# Ensure migrations run on startup
with app.app_context():
    upgrade()

    # Always run seed
    from seed import seed_data
    seed_data()