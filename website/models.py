from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(100))
    username = db.Column(db.String(100), unique=True)

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(100))
    email = db.Column(db.String(100))
    title = db.Column(db.String(100))
    description = db.Column(db.String(10000))
    rating = db.Column(db.Integer)
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    verified = db.Column(db.Boolean, default=False)