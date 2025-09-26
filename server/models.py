from sqlalchemy import func
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import Column, Integer, String, JSON
from extensions import db



class UserRole(db.Model):
    __tablename__ = "user_roles"
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey("roles.id"), primary_key=True)


class RolePermission(db.Model):
    __tablename__ = "role_permissions"
    role_id = db.Column(db.Integer, db.ForeignKey("roles.id"), primary_key=True)
    permission_id = db.Column(db.Integer, db.ForeignKey("permissions.id"), primary_key=True)


class ArticleTag(db.Model):
    __tablename__ = "article_tags"
    article_id = db.Column(db.Integer, db.ForeignKey("articles.id"), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey("tags.id"), primary_key=True)


# -----------------------------
# Core Tables
# -----------------------------

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    email = db.Column(db.Text, unique=True, index=True)
    password_hash = db.Column(db.Text)
    created_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)

    # relationships
    roles = db.relationship("Role", secondary="user_roles", back_populates="users")
    articles = db.relationship("Article", back_populates="author")

    # association proxies
    permissions = association_proxy("roles", "permissions")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "roles": [r.name for r in self.roles],
        }


class Role(db.Model):
    __tablename__ = "roles"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.Text)

    # relationships
    users = db.relationship("User", secondary="user_roles", back_populates="roles")
    permissions = db.relationship("Permission", secondary="role_permissions", back_populates="roles")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "permissions": [p.name for p in self.permissions],
        }


class Permission(db.Model):
    __tablename__ = "permissions"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.Text)

    # relationships
    roles = db.relationship("Role", secondary="role_permissions", back_populates="permissions")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
        }


class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    parent_id = db.Column(db.Integer, db.ForeignKey("categories.id"))

    # self-referential relationship
    parent = db.relationship("Category", remote_side=[id], backref="children")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "parent_id": self.parent_id,
        }


class Article(db.Model):
    __tablename__ = "articles"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text)
    author_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"))
    created_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

    # relationships
    author = db.relationship("User", back_populates="articles")
    category = db.relationship("Category", backref="articles")
    tags = db.relationship("Tag", secondary="article_tags", back_populates="articles")
    media = db.relationship("ArticleMedia", back_populates="article")

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "author": getattr(self.author, "name", "Unknown"),
            "category": getattr(self.category, "name", "Uncategorized"),
            "tags": [t.name for t in self.tags],
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }

class Tag(db.Model):
    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)

    # relationships
    articles = db.relationship("Article", secondary="article_tags", back_populates="tags")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }


class ArticleMedia(db.Model):
    __tablename__ = "article_media"

    id = db.Column(db.Integer, primary_key=True)
    article_id = db.Column(db.Integer, db.ForeignKey("articles.id"))
    media_type = db.Column(db.String(50))
    url = db.Column(db.Text)
    metadata_json = db.Column(JSON)

    # relationships
    article = db.relationship("Article", back_populates="media")

    def serialize(self):
        return {
            "id": self.id,
            "article_id": self.article_id,
            "media_type": self.media_type,
            "url": self.url,
            "metadata_json": self.metadata_json,
        }
