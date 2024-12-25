from flask import Response,send_file,current_app as app, request, jsonify, render_template,redirect,url_for
from ..data.models import *
from flask_security import hash_password,login_required, roles_accepted,roles_required
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename
from flask_security.utils import verify_password
from application.jobs.tasks import create_csv_report
import os,csv
from celery.result import AsyncResult
from io import StringIO
from app import cache

#------------------------------------------------login routing ------------------------------------------------

@app.route('/')    # URl for home page
def home():
    return render_template('start.html')

@app.route('/userlogin',methods=['POST'])    # user login
def user():
    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        role = data.get('role')
        user = User.query.filter_by(username=username).first()
        if user:
            if check_password_hash(user.password, password):
                user_roles = [r.name for r in user.roles] 
                if role in user_roles:
                    access_token = create_access_token(identity=user.id)
                    if role == 'influencer':
                        return jsonify({
                            "message": "Login successful",
                            "access_token": access_token,
                            "username": user.username,
                            "role":"influencer"
                        }), 200
                    elif role=='sponsor':
                        return jsonify({
                            "message": "Login successful",
                            "access_token": access_token,
                            "username": user.username,
                            "role":"sponsor"
                        }), 200
                    else:
                        return jsonify({
                            "message": "Select correct role"
                        }), 400
                else:
                    return jsonify({"message": "Role mismatch"}), 403
            else:
                return jsonify({"message": "Invalid password"}), 401
        else:
            return jsonify({"message": "User not found"}), 404

@app.route('/adminlogin',methods=['POST'])   # admin login
def admin():
    if request.method == 'POST':
        data=request.get_json()
        username = data.get('username')
        password = data.get('password')
        user = User.query.filter_by(username=username).first()
        if user:
            # Check if the password matches the stored password hash
            if verify_password(password, user.password):
                # Create access token for future requests (JWT-based authentication)
                access_token = create_access_token(identity=user.id)
                return jsonify({"message": "Login successful", "access_token": access_token}), 200
            else:
                return jsonify({"message": "Invalid password"}), 401
        else:
            return jsonify({"message": "User not found"}), 404

@app.route('/admin/dashboard', methods=['GET'])
@jwt_required()  # This requires the user to be logged in with a valid JWT
def admin_dashboard():
    user_id = get_jwt_identity()  # Get the identity (user ID) from the JWT token
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message":"user not found"}),404
    if user.username!="admin":
        return jsonify({"message":'unauthorised access'}),403
    if request.method=='GET':
        all_camps=Camp.query.all()
        all_ads = Ad.query.all() 
        campaign_list = [
            {
            'camp_id': camp.id,
            'camp_name': camp.camp_name,
            'description': camp.camp_details,
            'start_date': camp.start_date,
            'end_date': camp.end_date,
            'price': camp.price,
            'category': camp.category,
            'creator':camp.username,
            'reach':camp.expected_reach,
            'followers':camp.expected_followers
            } for camp in all_camps
        ]
        ad_list=[
        {'ad_id':ad.id,
        'ad_name':ad.ad_name,
        'ad_details':ad.ad_details,
        'camp_name':ad.camp_name,
        'creator':ad.username,
        'audience':ad.ad_aud,
        'budget':ad.ad_price,
        'duration':ad.ad_duration,
        }
        for ad in all_ads
        ]

        active_influencers = db.session.query(User).join(UserRoles).join(Role).filter(User.active == True, Role.name == 'influencer').count()
        active_sponsors = db.session.query(User).join(UserRoles).join(Role).filter(User.active == True, Role.name == 'sponsor').count()
        ongoing_campaigns = db.session.query(Camp).count()
        ongoing_ads = db.session.query(Ad).count()
        flagged_ads = db.session.query(F_Ad).count()
        flagged_campaigns = db.session.query(F_Camp).count()
        return jsonify({'username': user.username,
                        'campaigns':campaign_list,
                        'ads':ad_list,
                        'total_influencers':active_influencers,
                        'total_sponsors':active_sponsors,
                        'total_camps':ongoing_campaigns,
                        'total_ads':ongoing_ads,
                        'total_f_ad':flagged_ads,
                        'total_f_camp':flagged_campaigns
                        }), 200

