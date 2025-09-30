from flask import Blueprint, request, jsonify
from models import Document
from extensions import db

media_bp = Blueprint('media_bp', __name__)

# Create new media
@media_bp.route('', methods=['POST'])
def upload_media():
    try:
        data = request.get_json()
        doc = Document(
            article_id=data['article_id'],
            media_type=data['media_type'],
            url=data['url'],
            filename=data.get('filename'),
            title=data.get('title'),
            description=data.get('description')
        )
        db.session.add(doc)
        db.session.commit()
        return jsonify(doc.to_dict()), 201
    except Exception as e:
        print("Upload error:", e)
        return jsonify({"error": str(e)}), 500

# Retrieve a single media entry
@media_bp.route('/<int:doc_id>', methods=['GET'])
def get_media(doc_id):
    try:
        doc = Document.query.get_or_404(doc_id)
        return jsonify(doc.to_dict()), 200
    except Exception as e:
        print("Fetch error:", e)
        return jsonify({"error": str(e)}), 500

# Update media
@media_bp.route('/<int:doc_id>', methods=['PUT'])
def update_media(doc_id):
    try:
        data = request.get_json()
        doc = Document.query.get_or_404(doc_id)

        doc.article_id = data.get('article_id', doc.article_id)
        doc.media_type = data.get('media_type', doc.media_type)
        doc.url = data.get('url', doc.url)
        doc.filename = data.get('filename', doc.filename)
        doc.title = data.get('title', doc.title)
        doc.description = data.get('description', doc.description)

        db.session.commit()
        return jsonify(doc.to_dict()), 200
    except Exception as e:
        print("Update error:", e)
        return jsonify({"error": str(e)}), 500

# Delete media
@media_bp.route('/<int:doc_id>', methods=['DELETE'])
def delete_media(doc_id):
    try:
        doc = Document.query.get_or_404(doc_id)
        db.session.delete(doc)
        db.session.commit()
        return jsonify({"message": "Document deleted"}), 200
    except Exception as e:
        print("Delete error:", e)
        return jsonify({"error": str(e)}), 500
