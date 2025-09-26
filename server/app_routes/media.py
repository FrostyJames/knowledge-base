import os
import json
import logging
from flask import request, jsonify, make_response
from extensions import db
from models import ArticleMedia, Article

# ✅ Setup logging
logging.basicConfig(level=logging.INFO)

def register_media_routes(app):

    # ✅ GET documents with article titles
    @app.route('/documents', methods=['GET'])
    def get_documents():
        media = ArticleMedia.query.all()
        documents = []
        for m in media:
            article = Article.query.get(m.article_id)
            documents.append({
                "id": m.id,
                "article_id": m.article_id,
                "title": article.title if article else "Untitled",
                "media_type": m.media_type,
                "url": m.url,
                "filename": os.path.basename(m.url)
            })
        return jsonify(documents), 200

    # ✅ GET all media
    @app.route('/media', methods=['GET'])
    def get_media():
        media = ArticleMedia.query.all()
        return jsonify([m.serialize() for m in media]), 200

    # ✅ POST media via JSON only
    @app.route('/media', methods=['POST'])
    def create_media():
        try:
            if not request.is_json:
                return jsonify({"error": "Only JSON payloads are accepted"}), 400

            data = request.get_json()
            logging.info(f"📦 Received JSON: {data}")

            required_fields = ["article_id", "media_type", "url"]
            for field in required_fields:
                if not data.get(field):
                    return jsonify({"error": f"Missing required field: {field}"}), 400

            new_media = ArticleMedia(
                article_id=data["article_id"],
                media_type=data["media_type"],
                url=data["url"],
                metadata_json=data.get("metadata_json", {})
            )
            db.session.add(new_media)
            db.session.commit()
            return make_response(jsonify(new_media.serialize()), 201)

        except Exception as e:
            logging.error("❌ Media creation failed", exc_info=True)
            return jsonify({"error": str(e)}), 500

    # ✅ PATCH media via JSON only
    @app.route('/media/<int:id>', methods=['PATCH'])
    def update_media(id):
        media = ArticleMedia.query.get(id)
        if not media:
            return jsonify({"error": "Media not found"}), 404

        if not request.is_json:
            return jsonify({"error": "Only JSON payloads are accepted"}), 400

        data = request.get_json()
        media.media_type = data.get("media_type", media.media_type)
        media.url = data.get("url", media.url)
        media.metadata_json = data.get("metadata_json", media.metadata_json)

        db.session.commit()
        return jsonify(media.serialize()), 200

    # ✅ DELETE media
    @app.route('/media/<int:id>', methods=['DELETE'])
    def delete_media(id):
        media = ArticleMedia.query.get(id)
        if not media:
            return jsonify({"error": "Media not found"}), 404

        db.session.delete(media)
        db.session.commit()
        return jsonify({"message": "Media deleted"}), 200