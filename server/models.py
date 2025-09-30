from extensions import db

class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    content = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50))
    tags = db.Column(db.PickleType)  # stores list of strings
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # Link to documents
    documents = db.relationship('Document', backref='article', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "category": self.category,
            "tags": self.tags,
            "created_at": self.created_at.isoformat()
        }

class Document(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    article_id = db.Column(db.Integer, db.ForeignKey('article.id'), nullable=False)
    media_type = db.Column(db.String(50), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    filename = db.Column(db.String(100))
    title = db.Column(db.String(100))
    description = db.Column(db.Text)  # ✅ Added this line
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "article_id": self.article_id,
            "media_type": self.media_type,
            "url": self.url,
            "filename": self.filename,
            "title": self.title,
            "description": self.description,
            "created_at": self.created_at.isoformat()
        }