@app.route('/admin/flag_ad', methods=['POST'])
@jwt_required()
def flag_ad():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "user not found"}), 404

    data = request.get_json()
    existing_flag = F_Ad.query.filter_by(ad_name=data['ad_name'], username=data['username']).first()
    if existing_flag:
        return jsonify({"message": "Ad is already flagged."}), 400
    new_flagged_ad = F_Ad(
        username=data['username'],
        ad_name=data['ad_name'],
        ad_details=data['ad_details'],
        camp_name=data['camp_name'],
        ad_aud=data['audience'],
        ad_price=data['budget'],
        ad_duration=data['duration']
    )
    db.session.add(new_flagged_ad)
    db.session.commit()
    return jsonify({"message": "Ad flagged successfully."}), 201

@app.route('/admin/flag_campaign', methods=['POST'])
@jwt_required()
def flag_campaign():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "user not found"}), 404

    data = request.get_json()
    existing_flag = F_Camp.query.filter_by(camp_name=data['camp_name'], username=data['username']).first()
    if existing_flag:
        return jsonify({"message": "Campaign is already flagged."}), 400
    new_flagged_camp = F_Camp(
        username=data['username'],
        camp_name=data['camp_name'],
        camp_details=data['camp_details'],
        price=data['price'],
        start_date=data['start_date'],
        end_date=data['end_date'],
        category=data['category'],
        expected_followers=data['expected_followers'],
        expected_reach=data['expected_reach']
    )
    db.session.add(new_flagged_camp)
    db.session.commit()
    return jsonify({"message": "Campaign flagged successfully."}), 201

#-------------------------------------------Sign Up routing---------------------------------------------


@app.route('/userlogin/sign_up',methods=['POST'])
def user_login_sign_up():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    industry = data.get('industry', None)
    role_name = data.get('role')
    user_exists = User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first()
    if user_exists:
        return jsonify({"message": "Username or Email already exists"}), 409  # Conflict status

    hashed_password = generate_password_hash(password)
    role = Role.query.filter_by(name=role_name).first()
    if not role:
        return jsonify({"message": "Role does not exist"}), 400  # Bad Request


    new_user = User(username=username, email=email, password=hashed_password, industry=industry, active=True, fs_uniquifier=username)  # 'active' is set to True, assuming the user is active by default

    try:
        db.session.add(new_user)
        db.session.commit()
        user_role = UserRoles(user_id=new_user.id, role_id=role.id)
        db.session.add(user_role)
        db.session.commit()

        return jsonify({"message": "User registered successfully!"}), 201  # Created status
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error in registration", "error": str(e)}), 500  # Internal server error

#-------------------Influencer Dashboard-----------------------------------------------------------------------------------------------

