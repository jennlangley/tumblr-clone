from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, Post, Image, Comment

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:postId>/comments')
def get_comments():
    posts = Post.query.all()
    images = Image.query.all()
    comments = Comment.query.all()
    return {'posts': [post.to_dict() for post in posts]}
            # 'images': [image.to_dict() for image in images]}
