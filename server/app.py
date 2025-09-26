# server/app.py
from flask import Flask, jsonify
from flask_login import current_user
from config import Config
from extensions import db, migrate, login_manager, cors

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
migrate.init_app(app, db)
login_manager.init_app(app)
login_manager.login_view = 'auth.login'
login_manager.login_message = 'Please log in to access this page.'

# CORS configuration
cors.init_app(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

# Register blueprints
from auth import auth_bp
app.register_blueprint(auth_bp, url_prefix='/auth')

# Import and register app_routes blueprints
try:
    from app_routes.articles import articles_bp
    from app_routes.categories import categories_bp
    from app_routes.media import media_bp
    from app_routes.permissions import permissions_bp
    from app_routes.roles import roles_bp
    
    app.register_blueprint(articles_bp, url_prefix='/api')
    app.register_blueprint(categories_bp, url_prefix='/api')
    app.register_blueprint(media_bp, url_prefix='/api')
    app.register_blueprint(permissions_bp, url_prefix='/api')
    app.register_blueprint(roles_bp, url_prefix='/api')
except ImportError as e:
    print(f"Note: Some app_routes not available: {e}")

# Import models for migrations
from models import User, Role, Permission, Category, Article, Tag, ArticleMedia

# Basic routes
@app.route("/")
def home():
    return jsonify({"message": "Knowledge Base API running"}), 200

# Protected route example
@app.route("/protected")
def protected():
    if current_user.is_authenticated:
        return jsonify({
            'message': f'Hello {current_user.name}!',
            'user': current_user.serialize()
        }), 200
    return jsonify({'error': 'Not authenticated'}), 401

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True)