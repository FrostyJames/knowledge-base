from flask import Blueprint, request, jsonify
from models import Article
from extensions import db

articles_bp = Blueprint('articles', __name__)

# GET all articles (with optional category filter)
@articles_bp.route('', methods=['GET'])
def get_articles():
    category = request.args.get('category')

    if category:
        articles = Article.query.filter_by(category=category).all()
    else:
        articles = Article.query.all()

    return jsonify([{
        'id': a.id,
        'title': a.title,
        'content': a.content,
        'category': a.category,
        'tags': a.tags,
        'created_at': a.created_at
    } for a in articles])

# GET single article by ID
@articles_bp.route('/<int:id>', methods=['GET'])
def get_article(id):
    article = Article.query.get_or_404(id)
    return jsonify({
        'id': article.id,
        'title': article.title,
        'content': article.content,
        'category': article.category,
        'tags': article.tags,
        'created_at': article.created_at
    })

# POST create new article
@articles_bp.route('', methods=['POST'])
def create_article():
    data = request.get_json()
    article = Article(
        title=data['title'],
        content=data['content'],
        category=data.get('category'),
        tags=data.get('tags', [])
    )
    db.session.add(article)
    db.session.commit()
    return jsonify({'message': 'Article created', 'id': article.id}), 201

# PUT update article
@articles_bp.route('/<int:id>', methods=['PUT'])
def update_article(id):
    article = Article.query.get_or_404(id)
    data = request.get_json()

    article.title = data.get('title', article.title)
    article.content = data.get('content', article.content)
    article.category = data.get('category', article.category)
    article.tags = data.get('tags', article.tags)

    db.session.commit()
    return jsonify({'message': 'Article updated'})

# DELETE article
@articles_bp.route('/<int:id>', methods=['DELETE'])
def delete_article(id):
    article = Article.query.get_or_404(id)
    db.session.delete(article)
    db.session.commit()
    return jsonify({'message': 'Article deleted'})