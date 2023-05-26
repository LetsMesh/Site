from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from django.http import HttpResponse
from django.contrib.auth.models import User
import json
import smtplib
import os

def index(request):
    if request.method == "GET":
        print(request)
        return HttpResponse("Hello, world.")

def verify_email(request):
    
    sender = "JRSiwiecki@gmail.com"
    receiver = sender
    
    message = """From: LetsMesh <letsmesh@letsmesh.com>
    To: To User <user@domain.com
    MIME-Version: 1.0
    Content-type: text/html
    Subject: Please Verify Your Email
    
    <h1>Please Verify Your Email</h1>
    <p>Enter this code <strong>012345</strong> to verify your email/</p>
    
    """
    
    try:
        smptpObj = smtplib.SMTP("localhost")
        smptpObj.sendmail(sender, receiver, message)
        print("Success")
    except:
        print("Error: Unable to send email.")