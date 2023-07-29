from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, Post, Image

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def get_posts():
    posts = Post.query.all()
    images = Image.query.all()
    return {'posts': [post.to_dict() for post in posts]}
            # 'images': [image.to_dict() for image in images]}

@post_routes.route('/<int:postId>')
def get_post_by_id(postId):
    post = Post.query.get(postId)
    return post.to_dict()