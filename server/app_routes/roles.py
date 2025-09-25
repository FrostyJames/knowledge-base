from flask import request, jsonify, make_response
from models import db, Role

def register_role_routes(app):

    # GET all roles
    @app.route('/roles', methods=['GET'])
    def get_roles():
        roles = Role.query.all()
        return make_response(
            jsonify([role.serialize() for role in roles]), 
            200)

    # POST/CREATE a role
    @app.route('/roles', methods=['POST'])
    def create_role():
        data = request.get_json()

        if not data or "name" not in data:
            return make_response(jsonify({"error": "Role name is required"}), 400)

        new_role = Role(
            name=data.get("name"),
            description=data.get("description")
        )

        db.session.add(new_role)
        db.session.commit()

        return make_response(jsonify(new_role.serialize()), 201)

    
    # PATCH/EDIT role
    @app.route('/roles/<int:role_id>', methods=['PATCH'])
    def edit_role(role_id):
        role = Role.query.get(role_id)
        if not role:
            return make_response(jsonify({"error": "Role not found"}), 404)

        data = request.get_json()
        if "name" in data:
            role.name = data["name"]
        if "description" in data:
            role.description = data["description"]

        db.session.commit()
        return make_response(jsonify(role.serialize()), 200)
    
     # DELETE role
    @app.route('/roles/<int:role_id>', methods=['DELETE'])
    def delete_role(role_id):
        role = Role.query.get(role_id)
        if not role:
            return make_response(jsonify({"error": "Role not found"}), 404)

        db.session.delete(role)
        db.session.commit()
        return make_response(jsonify({"message": "Role deleted"}), 200)