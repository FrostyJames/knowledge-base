from datetime import datetime, timezone
from flask import request, jsonify, make_response
from models import Article, Tag, Category
from extensions import db

def register_category_routes(app):

    # POST/CREATE a category
    @app.route('/categories', methods=['POST'])
    def create_category():
        data = request.get_json()
        new_category = Category(
            name=data.get("name"),
            description=data.get("description"),
            parent_id=data.get("parent_id")
        )

        db.session.add(new_category)
        db.session.commit()
        return make_response(jsonify(new_category.to_dict()), 201)