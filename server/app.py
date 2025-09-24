from flask import Flask, request, make_response, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import MetaData
from flask_cors import CORS 
from flask_migrate import Migrate
from flask_restful import Api
from extensions import db, migrate  # import from extensions


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///knowbase.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

     
    db.init_app(app)
    migrate.init_app(app, db)

    # Instantiate REST API
    api = Api(app)

    # Instantiate CORS
    CORS(app)


    # Import models so migrations see them
    from models import User, Role, Permission, Category, Article, Tag, ArticleMedia

    @app.route("/")
    def home():
        return jsonify({"message": "Knowledge Base API running"}), 200
    
    @app.route('/articles', methods=['GET'])
    def get_articles():
        articles = Article.query.all()
        return jsonify([article.serialize() for article in articles]), 200

    # Optional: catch-all for unsupported methods (for the app, not individual route)
    @app.errorhandler(405)
    def method_not_allowed(e):
        return jsonify({"text": "Method Not Allowed"}), 405


    return app
