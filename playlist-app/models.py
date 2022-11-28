"""Models for Playlist app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)


class Playlist(db.Model):
    """Playlist."""
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    name = db.Column(db.Text)

    description = db.Column(db.Text)

    songs = db.relationship('PlaylistSong', backref='playlist')


class Song(db.Model):
    """Song."""
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    title = db.Column(db.Text, nullable=False)

    artist = db.Column(db.Text, nullable=False)

    playlists = db.relationship('PlaylistSong', backref='song')


class PlaylistSong(db.Model):
    """Mapping of a playlist to a song."""
    __tablename__ = 'playlists_songs'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'), primary_key=True)

    playlist_id = db.Column(db.Integer, db.ForeignKey('playlists.id'), primary_key=True)
    # ADD THE NECESSARY CODE HERE


# DO NOT MODIFY THIS FUNCTION
def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)
