from django.http import JsonResponse, HttpResponse
import json, bcrypt
from django.contrib.auth import authenticate, login, logout
from mesh.accounts.models import Account
from mesh.accounts.views import decrypt

def login_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            # Query to check if user exists
            account = Account.objects.get(email=email)
            if account and account.password == decrypt(password, account.salt):
                login(request, account)  # This creates the session
                return JsonResponse({"message": "Access granted"}, status=200)
            else:
                # Generic error message for security
                return JsonResponse({"error": "Invalid credentials"}, status=401)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)

def session_check_view(request):
    if request.user.is_authenticated:
        return JsonResponse({'is_logged_in': True})
    else:
        return JsonResponse({'is_logged_in': False}, status=401)
    
def logout_view(request):
    logout(request)
    return JsonResponse({'status': 'Logged out successfully!'})

