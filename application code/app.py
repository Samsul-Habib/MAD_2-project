from flask import Flask
from flask_security import Security, SQLAlchemySessionUserDatastore
from application.config import Config,LocalDevelopmentConfig
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_caching import Cache
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from application.data.models import User, Role,db
#from flask_security import Security, SQLAlchemyUserDatastore, hash_password
from application.config import Config,LocalDevelopmentConfig
from application.jobs import workers, tasks


app=None
api=None
celery=None
cache=None

def create_app():
    app = Flask(__name__, template_folder="templates")
    app.config.from_object(LocalDevelopmentConfig)
    db.init_app(app)
    app.app_context().push()
    api = Api(app)
    CORS(app)
    jwt = JWTManager(app)
    app.app_context().push()
    datastore = SQLAlchemySessionUserDatastore(db.session, User, Role)
    app.security = Security(app, datastore)
    celery=workers.celery
    celery.conf.update(
        broker_url = app.config["CELERY_BROKER_URL"],
        result_backend = app.config["CELERY_RESULT_BACKEND"],
        timezone=app.config["TIMEZONE"],
        broker_connection_retry_on_startup=True
        
    )

    celery.Task=workers.ContextJobs
    app.app_context().push()
    cache=Cache(app)
    app.app_context().push()
    return app, api,celery,cache


app, api,celery,cache = create_app()


def create_roles():
    with app.app_context():
        db.create_all()
        if not Role.query.filter_by(name="admin").first():
            db.session.add(Role(name="admin", description="Admin role"))
        if not Role.query.filter_by(name="sponsor").first():
            db.session.add(Role(name="sponsor", description="Sponsor role"))
        if not Role.query.filter_by(name="influencer").first():
            db.session.add(Role(name="influencer", description="Influencer role"))
        db.session.commit()

        if not User.query.filter_by(username="admin").first():
            store=app.security.datastore
            user=store.create_user(username="admin",email="admin@gmail.com",password=hash_password("1234"))
            db.session.commit()
            role=Role.query.filter_by(name="admin").first()
            store.add_role_to_user(user,role)
            db.session.commit()
        db.session.commit()


from application.controllers.controllers import *
if __name__ == "__main__":
    create_roles()
    app.run()