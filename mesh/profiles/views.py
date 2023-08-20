from django.core.exceptions import ObjectDoesNotExist
from django.utils.datastructures import MultiValueDictKeyError
from django.http import JsonResponse

from mesh.accounts.models import Account
from mesh.profiles.models import Profile
from mesh.accounts.models import Account
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
    
    def post(self, request, account_id, *args, **kwargs):
        return post_data(account_id, "userName", request)

class PreferredNamesView(View):
    def get(self, request, account_id, *args, **kwargs):
        return get_data(account_id, "preferredName", lambda profile: profile.preferredName)

    def post(self, request, account_id, *args, **kwargs):
        return post_data(account_id, "preferredName", request)

class PreferredPronounsView(View):
    def get(self, request, account_id, *args, **kwargs):
        return get_data(account_id, "preferredPronouns", lambda profile: profile.preferredPronouns)

    def post(self, request, account_id, *args, **kwargs):
        return post_data(account_id, "preferredPronouns", request)

def get_data(account_id, name, mapper):
    """
    Handles GET requests when the client fetches for names/nicknames/pronouns
    """
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

def post_data(account_id, name, request):
    """
    Handles POST requests when the client sends names/nicknames/prounouns to the back end
    """
    try: 
        account = Account.objects.get(accountID = account_id)
        profile = Profile.objects.get(accountID = account_id)
        data = request.POST[name]   

        if (name == "userName"):
            profile.userName = data 
        elif (name == "preferredName"):
            profile.preferredName = data
        elif (name == "preferredPronouns"):
            profile.preferredPronouns = data
    
        profile.save()
        return JsonResponse({'message': f'{name} saved successfully'}, safe=False, status = 200)
        
    except Account.DoesNotExist:
        return JsonResponse({'error': 'Account does not exist'}, status = 404)
    
    except Profile.DoesNotExist:
        return JsonResponse({'error': 'Profile does not exist for this account'}, status = 404)
    
    except MultiValueDictKeyError:
        return JsonResponse({'error': f'Missing {name} field.'}, status = 400)
