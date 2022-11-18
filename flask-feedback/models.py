from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

def connect_db(app):
  db.app = app
  db.init_app(app)

class User(db.Model):
  """User Model"""

  __tablename__ = 'users'

  username = db.Column(db.String(20), primary_key=True)

  password = db.Column(db.Text, nullable=False)

  email = db.Column(db.String(50), nullable=False)

  first_name = db.Column(db.String(30), nullable=False)

  last_name = db.Column(db.String(30), nullable=False)

  def remove(self):
    db.session.delete(self)
    db.session.commit()

  @classmethod
  def register(cls, username, pwd, email, first_name, last_name):
    """Register user with hased password"""

    hashed = bcrypt.generate_password_hash(pwd)
    hashed_utf8 = hashed.decode("utf8")
    
    # Return a user with that that password
    return cls(username=username, password=hashed_utf8, email=email, first_name=first_name, last_name=last_name)
  
  @classmethod
  def authenticate(cls, username, pwd):
    """Validate that user exists and password is correct"""

    u = User.query.filter_by(username=username).first()
    if u and bcrypt.check_password_hash(u.password, pwd):
      return True
    else:
      return False

class Feedback(db.Model):
  """Feedback Model"""

  __tablename__ = 'feedback'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)

  title = db.Column(db.String(100), nullable=False)

  content = db.Column(db.Text, nullable=False)

  username = db.Column(db.String(20), db.ForeignKey('users.username'))

  user = db.relationship('User', backref='feedback')

  def edit(self, title, content):
    self.title = title
    self.content = content
    db.session.add(self)
    db.session.commit()
  
  def remove(self):
    db.session.delete(self)
    db.session.commit()