@app.route('/userlogin/inf_dash/<username>',methods=['GET','POST'])
@jwt_required()
def inf_dash(username):
    current_user_id = get_jwt_identity()
    #user = User.query.filter_by(username=username).first()
    user=User.query.get(current_user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    if user.username != username:
        return jsonify({"message": "Unauthorized access"}), 403
    all_camps = Camp.query.all()
    all_ads = Ad.query.all() 
    campaign_list = [
        {
            'camp_id': camp.id,
            'camp_name': camp.camp_name,
            'description': camp.camp_details,
            'start_date': camp.start_date,
            'end_date': camp.end_date,
            'price': camp.price,
            'category': camp.category,
            'creator':camp.username
        } for camp in all_camps
    ]
    ad_list=[
        {'ad_id':ad.id,
        'ad_name':ad.ad_name,
        'ad_details':ad.ad_details,
        'camp_name':ad.camp_name,
        'creator':ad.username,
        'audience':ad.ad_aud,
        'budget':ad.ad_price,
        'duration':ad.ad_duration}
        for ad in all_ads
    ]
    if user:
        return jsonify({
            'username': user.username,
            'campaigns':campaign_list,
            'ads':ad_list
        }), 200
    else:
        return jsonify({"message": "User not found"}), 404
   
@app.route('/userlogin/inf_dash/camps/<username>',methods=['GET','POST'])
@jwt_required()
def search_camps(username):
    if request.method=='POST':
        try:
            data = request.get_json()
            niche = data.get('niche')
            reach = data.get('reach')
            followers = data.get('followers')
            if not niche or not reach or not followers:
                return jsonify({"error": "Missing one or more filter values"}), 400

            filtered_camps = Camp.query.filter_by(category=niche,
                               expected_reach = reach,
                               expected_followers = followers).all()
            if not filtered_camps:
                return jsonify({"message": "No campaigns found matching the filters"}), 404
            camp_list = []
            for camp in filtered_camps:
                camp_list.append({
                    'id': camp.id,
                    'camp_name': camp.camp_name,
                    'sponsor':camp.username,
                    'camp_details': camp.camp_details,
                    'price': camp.price,
                    'start_date': camp.start_date,
                    'end_date': camp.end_date,
                    'cat':camp.category
                })
            return jsonify(camp_list), 200
        except Exception as e:
            return jsonify({"message":"Error searching camps"})

@app.route("/userlogin/inf_dash/camp_accept/<string:username>", methods=['GET','POST'])  # camps added on clicking 'Accept' button
@jwt_required()
def task_add_success(username):
    if request.method=='POST':
        camp_data = request.get_json()
        camp_id = camp_data['camp_id']
        existing_camp = Influ_Camp.query.filter_by(camp_id=camp_id, username=username).first()
        if existing_camp:
            return jsonify({"message": "already accepted"}), 400
        new_camp = Influ_Camp(
            camp_id=camp_data['camp_id'],
            username=username,
            spon_username=camp_data['spon_username'],  # Assuming this is the sponsor username
            camp_name=camp_data['camp_name'],
            camp_details=camp_data['camp_details'],
            price=camp_data['price'],
            start_date=camp_data['start_date'],
            end_date=camp_data['end_date'],
            category=camp_data['category']
        )
        db.session.add(new_camp)
        db.session.commit()

        return jsonify({"message": "Campaign added successfully!"}), 200
    else:
        return jsonify({"message": "Invalid method"}), 400


@app.route("/userlogin/inf_dash/your_camps/<string:username>",methods=['GET','POST']) #list of chosen camps by the influencer
@jwt_required()
def chosen_camps(username):
    influencer_camps = Influ_Camp.query.filter_by(username=username).all()
    flagged_camp = F_Camp.query.filter(F_Camp.camp_name.in_([p.camp_name for p in influencer_camps])).all()
    influencer_camps_data = [
        {
            'camp_id': camp.camp_id,
            'spon_username': camp.spon_username,
            'camp_name': camp.camp_name,
            'camp_details': camp.camp_details,
            'price': camp.price,
            'start_date': camp.start_date,
            'end_date': camp.end_date,
            'category': camp.category,
        } 
        for camp in influencer_camps
    ]
    
    flagged_camps = [f.camp_name for f in flagged_camp]
    return jsonify({
        'influencer_camps': influencer_camps_data,
        'flagged_camps': flagged_camps,
        'username': username
    })

@app.route("/userlogin/inf_dash/your_camps/delete/<int:camp_id>/<string:username>",methods=['DELETE']) # Influencer task delete 
@jwt_required()
def delete_inf_task(camp_id,username):
    to_delete=Influ_Camp.query.filter_by(camp_id=id).first()
    if to_delete:
          db.session.delete(to_delete)
          db.session.commit()
          return jsonify({'message': 'Campaign deleted successfully'}), 200
    return jsonify({'message': 'Campaign not found'}), 404

@app.route('/userlogin/inf_dash/submit_your_like/<string:username>',methods=['POST','GET']) #Influencer submits his/her preferences 
@jwt_required()
def submit_your_like(username):
    try:
        if request.method == 'POST':
            niche = request.json.get('niche')
            reach = request.json.get('reach')
            followers = request.json.get('followers')
            motto = request.json.get('motto')
            exp = request.json.get('exp')

            new_influencer = Influencer_Like(
                username=username,
                niche=niche,
                reach=reach,
                followers=followers,
                motto=motto,
                exp=exp
            )

            db.session.add(new_influencer)
            db.session.commit()
            return jsonify({"message": "Successfully submitted preferences."}), 200
    except Exception as e:
        return jsonify({"message": f"Failed to submit preferences: {str(e)}"}), 500

#-------------------Sponsor Dashboard---------------------------------------------------------------------------------------------------

@app.route('/userlogin/spon_dash/<string:username>', methods=['GET','POST'])
@jwt_required()
def spon_dash(username):
    user = User.query.filter_by(username=username).first()
    if user:
        other_camps = Camp.query.filter(Camp.username != username).all()
        other_ads = Ad.query.filter(Ad.username != username).all()
        camp_data = [
            {"id": camp.id, "name": camp.camp_name, "description": camp.camp_details}
            for camp in other_camps
        ]
        ad_data = [
            {"id": ad.id, "name": ad.ad_name, "description": ad.ad_details}
            for ad in other_ads
        ]
        return jsonify({
            'username': user.username,
            'other_camps': camp_data,
            'other_ads': ad_data
        }), 200
    else:
        return jsonify({"message": "User not found"}), 404


@app.route("/userlogin/spon_dash/create_task/<username>",methods=['GET','POST']) #sponsor is creating camps
@jwt_required()
def create_task(username):
    if request.method=='POST':
        data=request.json
        camp_name = data['campaignName']
        camp_desc = data['campaignDescription']
        camp_price=data['campaignPrice']
        camp_start=data['campaignStart']
        camp_end=data['campaignEnd']
        camp_cat=data['campaignCategory']
        camp_followers=data['campaignFollowers']
        camp_reach=data['campaignReach']
        new_task=Camp(username=username,camp_name=camp_name,camp_details=camp_desc,price=camp_price,category=camp_cat,start_date=camp_start,end_date=camp_end,expected_reach=camp_reach,expected_followers=camp_followers)
        try:
            db.session.add(new_task)
            db.session.commit()
            return jsonify({"message": "Campaign created sucessfully!"}),200
        except Exception as e:
            db.session.rollback()
            return jsonify({"message": f"Error creating campaign: {str(e)}"}), 500


@app.route("/delete_task/<int:task_id>/<username>",methods=['GET',"POST"])  # Sponsor is deleting his/her created task
@jwt_required()
def delete_task(task_id,username):
    to_delete = Camp.query.get(task_id)
    if to_delete:
        delete_infcamp = Influ_Camp.query.filter_by(camp_name=to_delete.camp_name).first()
        db.session.delete(to_delete)
        if delete_infcamp:
            db.session.delete(delete_infcamp)
        db.session.commit()
        return jsonify({"success": True, "message": "Campaign deleted successfully."})
    else:
        return jsonify({"success": False, "message": "Campaign not found."})

@app.route("/userlogin/spon_dash/search_influ/<username>",methods=['GET',"POST"])  # Sponsor is searching for influencer
@jwt_required()
def spon_search_inf_details(username):
    if request.method=='POST':
        try:
            data = request.json
            niche = data.get('niche')
            reach = data.get('reach')
            followers = data.get('followers')
            sorted_influencers = Influencer_Like.query.filter_by(niche=niche, reach=reach, followers=followers).all()
            influencer_list = [
                {
                    'username':influencer.username,
                    'niche': influencer.niche,
                    'reach': influencer.reach,
                    'followers': influencer.followers,
                    'motto':influencer.motto,
                    'exp':influencer.exp
                } for influencer in sorted_influencers
            ]
            return jsonify(influencers=influencer_list, username=username),200
        except Exception as e:
            return jsonify({"message": f"Error searching for influencers: {str(e)}"}), 500
    return jsonify({"message": "Use POST to search influencers."}), 400

@app.route("/userlogin/spon_dash/update_task/<int:task_id>/<username>",methods=['GET',"POST"]) #Sponsor is updating his/her created task
@jwt_required()
def update_task(task_id, username):
    if request.method == "GET":
        task = Camp.query.get(task_id)
        if task:
            return jsonify({
                "camp_name": task.camp_name,
                "camp_details": task.camp_details,
                "price": task.price,
                "start_date": task.start_date,
                "end_date": task.end_date,
                "category": task.category
            }), 200
        else:
            return jsonify({"message": "Task not found"}), 404

    if request.method == "POST":
        task_data = request.get_json()
        task = Camp.query.get(task_id)
        if task:
            task.camp_name = task_data.get('camp_name', task.camp_name)
            task.camp_details = task_data.get('camp_details', task.camp_details)
            task.price = task_data.get('price', task.price)
            task.start_date = task_data.get('start_date', task.start_date)
            task.end_date = task_data.get('end_date', task.end_date)
            task.category = task_data.get('category', task.category)
            db.session.commit()

            return jsonify({"success": True, "message": "Task updated successfully!"}), 200
        else:
            return jsonify({"success": False, "message": "Task not found"}), 404

@app.route('/userlogin/spon_dash/your_camp/<username>',methods=["GET","POST"])
@jwt_required()
def your_camp(username):
    tasks=Camp.query.filter_by(username=username).all()
    task_list = []
    for p in tasks:
        flagged_camp = F_Camp.query.filter_by(camp_name=p.camp_name).first()
        task = {
            "id":p.id,
            "camp_name": p.camp_name,
            "camp_details": p.camp_details,
            "price": p.price,
            "start_date": p.start_date,
            "end_date": p.end_date,
            "category": p.category,
            "flagged": True if flagged_camp else False
        }
        task_list.append(task)

    return jsonify(task_list)

@app.route("/userlogin/spon_dash/other_camp_details/<int:camp_id>/<username>",methods=['GET','POST'])
@jwt_required()
def other_camp_details(camp_id,username):
    camp = Camp.query.filter_by(id=camp_id).first()
    if camp:
        flagged_camp= F_Camp.query.filter_by(camp_name=camp.camp_name).first()
        camp_data = {
            "camp_name": camp.camp_name,
            "camp_details": camp.camp_details,
            "price": camp.price,
            "start_date": camp.start_date,
            "end_date": camp.end_date,
            "category": camp.category,
            "expected_followers": camp.expected_followers,
            "expected_reach": camp.expected_reach,
            "username": camp.username
        }
        if flagged_camp:
            camp_data["flagged"] = True
        else:
            camp_data["flagged"] = False
        return jsonify(camp_data), 200
    else:
        return jsonify({"message": "Campaign not found"}), 404
    
@app.route("/userlogin/spon_dash/other_ad_details/<int:ad_id>/<username>",methods=['GET','POST'])
@jwt_required()
def other_ad_details(ad_id,username):
    ad = Ad.query.filter_by(id=ad_id).first()
    if ad:
        #flagged_ad= F_Ad.query.filter_by(ad_name=ad.ad_name, camp_name=ad.camp_name).first()
        flagged_ad= F_Ad.query.filter_by(ad_name=ad.ad_name).first()
        ad_data = {
            "ad_name": ad.ad_name,
            "ad_details": ad.ad_details,
            "camp_name": ad.camp_name,
            "ad_aud": ad.ad_aud,
            "ad_price": ad.ad_price,
            "ad_dur": ad.ad_duration,
            "username": ad.username
        }
        if flagged_ad:
            ad_data["flagged"] = True
        else:
            ad_data["flagged"] = False
        return jsonify(ad_data), 200
    else:
        return jsonify({"message": "Ad not found"}), 404

#---------------------------------------Chatting part------------------------------------------------------------------------


######################### CHAT BOX FOR INFLUENCER ################################################

@app.route("/userlogin/influencer_dash/get_sponsors/<username>", methods=['GET'])
@jwt_required()
def get_sponsors(username):
    # Fetch users with the role 'sponsor'
    sponsors = User.query.join(UserRoles).join(Role).filter(Role.name == 'sponsor').all()
    
    """sponsors_data = [
        {"username": sponsor.username} for sponsor in sponsors
    ]"""
    sponsors_data = [
        {"username": sponsor.username} for sponsor in sponsors if 'sponsor' in [role.name for role in sponsor.roles]
    ]
    
    return jsonify({"sponsors": sponsors_data}), 200

@app.route('/userlogin/influencer_dash/get_conversations/<string:username>/<string:sponsor>', methods=['GET'])
@jwt_required()
def get_influencer_conversations(username, sponsor):
    influencer = User.query.filter_by(username=username).first()
    sponsor_user = User.query.filter_by(username=sponsor).first()

    if not influencer or not sponsor_user:
        return jsonify({"message": "User not found"}), 404

    # Fetch all messages between influencer and sponsor
    influencer_messages = Message.query.filter_by(sender=username, recipient=sponsor).all()
    sponsor_messages = SponMessage.query.filter_by(sender=sponsor, recipient=username).all()

    conversations = []

    # Combine influencer and sponsor messages
    for msg in influencer_messages:
        conversations.append({
            "sender": msg.sender,
            "message": msg.content,
            "timestamp": msg.id  # Using the message ID as the timestamp for simplicity
        })

    for msg in sponsor_messages:
        conversations.append({
            "sender": msg.sender,
            "message": msg.content,
            "timestamp": msg.id  # Using the message ID as the timestamp for simplicity
        })

    # Sort conversations by timestamp (ID)
    conversations.sort(key=lambda x: x["timestamp"])

    return jsonify({"conversations": conversations})

@app.route('/userlogin/influencer_dash/send_message/<string:username>', methods=['POST'])
@jwt_required()
def send_influencer_message(username):
    data = request.get_json()

    recipient = data.get("recipient")
    message_content = data.get("message")

    if not recipient or not message_content:
        return jsonify({"message": "Recipient and message are required."}), 400

    sender = User.query.filter_by(username=username).first()
    recipient_user = User.query.filter_by(username=recipient).first()

    if not sender or not recipient_user:
        return jsonify({"message": "User not found."}), 404

    # Save the new message from influencer to sponsor
    new_message = Message(
        sender=username,
        recipient=recipient,
        content=message_content
    )
    db.session.add(new_message)
    db.session.commit()

    return jsonify({"message": "Message sent successfully!"})


############### CHAT BOX FOR SPONSOR #################################################

@app.route("/userlogin/spon_dash/get_influencers/<username>", methods=['GET'])
@jwt_required()
def get_influencers(username):
    influencers = User.query.join(UserRoles).join(Role).filter(Role.name == 'influencer').all()
    
    influencers_data = [
        {"username": influencer.username} for influencer in influencers
    ]
    
    return jsonify({"influencers": influencers_data}), 200

@app.route('/userlogin/spon_dash/get_conversations/<string:username>/<string:influencer>', methods=['GET'])
@jwt_required()
def get_conversations(username, influencer):
    sponsor = User.query.filter_by(username=username).first()
    influencer_user = User.query.filter_by(username=influencer).first()

    if not sponsor or not influencer_user:
        return jsonify({"message": "User not found"}), 404

    # Fetch all messages between sponsor and influencer
    sponsor_messages = SponMessage.query.filter_by(sender=username, recipient=influencer).all()
    influencer_messages = Message.query.filter_by(sender=influencer, recipient=username).all()

    conversations = []

    # Combine sponsor and influencer messages
    for msg in sponsor_messages:
        conversations.append({
            "sender": msg.sender,
            "message": msg.content,
            "timestamp": msg.id  # Using the message ID as the timestamp for simplicity
        })

    for msg in influencer_messages:
        conversations.append({
            "sender": msg.sender,
            "message": msg.content,
            "timestamp": msg.id  # Using the message ID as the timestamp for simplicity
        })

    # Sort conversations by timestamp (ID)
    conversations.sort(key=lambda x: x["timestamp"])

    return jsonify({"conversations": conversations})

@app.route('/userlogin/spon_dash/send_message/<string:username>', methods=['POST'])
@jwt_required()
def send_message(username):
    data = request.get_json()
    recipient = data.get("recipient")
    message_content = data.get("message")

    if not recipient or not message_content:
        return jsonify({"message": "Recipient and message are required."}), 400

    sender = User.query.filter_by(username=username).first()
    recipient_user = User.query.filter_by(username=recipient).first()

    if not sender or not recipient_user:
        return jsonify({"message": "User not found."}), 404

    # Save the new message from sponsor to influencer
    new_message = SponMessage(
        sender=username,
        recipient=recipient,
        content=message_content
    )
    db.session.add(new_message)
    db.session.commit()

    return jsonify({"message": "Message sent successfully!"})



#------------------------------------------------------Ad management------------------------------------------------------

@app.route("/userlogin/spon_dash/create_ad/<username>",methods=['GET','POST'])
@jwt_required()
def ad_create_spon(username):
        if request.method=='POST':
            data=request.json
            ad_name=data['adName']
            ad_details=data['adDescription']
            camp_name=data['campName']
            ad_aud=data['adAud']
            ad_price=data['adPrice']
            ad_duration=data['adDur']
            new_ad=Ad(username=username,ad_name=ad_name,camp_name=camp_name,ad_details=ad_details,ad_aud=ad_aud,ad_price=ad_price,ad_duration=ad_duration)
            try:
                db.session.add(new_ad)
                db.session.commit()
                return jsonify({"message":"Ad created successfully"}),200
            except Exception as e:
                db.session.rollback()
                return jsonify({"message":f"Error creating ad:{str(e)}"}),500
   
@app.route("/delete_ad/<int:task_id>/<username>",methods=['GET',"POST"])  # Sponsor is deleting his/her ad
@jwt_required()
def delete_ad(task_id,username):
    to_delete=Ad.query.get(task_id)
    if to_delete:
          db.session.delete(to_delete)
          db.session.commit()
          return jsonify({"success":True,"message":"Ad deleted"})
    else:
        return jsonify({"sucess":False,"message":"Ad not found"})

@app.route("/userlogin/spon_dash/update_ad/<int:task_id>/<username>",methods=['GET',"POST"]) #Sponsor is updating his/her ad
@jwt_required()
def update_ad(task_id,username):
    if request.method=="GET":
        task=Ad.query.get(task_id)
        if task:
            return jsonify({
                "ad_name":task.ad_name,
                "camp_name":task.camp_name,
                "ad_price":task.ad_price,
                "ad_details":task.ad_details,
                "ad_duration":task.ad_duration,
                "ad_aud":task.ad_aud
            }),200
        else:
            return jsonify({"message":"Ad not found"}),404
    if request.method=="POST":
        task_data=request.get_json()
        task=Ad.query.get(task_id)
        if task:
            task.ad_name=task_data.get('ad_name',task.ad_name)
            task.camp_name=task_data.get('camp_name',task.camp_name)
            task.ad_price=task_data.get('ad_price',task.ad_price)
            task.ad_details=task_data.get('ad_details',task.ad_details)
            task.ad_duration=task_data.get('ad_duration',task.ad_duration)
            task.ad_aud=task_data.get('ad_aud',task.ad_aud)
            db.session.commit()
            return jsonify({"success":True,"message":"Ad updated successfully"}),200
        else:
            return jsonify({"success":False,"message":"Ad not found"}),404

@app.route('/userlogin/spon_dash/your_ad/<username>',methods=["GET","POST"])  #all the ads created by a sponsor
@jwt_required()
def your_ad(username):
    tasks=Ad.query.filter_by(username=username).all()
    task_list=[]
    for p in tasks:
        flagged_ad=F_Ad.query.filter_by(ad_name=p.ad_name).first()
        task={
            "id":p.id,
            "ad_name":p.ad_name,
            "camp_name":p.camp_name,
            "ad_details":p.ad_details,
            "ad_aud":p.ad_aud,
            "ad_price":p.ad_price,
            "ad_dur":p.ad_duration,
            "flagged": True if flagged_ad else False
        }
        task_list.append(task)
    return jsonify(task_list)

#------------------------ Ad and Camp flagging by admin ------------------------------------------------

@app.route("/admin/flagged_ads", methods=['GET'])
@jwt_required()
def flagged_ads():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "user not found"}), 404

    flagged_ads = F_Ad.query.all()
    ads_list = [
        {
            'id': ad.id,
            'ad_name': ad.ad_name,
            'username': ad.username,
            'ad_details': ad.ad_details,
            'camp_name': ad.camp_name,
            'ad_aud': ad.ad_aud,
            'ad_price': ad.ad_price,
            'ad_duration': ad.ad_duration,
        } for ad in flagged_ads
    ]
    return jsonify(ads_list), 200

