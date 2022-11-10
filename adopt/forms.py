from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import InputRequired, Optional, NumberRange, URL, AnyOf

class AddPetForm(FlaskForm):
  """Form for adding pets"""
  name = StringField("Pet Name", validators=[InputRequired()])
  species = StringField("Pet Species", validators=[InputRequired(), AnyOf(['cat', 'dog', 'porcupine'])])
  photo_url = StringField("Photo URL", validators=[Optional(), URL()])
  age = IntegerField("Pet Age", validators=[NumberRange(min=0, max=30), Optional()])
  notes = StringField("Notes")

class EditPetForm(FlaskForm):
  """Form for editing pets"""
  photo_url = StringField("Photo URL", validators=[Optional(), URL()])
  notes = StringField("Notes")
  avl = BooleanField("Available")