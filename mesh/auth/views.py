import json
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import login, logout
from django.views.decorators.http import require_POST,require_GET
from django.views.decorators.csrf import ensure_csrf_cookie

from mesh.accounts.models import Account
from mesh.accounts.views import decrypt

from .backend import AccountAuthenticationBackend

@require_POST
def login_view(request):
    try:
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")

        # Query to check if user exists
        account: Account = AccountAuthenticationBackend().authenticate(request=request,email=email, password=password)
        if account:
            login(request, account)  # This creates the session
            return JsonResponse({"message": "Access granted", "accountID": account.accountID}, status=200)
        else:
            # Generic error message for security
            return JsonResponse({"error": "Invalid credentials"}, status=401)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON format"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@require_POST
def logout_view(request):
    logout(request)
    return JsonResponse({'status': 'Logged out successfully!'})

@ensure_csrf_cookie
def session_view(request):
    if request.user.is_authenticated:
        return JsonResponse({'is_logged_in': True, 'accountID': request.user.accountID}, status=200)
    else:
        return JsonResponse({'is_logged_in': False}, status=401)

