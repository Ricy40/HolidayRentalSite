from .models import User
from . import db
from werkzeug.security import generate_password_hash

def getAdmin():
    admin = User.query.filter_by(id="1").first()
    if not admin:
        admin = User(id="1", username="Honey", password=generate_password_hash("password"))
        db.session.add(admin)
        db.session.commit()
    return admin