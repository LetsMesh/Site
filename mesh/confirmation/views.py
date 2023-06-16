from django.http import HttpResponse
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
import secrets

def email_confirmation(request, user_email):
    # Generate a token (using Django's default token generator)
    confirmation_token = secrets.token_hex(16)  # 16 bytes converted to hex string

    # Construct the confirmation URL
    confirmation_url = request.build_absolute_uri(f"/confirmation/{user_email}/{confirmation_token}/")

    # Render the email template with the confirmation URL
    email_subject = 'Account Confirmation'
    email_template = 'confirmation_email.html'
    email_context = {'confirmation_url': confirmation_url}
    email_message = render_to_string(email_template, email_context)
    email_plain_message = strip_tags(email_message)

    # Send the confirmation email
    send_mail(email_subject, email_plain_message, 'letsmesh_testing02@outlook.com', 
              [user_email], html_message=email_message)

    # Redirect the user to a success page or display a success message
    return HttpResponse(user_email + ": Confirmation email sent!")

def confirm_token(request, user_email, token):
    return HttpResponse(user_email + ": Email confirmation success!")