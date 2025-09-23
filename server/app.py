from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import MetaData
from flask_cors import CORS 
from flask_migrate import Migrate
from flask_restful import Api

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///knowbase.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Define metadata, instantiate db
    metadata = MetaData(naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    })

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
        return {"message": "Knowledge Base API running"}

    return app
