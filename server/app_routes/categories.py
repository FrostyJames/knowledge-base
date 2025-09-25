from datetime import datetime, timezone
from flask import request, jsonify, make_response
from models import Article, Tag, Category
from extensions import db

def register_category_routes(app):

    # POST/CREATE a category
    @app.route('/categories', methods=['POST'])
    def create_category():
        data = request.get_json()

        if not data or "name" not in data:
            return make_response(jsonify({"error": "Category name is required"}), 400)

        parent_id = data.get("parent_id")

        # Validate parent_id (if provided)
        if parent_id is not None:
            parent = Category.query.get(parent_id)
            if not parent:
                return make_response(jsonify({"error": "Parent category not found"}), 404)
        else:
            parent = None

        new_category = Category(
            name=data.get("name"),
            description=data.get("description"),
            parent_id=parent.id if parent else None
        )

        db.session.add(new_category)
        db.session.commit()
        return make_response(jsonify(new_category.to_dict()), 201)