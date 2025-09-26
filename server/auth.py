# server/auth.py
from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, current_user
from models import User, Role
from extensions import db
from flask_cors import CORS

auth_bp = Blueprint('auth', __name__)
CORS(auth_bp)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password are required'}), 400
        
        # Check if user already exists
        existing_user = User.query.filter_by(email=data.get('email')).first()
        if existing_user:
            return jsonify({'error': 'Email already exists'}), 400
        
        user = User(
            name=data.get('name', data.get('email').split('@')[0]),
            email=data.get('email')
        )
        user.set_password(data.get('password'))

        # Assign role based on email local part
        local_part = data.get('email').split('@')[0].lower()
        if 'admin' in local_part:
            role = Role.query.filter_by(name='Admin').first()
        elif 'editor' in local_part:
            role = Role.query.filter_by(name='Editor').first()
        else:
            role = Role.query.filter_by(name='Employee').first()
        if role:
            user.roles.append(role)
        
        db.session.add(user)
        db.session.commit()
        
        # Log the user in after registration
        login_user(user)
        
        return jsonify({
            'message': 'User created successfully',
            'user': user.serialize()
        }), 201
        
    except Exception as e:
        return jsonify({'error': 'Registration failed'}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password are required'}), 400
        
        user = User.query.filter_by(email=data.get('email')).first()
        
        if user and user.check_password(data.get('password')):
            login_user(user)
            
            return jsonify({
                'message': 'Login successful',
                'user': user.serialize()
            }), 200
        
        return jsonify({'error': 'Invalid email or password'}), 401
        
    except Exception as e:
        return jsonify({'error': 'Login failed'}), 500

@auth_bp.route('/logout', methods=['POST'])
def logout():
    try:
        logout_user()
        return jsonify({'message': 'Logout successful'}), 200
    except Exception as e:
        return jsonify({'error': 'Logout failed'}), 500

@auth_bp.route('/me', methods=['GET'])
def get_current_user():
    if current_user.is_authenticated:
        return jsonify({'user': current_user.serialize()}), 200
    return jsonify({'user': None}), 200

@auth_bp.route('/check-auth', methods=['GET'])
def check_auth():
    if current_user.is_authenticated:
        return jsonify({
            'authenticated': True, 
            'user': current_user.serialize()
        }), 200
    return jsonify({'authenticated': False}), 200
