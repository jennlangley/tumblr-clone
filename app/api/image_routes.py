from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, Image, Comment
from app.forms import ImageForm, PostForm


image_routes = Blueprint('images', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# @image_routes.route('/')
# def get_images():
#     posts = Post.query.all()
#     images = Image.query.all()
#     comments = Comment.query.all()

#     return {'posts': [post.to_dict() for post in posts],
#             'images': [image.to_dict() for image in images],
#             'comments': [comment.to_dict() for comment in comments]}

# @login_required
@image_routes.route('', methods=['POST'])
def new_image():

    image_form = ImageForm()

    image_form['csrf_token'].data = request.cookies['csrf_token']

    all_post = Post.query.all()
    recent_post = all_post[len(all_post)-1]

    if image_form.validate_on_submit():
        image = Image(imageUrl=image_form.data['imageUrl'], postId=recent_post.id)
        db.session.add(image)
        db.session.commit()
        return {'image': image.to_dict()}


    return {'errors': validation_errors_to_error_messages(image_form.errors)}, 401

@image_routes.route('<int:imageId>', methods=['PUT'])
def update_image(imageId):
    image_form = ImageForm()
    image = Image.query.get(imageId)
    image.imageUrl = image_form.data['imageUrl']
    db.session.commit()
    return
 #   return {'image': image.to_dict()}
