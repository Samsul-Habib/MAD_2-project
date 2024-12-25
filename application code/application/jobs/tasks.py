from application.jobs.workers import celery
from datetime import datetime, timedelta
from celery.schedules import crontab
from jinja2 import Template
from application.jobs.email import dispatch_email
from application.data.models import *
import csv, os

@celery.on_after_finalize.connect
def schedule_daily_task(sender, **kwargs):
    # Schedule a daily task that runs at 8:33 AM every day
    sender.add_periodic_task(crontab(hour=11, minute=2), daily_email_task.s(), name="daily_email_task")

"""@celery.on_after_finalize.connect
def schedule_monthly_task(sender, **kwargs):
    # Schedule a monthly task that runs on the 11th of each month at 8:33 AM
    sender.add_periodic_task(crontab(day_of_month='30', hour=00, minute=23), monthly_email_task.s(), name="monthly_email_task")
"""
@celery.task
def daily_email_task():
    users = User.query.all()
    for user in users:
        # Check if the user has logged in today
        #if datetime.now() - user.last_login >= timedelta(hours=24):  # Not visited today
        with open('templates/dailyalert.html') as template_file:
            template = Template(template_file.read())
            email_content = template.render(name=user.username, lastlogin=user.last_login)

        dispatch_email(
                receiver=user.email,
                mail_subject="You have not visited InfluenceHub today",
                mail_body=email_content
            )
    return "Daily emails have been sent to all users who have not visited InfluenceHub today"

"""@celery.task
def monthly_email_task():
    all_users = User.query.filter(User.roles.any(name='sponsor')).all()  # Filter users who are sponsors

    for user in all_users:
        campaigns = Camp.query.filter_by(username=user.username).all()  # Get all campaigns by the sponsor
        campaign_info = []
        total_ads_count = 0
        total_expense = 0.0

        for campaign in campaigns:
            ads = Ad.query.filter_by(camp_name=campaign.camp_name).all()  # Get all ads for the campaign
            ads_count = len(ads)
            expense = sum(float(ad.ad_price) for ad in ads)  # Assuming ad_price is stored as a string and needs to be converted to float
            total_ads_count += ads_count
            total_expense += expense

            campaign_info.append({
                'title': campaign.camp_name,
                'ads_count': ads_count,
                'expense': expense,
                'budget': float(campaign.price),  # Assuming price is treated as a number
                'remaining_budget': float(campaign.price) - expense,
            })

        with open('templates/monthlyalert.html') as template_file:
            template = Template(template_file.read())
            email_content = template.render(
                name=user.username,
                company_name=user.username,  # Using username as the company name for this example
                campaign_info=campaign_info,
                total_ads_count=total_ads_count,
                total_expense=total_expense
            )

        dispatch_email(
            receiver=user.email,
            mail_subject="Monthly Activity Report",
            mail_body=email_content
        )

    return "Monthly emails have been sent to all users with the 'sponsor' role!"
"""
@celery.task
def create_csv_report(user_id):
    #Task that generates a CSV report of all campaigns created by the user (sponsor) and sends it via email.
    user = User.query.get(user_id)  # Fetch user by ID
    campaigns = Camp.query.filter_by(username=user.username).all()  # Get all campaigns by the user (sponsor)

    # Generate the CSV report
    file_name = f'campaigns_{user_id}.csv'
    with open(file_name, mode='w') as file:
        writer = csv.writer(file)
        writer.writerow(['Campaign Name', 'Details', 'Price', 'Start Date', 'End Date', 'Category', 'Expected Followers', 'Expected Reach'])
        for campaign in campaigns:
            writer.writerow([ 
                campaign.camp_name,
                campaign.camp_details,
                campaign.price,
                campaign.start_date,
                campaign.end_date,
                campaign.category,
                campaign.expected_followers,
                campaign.expected_reach
            ])

    # Send the CSV report via email
    with open('templates/exportmail.html') as template_file:
        template = Template(template_file.read())
        email_body = template.render(name=user.username)

    dispatch_email(
        receiver=user.email,
        mail_subject="Monthly Campaign Report",
        mail_body=email_body,
        attachment_path=file_name
    )

    # Remove the temporary CSV file after sending it
    os.remove(file_name)

    return "CSV report generated and email sent to the user (sponsor)"