"""Models for Cupcake app."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
  db.app = app
  db.init_app(app)

class Cupcake(db.Model):
  """Cupcake"""

  __tablename__ = 'cupcakes'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)

  flavor = db.Column(db.Text, nullable=False)

  size = db.Column(db.Text, nullable=False)

  rating = db.Column(db.Float, nullable=False)

  image = db.Column(db.Text, nullable=False, default='https://tinyurl.com/demo-cupcake')

  def edit(self, flavor, size, rating, image):
    self.flavor = flavor
    self.size = size
    self.rating = rating
    self.image = image
    db.session.add(self)
    db.session.commit()
  
  def remove(self):
    db.session.delete(self)
    db.session.commit()
