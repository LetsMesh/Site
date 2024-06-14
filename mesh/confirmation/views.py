# Django
from django.http import HttpResponse
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags

# Models
from ..accounts.models import Account
from ..accountSettings.models import Settings
from ..profiles.models import Profile

# Libraries
import secrets
import os
import time

# Generate random token for user, store it, and send confirmation email
# which then leads into the confirm_token function
def email_confirmation(request, user_email):
    # Grab account ID by user_email
    account_id = get_account_id(user_email)

    # Check if an account was found
    if account_id is None:
        return HttpResponse(user_email + ": User does not exist!")
    
    # Grab account email verification status
    email_already_verified = get_verification_status(account_id)

    # Check if user email is verified yet or not
    # if so, skip generating new token
    if email_already_verified:
        return HttpResponse(user_email + ": User email already verified!")

    # Prevent user from generating too many tokens/receiving too many emails
    settings_data = get_settings_data(account_id)
    
    EMAIL_CONFIRMATION_COOLDOWN_SECONDS = 600
    EMAIL_CONFIRMATION_COOLDOWN_MINUTES = EMAIL_CONFIRMATION_COOLDOWN_SECONDS // 60
    
    seconds_since_last_token = calculate_timestamp_difference(settings_data.verificationToken)
    minutes_since_last_token = seconds_since_last_token // 60
    
    if seconds_since_last_token <= EMAIL_CONFIRMATION_COOLDOWN_SECONDS:
        return HttpResponse(user_email + ": It has been " + str(minutes_since_last_token) + 
                            " minutes since last attempt at verifying email! Please try again in " + 
                            str(EMAIL_CONFIRMATION_COOLDOWN_MINUTES - minutes_since_last_token) + " minutes.")
    
    # Generate a token for the user
    verification_token = generate_token_with_timestamp()

    # update the settings table with the verification_token
    settings_data.verificationToken = verification_token
    settings_data.save()

    # Construct the confirmation URL
    confirmation_url = request.build_absolute_uri(
        f"/confirmation/{user_email}/{verification_token}/"
    )

    user_preferred_name = get_preferred_name(account_id)
    
    # Render the email template with the confirmation URL
    email_subject = "Account Confirmation"
    email_template = "confirmation_email.html"
    email_context = {"confirmation_url": confirmation_url, "name": user_preferred_name}
    email_message = render_to_string(email_template, email_context)
    email_plain_message = strip_tags(email_message)

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
    db_token = settings_data.verificationToken

    # If the tokens match, then the user is verified
    if url_token == db_token:
        settings_data.isVerified = True
        settings_data.save()
        return HttpResponse(user_email + ": Email confirmation success!")
    else:
        return HttpResponse(user_email + ": Email confirmation failed!")


# Note: For the Django function Model.objects.get(...), the function
# returns a QuerySet, which is just a set of objects (python dicts).
# If the user has a unique email/accountID, then the user should be the only item in the set,
# and thus will be the at the 0th index. Each function checks if the user exists, if they don't
# then the QuerySet will be empty.

# Grab account ID by user_email
def get_account_id(user_email):
    account_data = Account.objects.get(email=user_email)
    
    if not account_data:
        return None

    return account_data.accountID


# Grab settings data by the account_id
# settings_data is a python dict containing
# data for each field in the Settings model
def get_settings_data(account_id):
    settings_data = Settings.objects.get(accountID=account_id)

    if not settings_data:
        return None

    return settings_data


# Returns true or false depending on if user email is already verified
def get_verification_status(account_id):
    settings_data = get_settings_data(account_id) 

    return settings_data.isVerified


# Returns the preferred name of the user from their Profile Data
def get_preferred_name(account_id):
    profile_data = Profile.objects.get(accountID=account_id)

    return profile_data.preferredName


# Returns a token of specified length + timestamp of current time appended to end
# Note: Token is seemingly maxed at length 8 due to how the token is stored in DB.
def generate_token_with_timestamp(token_length=12):
    token = secrets.token_hex(token_length)
    
    timestamp = str(int(time.time()))

    token = token + "_" + timestamp

    return token

# Returns the difference in seconds (as an int) between two timestamps,
# in this case, this is only being used to calculate the time between the
# timestamp stored in the verification token, and the current timestamp.
def calculate_timestamp_difference(token):

    # delimeter/marker is an "_", separates token from timestamp
    marker_position = token.find("_")

    first_timestamp = float(token[marker_position + 1:])

    current_timestamp = int(time.time())

    time_difference = abs(current_timestamp - first_timestamp)

    return int(time_difference)