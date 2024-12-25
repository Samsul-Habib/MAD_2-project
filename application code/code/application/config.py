import os
from datetime import timedelta
basedir = os.path.abspath(os.path.dirname(__file__))
class Config():
    """DEBUG= False
    SQLALCHEMY_TRACK_MODIFICATIONS=False
    CACHE_TYPE ="RedisCache"
    CELERY_BROKER_URL="redis://localhost:6379/1"
    CELERY_RESULT_BACKEND="redis://localhost:6379/2" """
    DEBUG = False
    SQLITE_DB_DIR = None
    SQLALCHEMY_DATABASE_URI = None
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CELERY_BROKER_URL="redis://localhost:6379/1"
    CELERY_RESULT_BACKEND="redis://localhost:6379/2"
    CACHE_TYPE ="RedisCache"
    CACHE_REDIS_HOST="localhost"
    CACHE_REDIS_PORT=6379
    TIMEZONE="Asia/Kolkata"
class LocalDevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI="sqlite:///sponsorship.sqlite3"
    DEBUG=True
    SECRET_KEY="this-is-a-dummy-secret-key"
    SECURITY_PASSWORD_HASH="argon2"
    SECURITY_PASSWORD_SALT="this-is-a-dummy-salt"
    WTF_CSRF_ENABLED=True
    SECURITY_TOKEN_AUTHENTICATION_HEADER="Authentication-Token"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECURITY_PASSWORD_HASH = "argon2"
    SECURITY_PASSWORD_SALT = "a157d8af-3456-4954-a26b-6516af140def"
    DEBUG = True
    SESSION_COOKIE_SECURE=True
    SECURITY_UNAUTHORIZED_VIEW = None
    SECURITY_REGISTERABLE = True
    SECURITY_CONFIRMABLE = False
    SECURITY_SEND_REGISTER_EMAIL = False
    SECURITY_USERNAME_ENABLE=True
    SECURITY_USERNAME_REQUIRED=True
    WTF_CSRF_ENABLED = False
    CACHE_TYPE ="RedisCache"
    CACHE_REDIS_HOST="localhost"
    CACHE_REDIS_PORT=6379
    JWT_ACCESS_TOKEN_EXPIRES = False