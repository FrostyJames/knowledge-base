from flask import request, jsonify, make_response
from models import db, Permission

def register_permission_routes(app):

    # GET all permissions
    @app.route('/permissions', methods=['GET'])
    def get_permissions():
        permissions = Permission.query.all()
        return make_response(jsonify([p.serialize() for p in permissions]), 200)

    # CREATE permission
    @app.route('/permissions', methods=['POST'])
    def create_permission():
        data = request.get_json()

        if not data or "name" not in data:
            return make_response(jsonify({"error": "Permission name is required"}), 400)

        new_permission = Permission(
            name=data.get("name"),
            description=data.get("description")
        )
        db.session.add(new_permission)
        db.session.commit()

        return make_response(jsonify(new_permission.serialize()), 201)
    
