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

    @app.route('/articles/<int:id>', methods=['PATCH'])
    def edit_article(id):
        article = Article.query.get_or_404(id)
        data = request.get_json()

        # Update fields if present
        if "title" in data:
            article.title = data["title"]
        if "content" in data:
            article.content = data["content"]
        if "category_id" in data:
            article.category_id = data["category_id"]

        # Update tags (replace existing tags with new ones)
        if "tags" in data:
            article.tags.clear()  # remove current associations
            for name in data["tags"]:
                tag = Tag.query.filter_by(name=name).first()
                if not tag:
                    tag = Tag(name=name)
                    db.session.add(tag)
                article.tags.append(tag)

        db.session.commit()
        return make_response(jsonify(article.to_dict()), 200)
    
    
    @app.route('/articles/<int:id>', methods=['GET'])
    def get_article(id):
        article = Article.query.get_or_404(id)
        return make_response(jsonify(article.to_dict()), 200)
    
