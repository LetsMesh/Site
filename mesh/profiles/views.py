from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.views import View

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


class ProfilePicturesView(View):
    def get(self, request, account_id, *args, **kwargs):
        return get_data(account_id, "profilePicture", lambda profile: profile.profilePicture.url)


class UserNamesView(View):
    def get(self, request, account_id, *args, **kwargs):
        return get_data(account_id, "userName", lambda profile: profile.userName)


class PreferredNamesView(View):
    def get(self, request, account_id, *args, **kwargs):
        return get_data(account_id, "preferredName", lambda profile: profile.preferredName)


class PreferredPronounsView(View):
    def get(self, request, account_id, *args, **kwargs):
        return get_data(account_id, "preferredPronouns", lambda profile: profile.preferredPronouns)


def get_data(account_id, name, mapper):
    try:
        profile = Profile.objects.get(accountID=int(account_id))
        return JsonResponse({
            "status": "success",
            "data": {
                "get": {
                    name: mapper(profile)
                }
            }
        }, status=200)
    except ObjectDoesNotExist:
        return JsonResponse({
            "status": "error",
            "message": "An account does not exist with this account ID."
        }, status=404)
