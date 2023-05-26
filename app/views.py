import json
import smtplib
from django.http import HttpResponse
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.models import User
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

def index(request):
    if request.method == "GET":
        print(request)
        return HttpResponse("Hello, world.")
    
def verify_email(request):
    
    if request.method == "POST":
        print(request)

        server_365 = smtplib.SMTP("smtp.office365.com", 587)
        server_365.starttls()
        server_365.login("letsmesh_testing@outlook.com", os.environ.get("EMAIL_PASSWORD"))
    
        body_unicode = request.body.decode("utf-8")
        body_data = json.loads(body_unicode)
        recipient = str(body_data["email"])

        code = 12345
        
        email_message = MIMEMultipart()
        email_message["From"] = os.environ.get("EMAIL_NAME")
        email_message["To"] = recipient
        email_message["Subject"] = "LetMesh: Please Verify Your Email"

        email_message.attach(MIMEText(f"Please enter this code on your signup page to verify your email: {code}", "plain"))
        
        try:
            server_365.sendmail(os.environ.get("EMAIL_NAME"), recipient, email_message.as_string())
            server_365.quit()
            print("Success")
            return HttpResponse("Email successfully sent.")
        except:
            print("ERROR: Unable to send email.")
            return HttpResponse("ERROR: Unable to send email.")

    return HttpResponse(request)
    