from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, Image, Comment
from app.forms import PostForm, ImageForm

post_routes = Blueprint('posts', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@post_routes.route('/')
def get_posts():
    posts = Post.query.all()
    images = Image.query.all()
    comments = Comment.query.all()


    return {'posts': [post.to_dict() for post in posts],
            'images': [image.to_dict() for image in images],
            'comments': [comment.to_dict() for comment in comments],
            'users': [post.user.to_dict() for post in posts]}

# @login_required
@post_routes.route('', methods=['POST'])
def new_post():
    post_form = PostForm()
    # image_form = ImageForm()
    post_form['csrf_token'].data = request.cookies['csrf_token']
    # image_form['csrf_token'].data = request.cookies['csrf_token']
    if post_form.validate_on_submit():
        post = Post(content=post_form.data['content'], userId=current_user.id)
        db.session.add(post)
        # if image_form.data['imageUrl']:
        #     image = Image(imageUrl=image_form.data['imageUrl'], postId=post.id)
        #     db.session.add(image)
        #     db.session.commit()
        #     return {'post': post.to_dict()}
        db.session.commit()
        return {'post': post.to_dict()}
    return
    # return {'errors': validation_errors_to_error_messages(post_form.errors)}, 401

@post_routes.route('<int:postId>', methods=["PUT"])
def update_post(postId):
    post_form = PostForm()
    post = Post.query.get(postId)
    post.content = post_form.data['content']
    db.session.commit()
    return
   # return {'post': post.to_dict()}


@post_routes.route('/<int:postId>', methods=['DELETE'])
@login_required
def delete_post(postId):
    post = Post.query.get(postId)
    db.session.delete(post)
    db.session.commit()
    return {'message': 'Post successfully deleted.'}


# @post_routes.route('/<int:postId>')
# def get_post_by_id(postId):
#     post = Post.query.get(postId)
#     return post.to_dict()


# @post_routes.route('/<int:postId/comments/<int:commentId>', methods=['DELETE'])
# def delete_comment(postId, commentId):
#     post = Post.query.get(postId)
#     comment = Comment.query.get(commentId)
