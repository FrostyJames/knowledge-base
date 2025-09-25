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
    

    # CREATE media (URL or file upload)
    @app.route('/media', methods=['POST'])
    def create_media():
        # Case 1: JSON with URL
        if request.is_json:
            data = request.get_json()
            new_media = ArticleMedia(
                article_id=data.get("article_id"),
                media_type=data.get("media_type"),
                url=data.get("url"),
                metadata_json=data.get("metadata_json")
            )
            db.session.add(new_media)
            db.session.commit()
            return make_response(jsonify(new_media.serialize()), 201)

        # Case 2: File upload
        if 'file' not in request.files:
            return jsonify({"error": "No file part or JSON provided"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            file.save(filepath)

            new_media = ArticleMedia(
                article_id=request.form.get("article_id"),
                media_type=request.form.get("media_type"),
                url=filepath,
                metadata_json=request.form.get("metadata_json")
            )
            db.session.add(new_media)
            db.session.commit()

            return make_response(jsonify(new_media.serialize()), 201)

        return jsonify({"error": "File type not allowed"}), 400
    
    
    # edit media ( url or file upload)
    @app.route('/media/<int:id>', methods=['PATCH'])
    def update_media(id):
        media = ArticleMedia.query.get(id)
        if not media:
            return jsonify({"error": "Media not found"}), 404

        # Case 1: JSON update
        if request.is_json:
            data = request.get_json()
            media.media_type = data.get("media_type", media.media_type)
            media.url = data.get("url", media.url)
            media.metadata_json = data.get("metadata_json", media.metadata_json)

        # Case 2: File upload update
        elif 'file' in request.files:
            file = request.files['file']
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                filepath = os.path.join(UPLOAD_FOLDER, filename)
                file.save(filepath)

                media.media_type = request.form.get("media_type", media.media_type)
                media.url = filepath  # overwrite with new file path
                media.metadata_json = request.form.get("metadata_json", media.metadata_json)
            else:
                return jsonify({"error": "File type not allowed"}), 400
        else:
            return jsonify({"error": "Invalid update payload"}), 400

        db.session.commit()
        return jsonify(media.serialize()), 200

