from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager
from flask_cors import CORS

db = SQLAlchemy()
DB_NAME = "database.db"

def create_app():
    abs_instance_path = path.abspath(path.join(path.dirname(__file__), '..', 'instance'))
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'aiu1s32hfust768y98nsajs73k'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+mysqldb://{os.environ.get("database_username")}:{os.environ.get("database_password")}@localhost/{DB_NAME}'
    db.init_app(app)

    from .views import views

    app.register_blueprint(views, url_prefix='/')

    from .models import User, Review

    create_database(app)

    login_manager = LoginManager()
    login_manager.login_view = 'views.home'
    login_manager.init_app(app)

    @login_manager.user_loader
    def loadUser(id):
        return User.query.get(int(id))

    CORS(app)

    return app

def create_database(app):
    if not path.exists('website/' + DB_NAME):
        with app.app_context():
            db.create_all()
            print("Database created!")