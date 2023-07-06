from django.http import HttpResponse
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from ..accounts.models import Account
from ..accountSettings.models import Settings
import secrets

# Generate random token for user and send confirmation email
def email_confirmation(request, user_email):
    
    # Grab account data by user_email
    raw_account_data = Account.objects.filter(email=user_email).values()
    account_data = raw_account_data[0]
    account_id = account_data["accountID"]
    print(account_id)

    # Grab settings data by the account_id
    raw_settings_data = Settings.objects.filter(accountID=account_id).values()
    settings_data = raw_settings_data[0]
    email_already_verified = settings_data["isVerified"]
    print(settings_data)

    # Check if user email is verified yet or not
    # if so, skip generating new token
    if email_already_verified:
        return HttpResponse(user_email + ": User email already verified!")
    
    # Generate a token for the user
    verification_token = secrets.token_hex(16)
    
    # update the settings table with the verification_token
    Settings.objects.filter(accountID=account_id).update(verificationToken=verification_token)

    # Construct the confirmation URL
    confirmation_url = request.build_absolute_uri(f"/confirmation/{user_email}/{verification_token}/")

    # Render the email template with the confirmation URL
    email_subject = 'Account Confirmation'
    email_template = 'confirmation_email.html'
    email_context = {'confirmation_url': confirmation_url}
    email_message = render_to_string(email_template, email_context)
    email_plain_message = strip_tags(email_message)

    # Send the confirmation email
    send_mail(email_subject, email_plain_message, 'letsmesh_testing02@outlook.com', 
              [user_email], html_message=email_message)

    return HttpResponse(user_email + ": Confirmation email sent!")

# Check that the user's stored token is the same one in the URL,
# if so, set isVerified to true.
def confirm_token(request, user_email, url_token):

    # Grab account data by user_email
    raw_account_data = Account.objects.filter(email=user_email).values()
    account_data = raw_account_data[0]
    account_id = account_data["accountID"]

    # Grab settings data by the account_id
    raw_settings_data = Settings.objects.filter(accountID=account_id).values()
    settings_data = raw_settings_data[0]
    
    # Grab the token stored in the database for this user
    db_token = settings_data["verificationToken"]

    # If the tokens match, then the user is verified
    if url_token == db_token:
        Settings.objects.filter(accountID=account_id).update(isVerified=True)
        return HttpResponse(user_email + ": Email confirmation success!")
    else:
        return HttpResponse(user_email + ": Email confirmation failed!")

    