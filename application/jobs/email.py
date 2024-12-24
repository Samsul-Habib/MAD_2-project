import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication

MAIL_SERVER_HOST = "localhost"
MAIL_SERVER_PORT = 1025
EMAIL_SENDER = 'inflenceHub@yahoo.com'
EMAIL_PASSWORD = ''

def dispatch_email(receiver, mail_subject, mail_body, attachment_path=None):
    message = MIMEMultipart()
    message['From'] = EMAIL_SENDER
    message['To'] = receiver
    message['Subject'] = mail_subject
    
    message.attach(MIMEText(mail_body, "html"))

    if attachment_path is not None:
        with open(attachment_path, 'rb') as file:
            attachment = MIMEApplication(file.read(), _subtype='zip')
            attachment.add_header('Content-Disposition', 'attachment', filename=attachment_path)
            message.attach(attachment)
    
    with smtplib.SMTP(host=MAIL_SERVER_HOST, port=MAIL_SERVER_PORT) as server:
        server.login(EMAIL_SENDER, EMAIL_PASSWORD)
        server.send_message(message)
    
    return True