import os
from flask import request, jsonify, make_response
from werkzeug.utils import secure_filename
from extensions import db
from models import ArticleMedia

# Configure uploads
UPLOAD_FOLDER = "uploads/"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "mp4", "mov", "pdf", "docx"}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def register_media_routes(app):

    # GET all media
    @app.route('/media', methods=['GET'])
    def get_media():
        media = ArticleMedia.query.all()
        return jsonify([m.serialize() for m in media]), 200