@app.route("/admin/flagged_camps", methods=['GET'])
@jwt_required()
def flagged_campaigns():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "user not found"}), 404

    flagged_campaigns = F_Camp.query.all()
    campaigns_list = [
        {
            'id': campaign.id,
            'camp_name': campaign.camp_name,
            'username': campaign.username,
            'camp_details': campaign.camp_details,
            'start_date': campaign.start_date,
            'end_date': campaign.end_date,
            'price': campaign.price,
            'category': campaign.category,
            'flagged_by': campaign.flagged_by
        } for campaign in flagged_campaigns
    ]
    return jsonify(campaigns_list), 200

@app.route("/admin/unflag_ad/<int:ad_id>", methods=['DELETE'])
@jwt_required()
def unflag_ad(ad_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "user not found"}), 404

    flagged_ad = F_Ad.query.get(ad_id)
    if not flagged_ad:
        return jsonify({"message": "Flagged ad not found"}), 404

    db.session.delete(flagged_ad)
    db.session.commit()
    return jsonify({"message": "Ad unflagged successfully."}), 200

@app.route("/admin/unflag_campaign/<int:campaign_id>", methods=['DELETE'])
@jwt_required()
def unflag_campaign(campaign_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "user not found"}), 404

    flagged_campaign = F_Camp.query.get(campaign_id)
    if not flagged_campaign:
        return jsonify({"message": "Flagged campaign not found"}), 404

    db.session.delete(flagged_campaign)
    db.session.commit()
    return jsonify({"message": "Campaign unflagged successfully."}), 200


@app.route('/api/sponsor/<username>/export', methods=['POST'])
def export_sponsor(username):
    user=User.query.filter_by(username=username).first()
    id=user.id
    task = create_csv_report.delay(id)
    return jsonify({ 'task_id': task.id,'message':'CSV report sent to email.' }), 202