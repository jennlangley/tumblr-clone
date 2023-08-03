from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Like

like_routes = Blueprint('likes', __name__)

@like_routes.route('')
def get_likes():
    likes = Like.query.all()

    return {
        'likes': [like.to_dict() for like in likes],
    }
