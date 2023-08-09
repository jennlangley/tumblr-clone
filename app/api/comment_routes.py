from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, Image, Comment
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

# @comment_routes.route('/<int:postId>', methods=['POST'])
# @login_required
# def create_comment(postId):
#     comment_form = CommentForm()
#     comment_form['csrf_token'].data = request.cookies['csrf_token']

#     if comment_form.validate_on_submit():
#         comment = Comment(content=comment_form.data['content'], userId=current_user.id, postId=postId)
#         db.session.add(comment)
#         db.session.commit()
#         return {'comment': comment.to_dict()}

@comment_routes.route('/<int:commentId>', methods=['PUT'])
@login_required
def edit_comment(commentId):
    comment_form = CommentForm()
    comment_form['csrf_token'].data = request.cookies['csrf_token']

    if comment_form.validate_on_submit():
        comment = Comment.query.get(commentId)
        comment.content = comment_form.data['content']
        db.session.commit()
        return {'comment': comment.to_dict()}



@comment_routes.route('/<int:commentId>', methods=['DELETE'])
@login_required
def delete_comment(commentId):
    comment = Comment.query.get(commentId)
    db.session.delete(comment)
    db.session.commit()
    return {'message': 'successfully deleted'}
