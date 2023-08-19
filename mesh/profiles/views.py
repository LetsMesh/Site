from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse

from mesh.accounts.models import Account
from mesh.profiles.models import Profile

from django.views import View

class BiographyView(View):
    """
    View for getting an biography by accountId or updating an biography by accountID.
    """
    def get(self, request, account_id, *args, **kwargs):
        """
        Handle GET requests.

        Retrieves a biography of the listed profile in JSON format.

        Returns a JSON response containing biography of specified profile through id.
        """
        try:     
            profile = Profile.objects.get(accountID=account_id)
            profile_biography = profile.biography
            return JsonResponse({'message': profile_biography}, safe=False, status=200)
        except Account.DoesNotExist:
            return JsonResponse({'error': 'Invalid request. Account does not exist'}, status=404)
        except Profile.DoesNotExist:
            return JsonResponse({'error': 'Invalid request. Profile does not exist'}, status=404)

    def post(self, request, *args, **kwargs):
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
