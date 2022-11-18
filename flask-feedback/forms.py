from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Length

class AddUserForm(FlaskForm):
  """Form for adding a user"""
  username = StringField(validators=[InputRequired(), Length(max=20)])

  password = PasswordField(validators=[InputRequired()])

  email = StringField(validators=[InputRequired(), Length(max=50)])

  first_name = StringField(validators=[InputRequired(), Length(max=30)])

  last_name = StringField(validators=[InputRequired(), Length(max=30)])

class LoginUserForm(FlaskForm):
  """Form for logging in a user"""
  username = StringField(validators=[InputRequired(), Length(max=20)])

  password = PasswordField(validators=[InputRequired()])

class FeedbackForm(FlaskForm):
  """Form for adding feedback"""
  title = StringField(validators=[InputRequired(), Length(max=100)])

  content = StringField(validators=[InputRequired()])