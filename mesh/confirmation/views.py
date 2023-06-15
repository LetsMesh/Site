from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.tokens import default_token_generator
from django.shortcuts import redirect

def email_confirmation(request, token):
    
    # TODO: Grab user trying to confirm their email, check that user exists.
    # Somewhere during signup, user should be sent a confirmation email.

    # Probably something like this
    User = "" # get_user_model()

    # Confirm user exists
    try:
        user = "" # User.objects.get(email=user.email)
    except User.DoesNotExist:
        pass

    # If the user token matches the one from the email, then
    # the user has been confirmed.
    if default_token_generator.check_token(user, token):
        
        # For our UML, the user's email_confirmed flag is actually
        # called isVerified in the AccountSettings table
        # so this should be changed most likely.
        user.email_confirmed = True
        user.save()

        return redirect("confirmation_success")
    
    else:
        return redirect("confirmation_error")
