from flask import Flask, jsonify, request, render_template, session, redirect
from models import connect_db, db, User, Feedback
from forms import AddUserForm, LoginUserForm, FeedbackForm
import keys

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///feedback'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = keys.flask_key

connect_db(app)

with app.app_context():
  db.create_all()

@app.route('/')
def home():
  """Redirect to /register"""
  return redirect('/register')

@app.route('/register', methods=["GET", "POST"])
def handle_register():
  """Show a form that will register a user, and process that registration."""
  form = AddUserForm()

  if form.validate_on_submit():
    u = form.username.data
    p = form.password.data
    e = form.email.data
    f = form.first_name.data
    l = form.last_name.data
    new_user = User.register(u, p, e, f, l)
    session['username'] = u
    with app.app_context():
      db.session.add(new_user)
      db.session.commit()
    return redirect(f'/users/{u}')
  else:
    return render_template('add_user.html', form=form)

@app.route('/login', methods=["GET", "POST"])
def handle_login():
  """Show a form that when submitted will login a user, process the login"""
  form = LoginUserForm()

  if form.validate_on_submit():
    username = form.username.data
    password = form.password.data
    if User.authenticate(username, password):
      session['username'] = username
      return redirect(f'/users/{username}')
    else:
      return render_template('login_user.html', form=form)
  else:
    return render_template('login_user.html', form=form)

@app.route('/users/<string:username>')
def secret(username):
  if "username" not in session:
    return redirect('/')
  else:
    return render_template('display_user.html', user=User.query.filter_by(username=username).first())

@app.route('/logout')
def logout():
  """Clear any info from the session and redirect to /"""
  if "username" not in session:
    return redirect('/')
  session.pop("username")
  return redirect('/')

@app.route('/users/<string:username>/delete', methods=["POST"])
def delete_user(username):
  """Delete a user and all their feedback"""
  user = User.query.filter_by(username=username).first()
  if "username" not in session:
    return redirect('/')
  elif session.get('username') != user.username:
    return redirect('/')
  else:
    for fb in user.feedback:
      fb.remove()
    user.remove()
    session.pop("username")
    return redirect('/')

@app.route('/users/<string:username>/feedback/add', methods=["GET", "POST"])
def add_fb(username):
  """Display and handle form to add feedback"""
  user = User.query.filter_by(username=username).first()
  if "username" not in session:
    return redirect('/')
  elif session.get('username') != user.username:
    return redirect('/')
  else:
    form = FeedbackForm()

    if form.validate_on_submit():
      title = form.title.data
      content = form.content.data
      new_fb = Feedback(title=title, content=content, username=user.username)
      with app.app_context():
        db.session.add(new_fb)
        db.session.commit()
      return redirect(f'/users/{username}')
    else:
      return render_template('add_feedback.html', form=form)

@app.route('/feedback/<int:feedback_id>/update', methods=["GET", "POST"])
def edit_fb(feedback_id):
  """Display and handle form to add feedback"""
  fb = Feedback.query.get(feedback_id)
  if "username" not in session:
    return redirect('/')
  elif session.get('username') != fb.username:
    return redirect('/')
  else:
    form = FeedbackForm()

    if form.validate_on_submit():
      title = form.title.data
      content = form.content.data
      fb.edit(title=title, content=content)
      return redirect(f'/users/{fb.username}')
    else:
      return render_template('add_feedback.html', form=form)

@app.route('/feedback/<int:feedback_id>/delete', methods=["POST"])
def delete_fb(feedback_id):
  """Delete feedback"""
  fb = Feedback.query.get(feedback_id)
  if "username" not in session:
    return redirect('/')
  elif session.get('username') != fb.username:
    return redirect('/')
  else:
    fb.remove()
    return redirect(f'/users/{fb.username}')