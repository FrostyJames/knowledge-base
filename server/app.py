from flask import Flask
from flask_cors import CORS
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

@app.route('/')
def home():
    return 'Welcome to KnowBase API!'