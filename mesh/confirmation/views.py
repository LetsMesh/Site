from django.http import HttpResponse
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from ..accounts.models import Account
from ..accountSettings.models import Settings
import secrets
import os
from dotenv import load_dotenv

load_dotenv()


# Generate random token for user, store it, and send confirmation email
# which then leads into the confirm_token function
def email_confirmation(request, user_email):
    # Grab account ID by user_email
    account_id = get_account_id(user_email)

    if account_id is None:
        return HttpResponse(user_email + ": User does not exist!")
    
    # Grab account email verification status
    email_already_verified = get_verification_status(account_id)

    # Check if user email is verified yet or not
    # if so, skip generating new token
    if email_already_verified:
        return HttpResponse(user_email + ": User email already verified!")

    # Generate a token for the user
    verification_token = secrets.token_hex(16)

    # update the settings table with the verification_token
    Settings.objects.filter(accountID=account_id).update(
        verificationToken=verification_token
    )

    # Construct the confirmation URL
    confirmation_url = request.build_absolute_uri(
        f"/confirmation/{user_email}/{verification_token}/"
    )

    # Render the email template with the confirmation URL
    email_subject = "Account Confirmation"
    email_template = "confirmation_email.html"
    email_context = {"confirmation_url": confirmation_url}
    email_message = render_to_string(email_template, email_context)
    email_plain_message = strip_tags(email_message)

    print(os.environ.get("EMAIL_NAME"))

    # Send the confirmation email
    send_mail(
        email_subject,
        email_plain_message,
        os.environ.get("EMAIL_NAME"),
        [user_email],
        html_message=email_message,
    )

    return HttpResponse(user_email + ": Confirmation email sent!")


# Check that the user's stored token is the same one in the URL,
# if so, set isVerified to true.
def confirm_token(request, user_email, url_token):
    # Grab account data by user_email
    account_id = get_account_id(user_email)

    # Grab settings data by the account_id
    settings_data = get_settings_data(account_id)

    email_already_verified = get_verification_status(account_id)

    # Check if user email is verified yet or not
    # if so, skip updating settings table
    if email_already_verified:
        return HttpResponse(
            user_email
            + ": Email confirmation success as user email is already verified!"
        )

    # Grab the token stored in the database for this user
    db_token = settings_data["verificationToken"]

    # If the tokens match, then the user is verified
    if url_token == db_token:
        Settings.objects.filter(accountID=account_id).update(isVerified=True)
        return HttpResponse(user_email + ": Email confirmation success!")
    else:
        return HttpResponse(user_email + ": Email confirmation failed!")


# Note: For the Django function Model.objects.filter(...), the function
# returns a QuerySet, which is just a set of objects (python dicts).
# If the user has a unique email/accountID, then the user should be the only item in the set,
# and thus will be the at the 0th index. Each function checks if the user exists.

# Grab account ID by user_email
def get_account_id(user_email):
    raw_account_data = Account.objects.filter(email=user_email).values()
    print(raw_account_data)
    
    if not raw_account_data:
        return None

    account_data = raw_account_data[0]
    print(account_data)
    account_id = account_data["accountID"]

    return account_id


# Grab settings data by the account_id
# settings_data is a python dict containing
# data for each field in the Settings model
def get_settings_data(account_id):
    raw_settings_data = Settings.objects.filter(accountID=account_id).values()
    
    if not raw_settings_data:
        return None

    settings_data = raw_settings_data[0]

    return settings_data


# Returns true or false depending on if user email is already verified
def get_verification_status(account_id):
    settings_data = get_settings_data(account_id) 
    email_verification_status = settings_data["isVerified"]

    return email_verification_status
