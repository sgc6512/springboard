"""Flask app for Cupcakes"""
from flask import Flask, jsonify, request, render_template
from models import db, connect_db, Cupcake
import keys

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = keys.flask_key

connect_db(app)

# with app.app_context():
#   db.create_all()

def serialize_cc(cupcake):
  """Serialize a cupcake SQLAlchemy obj to dict"""
  return {"id": cupcake.id, "flavor": cupcake.flavor, "size": cupcake.size, "rating": cupcake.rating, "image": cupcake.image}

@app.route('/api/cupcakes')
def list_cupcakes():
  """Get data about all cupcakes"""
  cupcakes = Cupcake.query.all()
  serialized = [serialize_cc(c) for c in cupcakes]
  return jsonify(cupcakes=serialized)

@app.route('/api/cupcakes/<int:cupcake_id>')
def list_single(cupcake_id):
  """Get data about a single cupcake"""
  cupcake = Cupcake.query.get_or_404(cupcake_id)
  serialized = serialize_cc(cupcake)
  return jsonify(cupcake=serialized)

@app.route('/api/cupcakes', methods=["POST"])
def create_cupcake():
  """Create and add a new cupcake to the DB, return it"""
  f = request.json["flavor"]
  s = request.json["size"]
  r = request.json["rating"]
  i = request.json["image"]
  new_cc = Cupcake(flavor=f, size=s, rating=r, image=i)
  with app.app_context():
    db.session.add(new_cc)
    db.session.commit()
    # This app context thing is really getting to me
    serialized = serialize_cc(new_cc)
  return (jsonify(cupcake=serialized), 201)

@app.route('/api/cupcakes/<int:cupcake_id>', methods=["PATCH"])
def edit_cupcake(cupcake_id):
  """Update a cupcake"""
  cc = Cupcake.query.get_or_404(cupcake_id)
  f = request.json["flavor"]
  s = request.json["size"]
  r = request.json["rating"]
  i = request.json["image"]
  cc.edit(f, s, r, i)
  # Get updated cupcake
  cc = Cupcake.query.get_or_404(cupcake_id)
  serialized = serialize_cc(cc)
  return jsonify(cupcake=serialized)

@app.route('/api/cupcakes/<int:cupcake_id>', methods=["DELETE"])
def delete_cupcake(cupcake_id):
  """Delete a cupcake"""
  cc = Cupcake.query.get_or_404(cupcake_id)
  cc.remove()
  return jsonify(message="Deleted")

@app.route('/')
def show_cupcakes():
  """Show an HTML page of all cupcakes"""
  return render_template('cupcake_list.html')
