from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, upgrade
from flask_cors import CORS
from flask_restful import Api
from extensions import db, migrate

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///knowbase.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    migrate.init_app(app, db)

    # ✅ Enable CORS for your frontend origin
    CORS(app, origins=["http://127.0.0.1:5173"], supports_credentials=True)

    # Instantiate REST API
    api = Api(app)

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

    return app
