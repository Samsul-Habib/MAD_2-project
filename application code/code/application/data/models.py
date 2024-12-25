from flask_security import UserMixin, RoleMixin
from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model, UserMixin):
    __tablename__ = 'user'  # Define the table name for User
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    active = db.Column(db.Boolean(),nullable=False)
    fs_uniquifier = db.Column(db.String(255), unique=True, nullable=False)  # Required by Flask-Security
    industry=db.Column(db.String(100), unique=False, nullable=True)
    roles = db.relationship('Role', secondary='user_roles', backref='bearers')
    last_login = db.Column(db.DateTime, default=datetime.utcnow, nullable=True)

class Role(db.Model, RoleMixin):
    __tablename__ = 'role'  # Define the table name for Role
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True,nullable=False)  # Role names like 'admin', 'sponsor', 'influencer'
    description = db.Column(db.String(255))

class UserRoles(db.Model):
    __tablename__ = 'user_roles'  # Define the table name for UserRoles
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id', ondelete='CASCADE'))
    role_id = db.Column(db.Integer(), db.ForeignKey('role.id', ondelete='CASCADE'))

class Camp(db.Model):   # model for storing camps created by sponsors
    __tablename__ = "camp"
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    username = db.Column(db.String,nullable=False,unique=False)
    camp_name=db.Column(db.String,nullable=False,unique=False)
    camp_details=db.Column(db.String,nullable=False,unique=False)
    price=db.Column(db.String,nullable=False,unique=False)
    start_date=db.Column(db.String,nullable=True,unique=False)
    end_date=db.Column(db.String,nullable=True,unique=False)
    category=db.Column(db.String,nullable=False,unique=False)
    expected_followers=db.Column(db.String,nullable=False,unique=False)
    expected_reach=db.Column(db.String,nullable=False,unique=False)

class Influ_Camp(db.Model):  # model for storing camps selected by influencers
    __tablename__ = "influ_camp"
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    camp_id=db.Column(db.Integer,nullable=False,unique=False)
    username = db.Column(db.String,nullable=False,unique=False)
    spon_username=db.Column(db.String,nullable=False,unique=False)
    camp_name=db.Column(db.String,nullable=False,unique=False)
    camp_details=db.Column(db.String,nullable=False,unique=False)
    price=db.Column(db.String,nullable=False,unique=False)
    start_date=db.Column(db.String,nullable=True,unique=False)
    end_date=db.Column(db.String,nullable=True,unique=False)
    category=db.Column(db.String,nullable=False,unique=False)
    expected_followers=db.Column(db.String,nullable=True,unique=False)
    expected_reach=db.Column(db.String,nullable=True,unique=False)
    payment_status = db.Column(db.String, nullable=True)

class Message(db.Model):    # model for storing chats sent by influencer 
    __tablename__ = "message"
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    sender=db.Column(db.String,nullable=False,unique=False) #username or id of the sender 
    recipient=db.Column(db.String,nullable=False,unique=False)  #username or id of the recepient
    content=db.Column(db.String,nullable=False,unique=False)

class SponMessage(db.Model):     # model for storing chats sent by influencer 
    __tablename__ = "sponmessage"
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    sender=db.Column(db.String,nullable=False,unique=False) #username or id of the sender 
    recipient=db.Column(db.String,nullable=False,unique=False)  #username or id of the recepient
    content=db.Column(db.String,nullable=False,unique=False)

class Influencer_Like(db.Model): #model for storing Influencer Preferences 
    __tablename__ = "influencer_like"
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    username=db.Column(db.String,nullable=False,unique=False)
    niche=db.Column(db.String,nullable=False,unique=False) 
    reach=db.Column(db.String,nullable=False,unique=False)
    followers=db.Column(db.String,nullable=False,unique=False)
    motto=db.Column(db.String,nullable=False,unique=False)
    exp=db.Column(db.String,nullable=False,unique=False)

class Ad(db.Model):   # model for storing ads created by sponsors
    __tablename__ = "ad"
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    username = db.Column(db.String,nullable=False,unique=False)
    ad_name=db.Column(db.String,nullable=False,unique=False)
    camp_name=db.Column(db.String,nullable=False,unique=False)
    ad_details=db.Column(db.String,nullable=False,unique=False)
    ad_aud=db.Column(db.String,nullable=False,unique=False)
    ad_price=db.Column(db.String,nullable=False,unique=False)
    ad_duration=db.Column(db.String,nullable=False,unique=False)

class F_Ad(db.Model):  # model for storing all flagged ads
    __tablename__ = "f_ad"
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    username = db.Column(db.String,nullable=False,unique=False)
    ad_name=db.Column(db.String,nullable=False,unique=False)
    camp_name=db.Column(db.String,nullable=False,unique=False)
    ad_details=db.Column(db.String,nullable=False,unique=False)
    ad_aud=db.Column(db.String,nullable=False,unique=False)
    ad_price=db.Column(db.String,nullable=False,unique=False)
    ad_duration=db.Column(db.String,nullable=False,unique=False)
    flagged_by = db.Column(db.String,nullable=True,unique=False)

class F_Camp(db.Model):   # model for storing all flagged camps
    __tablename__ = "f_camp"
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    username = db.Column(db.String,nullable=False,unique=False)
    camp_name=db.Column(db.String,nullable=False,unique=False)
    camp_details=db.Column(db.String,nullable=False,unique=False)
    price=db.Column(db.String,nullable=False,unique=False)
    start_date=db.Column(db.String,nullable=True,unique=False)
    end_date=db.Column(db.String,nullable=True,unique=False)
    category=db.Column(db.String,nullable=False,unique=False)
    expected_followers=db.Column(db.String,nullable=False,unique=False)
    expected_reach=db.Column(db.String,nullable=False,unique=False)
    flagged_by = db.Column(db.String,nullable=True,unique=False)