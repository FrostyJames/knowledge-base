# server/middleware.py
from functools import wraps
from flask import jsonify
from flask_login import current_user

def login_required_api(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated:
            return jsonify({'error': 'Authentication required'}), 401
        return f(*args, **kwargs)
    return decorated_function

def permission_required(permission_name):
    def decorator(f):
        @wraps(f)
        @login_required_api
        def decorated_function(*args, **kwargs):
            if not current_user.has_permission(permission_name):
                return jsonify({'error': 'Insufficient permissions'}), 403
            return f(*args, **kwargs)
        return decorated_function
    return decorator

def role_required(role_name):
    def decorator(f):
        @wraps(f)
        @login_required_api
        def decorated_function(*args, **kwargs):
            if not current_user.has_role(role_name):
                return jsonify({'error': 'Insufficient role'}), 403
            return f(*args, **kwargs)
        return decorated_function
    return decorator