from django.core.exceptions import ObjectDoesNotExist
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
        return get_data(request, "profilePicture", lambda profile: profile.profilePicture.url)


def user_name(request):
    if request.method == "GET":
        return get_data(request, "userName", lambda profile: profile.userName)


def preferred_name(request):
    if request.method == "GET":
        return get_data(request, "preferredName", lambda profile: profile.preferredName)


def preferred_pronouns(request):
    if request.method == "GET":
        return get_data(request, "preferredPronouns", lambda profile: profile.preferredPronouns)


def get_data(request, name, mapper):
    response = {}
    if request.GET.get("accountID") is None:
        response.update({"status": "error"})
        response.update({"message": "Missing account ID."})
    else:
        try:
            profile = Profile.objects.get(accountID=int(request.GET.get("accountID")))
            response.update({"status": "success"})
            response.update({
                "data": {
                    "get": {
                        name: mapper(profile)
                    }
                }
            })
        except ObjectDoesNotExist:
            response.update({"status": "error"})
            response.update({"message": "An account does not exist with this account ID."})
        except AttributeError:
            response.update({"status": "error"})
            response.update({"message": "Attribute does not exist."})
    return JsonResponse(response)
