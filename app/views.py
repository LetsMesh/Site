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

        verify_link = "http://127.0.0.1:8000/api/user"
        
        # Would like to make this more personal, such as including the user's username in the email,
        # as well as adding logos/more styling to the email overall.
        email_message_body = f"""
        <html>

            <body>
                <h1>Lets Mesh Email Verification</h1>
                <p>Before you can begin matching with others, you must verify your email.</p>
                <button><a href="{verify_link}">Verify Email</a></button>
            </body>

        </html>
        """
        
        email_message.attach(MIMEText(email_message_body, "html"))
        
        try:
            server_365.sendmail(os.environ.get("EMAIL_NAME"), recipient, email_message.as_string())
            server_365.quit()
            return HttpResponse("Email successfully sent.")
        except:
            return HttpResponse("ERROR: Unable to send email.")

    return HttpResponse(request)
    