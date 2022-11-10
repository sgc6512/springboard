"""Pet adoption application."""

from flask import Flask, render_template, request, redirect
from models import db, connect_db, Pet
from forms import AddPetForm, EditPetForm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adopt'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "12345"

connect_db(app)

# Looked this up, runtime errors
# with app.app_context():
#     db.create_all()

@app.route('/')
def homepage():
  """List the pets name, photos, and availability"""
  pets = Pet.query.all()
  return render_template('home.html', pets=pets)

@app.route('/add', methods=["GET", "POST"])
def add_pet():
  """Pet add form; handle adding"""

  form = AddPetForm()

  if form.validate_on_submit():
    d = form.data
    d.popitem()
    new_pet = Pet(**d)
    with app.app_context():
      db.session.add(new_pet)
      db.session.commit()
    return redirect('/')
  else:
    return render_template('pet_add_form.html', form=form)

@app.route('/<int:pet_id>', methods=["GET", "POST"])
def display_edit_pet(pet_id):
  """Show detailed info about the pet and show a form to edit that pet"""

  pet = Pet.query.get_or_404(pet_id)
  form = EditPetForm(obj=pet)

  if form.validate_on_submit():
    url = form.photo_url.data
    notes = form.notes.data
    avl = form.avl.data
    pet.edit(url, notes, avl)
    return redirect('/')
  else:
    return render_template('pet_edit_form.html', form=form, pet=pet)
