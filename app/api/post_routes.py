from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, Image, Comment, Like, User
from app.forms import PostForm, CommentForm
from datetime import datetime
from app.api.aws_helpers import (
    upload_file_to_s3, get_unique_filename)

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

@post_routes.route('')
def get_posts():
    posts = Post.query.all()
    images = Image.query.all()
    comments = Comment.query.all()

    return {'posts': [post.to_dict() for post in posts],
            'images': [image.to_dict() for image in images],
            'comments': [comment.to_dict() for comment in comments]}


@post_routes.route('', methods=['POST'])
@login_required
def new_post():
    post_form = PostForm()
    post_form['csrf_token'].data = request.cookies['csrf_token']

    if post_form.validate_on_submit():
        post = Post(content=post_form.data['content'], userId=current_user.id)
        db.session.add(post)
        db.session.commit()

        if (post_form.data['image']):
            image = post_form.data["image"]
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return validation_errors_to_error_messages(upload)
                
            url = upload["url"]
            image = Image(imageUrl=url, postId=post.id)
            db.session.add(image)
            db.session.commit()
            return {'post': post.to_dict(), 'image': image.to_dict()}
        
        return {'post': post.to_dict()}
    
    return validation_errors_to_error_messages(post_form.errors)

@post_routes.route('/<int:postId>', methods=['PUT'])
@login_required
def edit_post(postId):
    post_form = PostForm()
    post_form['csrf_token'].data = request.cookies['csrf_token']

    if post_form.validate_on_submit():
        post = Post.query.get(postId)
        post.content = post_form.data['content']
        post.updated_at = datetime.now()
        db.session.commit()
        old_image = Image.query.filter_by(postId = postId).first()
        
        if (post_form.data['image']):
    
            image = post_form.data['image']
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return validation_errors_to_error_messages(upload)
             
            url = upload["url"]

            if (old_image):
                old_image.imageUrl = url
                db.session.commit()
                return {'post': post.to_dict(), 'image': old_image.to_dict()}
            
            new_image = Image(imageUrl=url, postId=postId)
            db.session.add(new_image)
            db.session.commit()
            return {'post': post.to_dict(), 'image': new_image.to_dict()}
        
        return {'post': post.to_dict()} 
    
    return validation_errors_to_error_messages(post_form.errors)

@post_routes.route('/<int:postId>', methods=['DELETE'])
@login_required
def delete_post(postId):
    post = Post.query.get(postId)
    db.session.delete(post)
    db.session.commit()
    return {'message': 'Post successfully deleted.'}


@post_routes.route('/<int:postId>', methods=['POST'])
@login_required
def like_post(postId):
    like = Like(postId=postId, userId=current_user.id)
    db.session.add(like)
    db.session.commit()
    return {'like': like.to_dict()}

@post_routes.route('/<int:postId>/comments', methods=['POST'])
@login_required
def create_comment(postId):
    comment_form = CommentForm()
    comment_form['csrf_token'].data = request.cookies['csrf_token']

    if comment_form.validate_on_submit():
        comment = Comment(content=comment_form.data['content'], userId=current_user.id, postId=postId)
        db.session.add(comment)
        db.session.commit()
        return {'comment': comment.to_dict()}

@post_routes.route('/<int:postId>/repost', methods=['POST'])
@login_required
def repost(postId):
    post = Post.query.get(postId)
    postCreator = User.query.get(post.userId)
    image = Image.query.filter_by(postId = postId).first()
    url = image.imageUrl if image else None
    new_post = Post(content=post.content, userId=current_user.id, reposted=True, originalPoster=postCreator.username, repostUrl=url)
    db.session.add(new_post)
    db.session.commit()

    return {'post': new_post.to_dict()}
