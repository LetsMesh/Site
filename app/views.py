from collections import UserDict
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import json
import os
import smtplib
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index(request):
    if request.method == "GET":
        print(request)
        return HttpResponse("Hello, world.")

def password_reset(request):
    # initialize office365 smtp and login
    server_365 = smtplib.SMTP('smtp.office365.com', 587)
    server_365.starttls()
    server_365.login("letsmesh_testing@outlook.com", os.environ.get("EMAIL_PASSWORD"))

    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        recipient = str(body_data['email'])

        try:
            # commented out until i figure out how to create token out of user object
            # user = User.objects.get(email=email)
            # token = default_token_generator.make_token(user)

            # hard coded token for now
            token = 'B2vTFXpnRSpAAw8KQ3lL594iZlcN9B1y'

            # build multi-part email message
            email_message = MIMEMultipart()
            email_message['From'] = os.environ.get('EMAIL_NAME')
            email_message['To'] = recipient
            email_message['Subject'] = 'LetsMesh: Password Reset'
            # attach message to email
            email_message.attach(MIMEText(f'Here is the link you requested to reset your password: http://localhost:3000/api/user/reset/{token}', 'plain'))

            # send constructed email to recipient
            server_365.sendmail(os.environ.get("EMAIL_NAME"), recipient, email_message.as_string())
            # end SMTP connection
            server_365.quit()
            return HttpResponse("Email sent")
        except UserDict.DoesNotExist:
            return HttpResponse("User does not exist")
    else:
        return HttpResponse("Invalid HTTP method")
