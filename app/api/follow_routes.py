from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Follow

follow_routes = Blueprint('follows', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@follow_routes.route('')
def get_follows():
    follows = Follow.query.all()

    return [follow.to_dict() for follow in follows]

@follow_routes.route('/<int:followedId>', methods=['POST'])
@login_required
def follow_user(followedId):
    followerId = current_user.id
    follow = Follow(followerId=followerId, followedId=followedId)
    db.session.add(follow)
    db.session.commit()
    return follow.to_dict()

@follow_routes.route('/<int:followId>', methods=['DELETE'])
@login_required
def unfollow_user(followId):
    follow = Follow.query.get(followId)
    db.session.delete(follow)
    db.session.commit()
    return {'message': 'Successfully unfollowed.'}
