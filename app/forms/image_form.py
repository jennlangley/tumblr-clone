from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import ValidationError
from app.models import Image


class ImageForm(FlaskForm):
    imageUrl = StringField('image')
