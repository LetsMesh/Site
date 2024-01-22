from django.http import JsonResponse, HttpResponse
import json
from django.contrib.auth import authenticate, login, logout

def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        # You would need to authenticate the user here
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)  # This creates the session
            return JsonResponse({'status': 'Logged in successfully!'})
        else:
            return JsonResponse({'error': 'Invalid credentials!'}, status=401)

def logout_view(request):
    logout(request)
    return JsonResponse({'status': 'Logged out successfully!'})
