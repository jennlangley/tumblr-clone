from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
#from app.models import Comment

class CommentForm(FlaskForm):
    content = StringField('content', validators=[DataRequired()])
