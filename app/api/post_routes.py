from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, Post

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def get_posts():
    

    posts = db.session.query(Post).all()


    return {'posts': [post.to_dict() for post in posts]}