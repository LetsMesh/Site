from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from mesh.profiles.models import Profile


def bio_view(request):
    if request.method == "POST":
        data = request.POST
        if 'accountID' not in data:
            return JsonResponse({'error': 'Invalid request. Missing accountID field.'}, status=401)
        if 'biography' not in data:
            return JsonResponse({'error': 'Invalid request. Missing biography field.'}, status=400)
        else:
            print(data.get('accountID') + " " + data.get('biography'))  # TODO: Save to database
            return JsonResponse({'message': 'biography saved successfully'}, status=200)
    else:
        return JsonResponse({'error': request.method + ' Method not allowed'}, status=405)


def profile_picture(request):
    if request.method == "GET":
        response = {
            "status": "success"
        }
        profile = get_profile(request.GET, response)
        if profile is not None:
            response.update({
                "data": {
                    "get": {
                        "profilePicture": profile.image.url
                    }
                }
            })
        return JsonResponse(response)


def user_name(request):
    if request.method == "GET":
        response = {
            "status": "success"
        }
        profile = get_profile(request.GET, response)
        if profile is not None:
            response.update({
                "data": {
                    "get": {
                        "userName": profile.userName
                    }
                }
            })
        return JsonResponse(response)


def preferred_name(request):
    if request.method == "GET":
        response = {
            "status": "success"
        }
        profile = get_profile(request.GET, response)
        if profile is not None:
            response.update({
                "data": {
                    "get": {
                        "preferredName": profile.preferredName
                    }
                }
            })
        return JsonResponse(response)


def preferred_pronouns(request):
    if request.method == "GET":
        response = {
            "status": "success"
        }
        profile = get_profile(request.GET, response)
        if profile is not None:
            response.update({
                "data": {
                    "get": {
                        "preferredPronouns": profile.preferredPronouns
                    }
                }
            })
        return JsonResponse(response)


def get_profile(data, response):
    if data.get("accountID") is None:
        response.update({"status": "error"})
        response.update({"message": "Missing account ID."})
        return None
    else:
        try:
            return Profile.objects.get(accountID=int(data.get("accountID")))
        except ObjectDoesNotExist:
            response.update({"status": "error"})
            response.update({"message": "An account does not exist with this account ID."})
            return None
