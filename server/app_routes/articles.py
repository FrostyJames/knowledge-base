from flask import request, jsonify, make_response
from models import Article, Tag
from extensions import db
import logging

logging.basicConfig(level=logging.INFO)

def register_article_routes(app):

    @app.route('/articles', methods=['GET', 'POST'])
    def handle_articles():
        if request.method == 'POST':
            try:
                data = request.get_json()
                new_article = Article(
                    title=data.get("title"),
                    content=data.get("content"),
                    category_id=data.get("category_id")
                )

                # Handle tags (list of strings)
                tag_names = data.get("tags", [])
                for name in tag_names:
                    tag = Tag.query.filter_by(name=name).first()
                    if not tag:
                        tag = Tag(name=name)
                        db.session.add(tag)
                    new_article.tags.append(tag)

                db.session.add(new_article)
                db.session.commit()
                logging.info(f"✅ Created article: {new_article.title}")
                return make_response(jsonify(new_article.serialize()), 201)

            except Exception as e:
                logging.error("❌ Article creation failed", exc_info=True)
                return jsonify({"error": str(e)}), 500

        else:  # GET
            try:
                articles = Article.query.all()
                serialized = []
                for article in articles:
                    try:
                        serialized.append(article.serialize())
                    except Exception as inner_error:
                        logging.warning(
                            f"⚠️ Skipped article due to serialization error: {inner_error}"
                        )
                logging.info(f"✅ Returning {len(serialized)} articles")
                return jsonify(serialized), 200
            except Exception as e:
                logging.error("❌ Article fetch failed", exc_info=True)
                return jsonify({"error": str(e)}), 500

    # ✅ PATCH article with OPTIONS support
    @app.route('/articles/<int:id>', methods=['PATCH', 'OPTIONS'])
    def update_article(id):
        if request.method == 'OPTIONS':
            return jsonify({"message": "CORS preflight OK"}), 200

        article = Article.query.get(id)
        if not article:
            return jsonify({"error": "Article not found"}), 404

        try:
            data = request.get_json()
            article.title = data.get("title", article.title)
            article.content = data.get("content", article.content)
            article.category_id = data.get("category_id", article.category_id)

            # Update tags
            tag_names = data.get("tags", [])
            article.tags.clear()
            for name in tag_names:
                tag = Tag.query.filter_by(name=name).first()
                if not tag:
                    tag = Tag(name=name)
                    db.session.add(tag)
                article.tags.append(tag)

            db.session.commit()
            logging.info(f"✅ Updated article: {article.title}")
            return jsonify(article.serialize()), 200

        except Exception as e:
            logging.error("❌ Article update failed", exc_info=True)
            return jsonify({"error": str(e)}), 500

    # ✅ DELETE article with OPTIONS support
    @app.route('/articles/<int:id>', methods=['DELETE', 'OPTIONS'])
    def delete_article(id):
        if request.method == 'OPTIONS':
            return jsonify({"message": "CORS preflight OK"}), 200

        article = Article.query.get(id)
        if not article:
            return jsonify({"error": "Article not found"}), 404

        try:
            db.session.delete(article)
            db.session.commit()
            logging.info(f"🗑️ Deleted article ID: {id}")
            return jsonify({"message": "Article deleted"}), 200

        except Exception as e:
            logging.error("❌ Article deletion failed", exc_info=True)
            return jsonify({"error": str(e)}), 500