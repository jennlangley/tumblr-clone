from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, Image, Comment
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

# @comment_routes.route('/<int:postId>/comments')
# def get_comments():
#     posts = Post.query.all()
#     images = Image.query.all()
#     comments = Comment.query.all()
#     return {'posts': [post.to_dict() for post in posts]}
#             # 'images': [image.to_dict() for image in images]}

# @comment_routes.route('/<int:userId>')
# def get_user_comments(userId):
#     user_comments = Comment.query.filter_by(userId).all()


@comment_routes.route('/<int:postId>', methods=['POST'])
def new_comment(postId):
    comment_form = CommentForm()

    comment_form['csrf_token'].data = request.cookies['csrf_token']

    if comment_form.validate_on_submit():
        comment = Comment(content=comment_form.data['content'], userId=current_user.id, postId=postId)
        db.session.add(comment)
        db.session.commit()
        return {'comment': comment.to_dict()}
    return
    # return {'errors': validation_errors_to_error_messages(post_form.errors)}, 401


@comment_routes.route('/<int:commentId>', methods=['DELETE'])
def delete_comment(commentId):
    #print(commentId, 'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO')
    comment = Comment.query.get(commentId)
    db.session.delete(comment)
    db.session.commit()
    return
