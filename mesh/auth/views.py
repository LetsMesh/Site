# in auth folder: views.py  (auth.views)

import json
from django.http import JsonResponse, HttpResponseRedirect
from django.contrib.auth import login, logout
from django.views.decorators.http import require_POST,require_GET
from django.views.decorators.csrf import ensure_csrf_cookie
from mesh.accounts.models import Account
from .backend import AccountAuthenticationBackend

@require_POST
def login_view(request):
    """
    Handles user login requests.

    This view expects a POST request with 'email' and 'password' in the JSON body. It authenticates
    the user using a custom authentication backend, creates a session upon successful authentication,
    and returns user details along with login status.

    Returns:
        JsonResponse: A response with a success message and user details if authentication is successful,
                      otherwise an error message.
        Return status 201 if user is successfully verified
        Return status 400 if the login JSON data is invalid
        Return status 401 if the login failed
        Return status 500 if there is an internal error
    """
    try:
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")

        account_backend = AccountAuthenticationBackend()
        # Query to check if user exists
        account: Account = account_backend.authenticate(request=request,email=email, password=password)
        if account:
            login(request, account)  # This creates the session
            account_data = account_backend.get_account_data(account.accountID)
            return JsonResponse({"message": "Access granted", "is_logged_in": True, "account": account_data}, status=200)
        else:
            # Generic error message for security
            return JsonResponse({"error": "Invalid credentials"}, status=401)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON format"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

def logout_view(request):
    """
    Handle user logout requests.

    This view handles POST requests to log out the user by ending their session.
    After logging out, it redirects the user to the home page, with the URL
    being fetched from the environment variable `WEB_URL`. If `WEB_URL` is not
    set, it defaults to 'http://localhost:3000'.

    Args:
        request (HttpRequest): The HTTP request object.

    Returns:
        HttpResponseRedirect: A response that redirects to the home page after successful logout.
    """
    logout(request)
    import os
    return HttpResponseRedirect(os.environ.get('WEB_URL', 'http://localhost:3000'))

@ensure_csrf_cookie
@require_GET
def session_view(request):
    """
    Handles session check requests.

    This view expects a GET request. It checks if the user is authenticated and, if so,
    retrieves their account details including settings. It's decorated with `ensure_csrf_cookie`
    to ensure CSRF protection.

    Returns:
        JsonResponse: A response with the user's account details if authenticated, or an error message.
    """
    if request.user.is_authenticated:
        account = AccountAuthenticationBackend().get_account_data(request.user.accountID)
        if account:
            return JsonResponse({'is_logged_in': True, 'account': account}, status=200)
        else:
            return JsonResponse({'is_logged_in': False, 'error': 'Account not found'}, status=404)
    else:
        return JsonResponse({'is_logged_in': False}, status=401)

