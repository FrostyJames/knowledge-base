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

        # Category cannot be its own parent
        if parent_id is not None and "id" in data and parent_id == data["id"]:
            return make_response(jsonify({"error": "Category cannot be its own parent"}), 400)

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
        return make_response(jsonify(new_category.serialize()), 201)
    
    # PATCH/UPDATE a category
    @app.route('/categories/<int:category_id>', methods=['PATCH'])
    def update_category(category_id):
        category = Category.query.get(category_id)
        if not category:
            return make_response(jsonify({"error": "Category not found"}), 404)

        data = request.get_json()

        # Update name
        if "name" in data:
            category.name = data["name"]

        # Update description
        if "description" in data:
            category.description = data["description"]

        # Update parent_id
        if "parent_id" in data:
            parent_id = data["parent_id"]

            if parent_id == category.id:
                return make_response(
                    jsonify({"error": "Category cannot be its own parent"}),
                    400,
                )

            if parent_id is not None:
                parent = Category.query.get(parent_id)
                if not parent:
                    return make_response(
                        jsonify({"error": "Parent category not found"}), 404
                    )
                category.parent_id = parent.id
            else:
                category.parent_id = None

        db.session.commit()
        return make_response(jsonify(category.serialize()), 200)
    
    # DELETE a category
    @app.route('/categories/<int:category_id>', methods=['DELETE'])
    def delete_category(category_id):
        category = Category.query.get(category_id)
        if not category:
            return make_response(jsonify({"error": "Category not found"}), 404)

        # check if category has children
        if category.children:
            return make_response(
                jsonify({"error": "Cannot delete category with subcategories"}), 400
            )

        # check if category has articles
        if category.articles:
            return make_response(
                jsonify({"error": "Cannot delete category with articles"}), 400
            )

        db.session.delete(category)
        db.session.commit()

        return make_response(jsonify({"message": "Category deleted successfully"}), 200)