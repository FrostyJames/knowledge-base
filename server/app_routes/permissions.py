from flask import Blueprint, request, jsonify, make_response
from models import db, Permission

permissions_bp = Blueprint('permissions', __name__)

# GET all permissions
@permissions_bp.route('/permissions', methods=['GET'])
def get_permissions():
    permissions = Permission.query.all()
    return make_response(jsonify([p.serialize() for p in permissions]), 200)

# CREATE permission
@permissions_bp.route('/permissions', methods=['POST'])
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

# PATCH/EDIT permission
@permissions_bp.route('/permissions/<int:permission_id>', methods=['PATCH'])
def edit_permission(permission_id):
    permission = Permission.query.get(permission_id)
    if not permission:
        return make_response(jsonify({"error": "Permission not found"}), 404)

    data = request.get_json()
    if "name" in data:
        permission.name = data["name"]
    if "description" in data:
        permission.description = data["description"]

    db.session.commit()
    return make_response(jsonify(permission.serialize()), 200)

# DELETE permission
@permissions_bp.route('/permissions/<int:permission_id>', methods=['DELETE'])
def delete_permission(permission_id):
    permission = Permission.query.get(permission_id)
    if not permission:
        return make_response(jsonify({"error": "Permission not found"}), 404)

    db.session.delete(permission)
    db.session.commit()
    return make_response(jsonify({"message": "Permission deleted"}), 200)
