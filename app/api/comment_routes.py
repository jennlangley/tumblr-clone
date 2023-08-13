from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, Image, Comment
from app.forms import CommentForm
from datetime import datetime

comment_routes = Blueprint('comments', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@comment_routes.route('/<int:commentId>', methods=['PUT'])
@login_required
def edit_comment(commentId):
    comment_form = CommentForm()
    comment_form['csrf_token'].data = request.cookies['csrf_token']

    if comment_form.validate_on_submit():
        comment = Comment.query.get(commentId)
        comment.content = comment_form.data['content']
        comment.updated_at = datetime.now()
        db.session.commit()
        return {'comment': comment.to_dict()}
    
    return validation_errors_to_error_messages(comment_form)


@comment_routes.route('/<int:commentId>', methods=['DELETE'])
@login_required
def delete_comment(commentId):
    comment = Comment.query.get(commentId)
    db.session.delete(comment)
    db.session.commit()
    return {'message': 'successfully deleted'}
