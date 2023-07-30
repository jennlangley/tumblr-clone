from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Post, Image

class PostForm(FlaskForm):
    content = StringField('content', validators=[DataRequired()])
    userId = IntegerField('userId')

class ImageForm(FlaskForm):
    imageUrl = StringField('image')