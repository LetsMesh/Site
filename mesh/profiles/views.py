from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.core import serializers
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
            if(account_id is None):
                return JsonResponse({'error': 'Invalid input. Missing account ID'}, status=401)
            
            profile = Profile.objects.get(accountID=account_id)
            profileBiography = profile.biography
            return JsonResponse({'message': profileBiography}, safe=False, status=200)
        except Account.DoesNotExist:
            return JsonResponse({'error': 'Invalid request. Account does not exist'}, status=404)
        except Profile.DoesNotExist:
            return JsonResponse({'error': 'Invalid request. Profile does not exist'}, status=402)
        

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


def profile_picture(request):
    if request.method == "GET":
        data = request.GET
        response = {
            "status": "success"
        }
        if data.get("accountID") is None:
            response.update({"status": "error"})
            response.update({"message": "Missing account ID."})
            return JsonResponse(response)
        else:
            try:
                profile = Profile.objects.get(accountID=int(data.get("accountID")))
                response.update({
                    "data": {
                        "get": {
                            "profilePicture": profile.image.url
                        }
                    }
                })
                return JsonResponse(response)
            except ObjectDoesNotExist:
                response.update({"status": "error"})
                response.update({"message": "An account does not exist with this account ID."})
                return JsonResponse(response)
