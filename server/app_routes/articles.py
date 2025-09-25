from datetime import datetime, timezone
from flask import request, jsonify, make_response
from models import Article, Tag
from extensions import db


def register_article_routes(app):

    @app.route('/articles', methods=['POST'])
    def create_article():
        data = request.get_json()
        new_article = Article(
            title=data.get("title"),
            content=data.get("content"),
            category_id=data.get("category_id")
        )

         # Handle tags (list of strings)
        tag_names = data.get("tags", [])
        if tag_names:
            for name in tag_names:
                tag = Tag.query.filter_by(name=name).first()
                if not tag:
                    tag = Tag(name=name)
                    db.session.add(tag)
                new_article.tags.append(tag)

        db.session.add(new_article)
        db.session.commit()
        return make_response(jsonify(new_article.to_dict()), 201)

    