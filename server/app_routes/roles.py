from flask import request, jsonify, make_response
from models import db, Role

def register_role_routes(app):

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