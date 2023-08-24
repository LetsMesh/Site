from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse


import json

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
      
    def post(self, request, account_id, *args, **kwargs):
        """
        Handle POST requests.

        Updates the biography of the listed profile.

        Returns a JSON response containing the saved biography of the specified profile through id.
        """
        data = json.loads(request.body)

        if 'accountID' not in data:
            return JsonResponse({'error': 'Invalid request. Missing accountID field.'}, status=401)
        if 'biography' not in data:
            return JsonResponse({'error': 'Invalid request. Missing biography field.'}, status=400)
        else:
            user = Profile.objects.get(accountID=account_id)
            user.biography = data["biography"]
            user.save()
            return JsonResponse({'message': "Biography saved successfully."}, status=200)

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
