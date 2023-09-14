from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse, HttpResponse
from django.views import View
from django.core import serializers

from mesh.accountSettings.models import Settings
from mesh.accounts.models import Account

import json

def display_theme(request):
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
                settings = Settings.objects.get(accountID=int(data.get("accountID")))
                response.update({
                    "data": {
                        "get": {
                            "displayTheme": settings.displayTheme
                        }
                    }
                })
                return JsonResponse(response)
            except ObjectDoesNotExist:
                response.update({"status": "error"})
                response.update({"message": "An account does not exist with this account ID."})
                return JsonResponse(response)

class showSettings(View):
    """ 
    Handles HTTP requests related to Two Factor Authentication account settings.
    Support Get request to retrieve setting and patch to change setting.
    """
    def get(self, request, account_id, *args, **kwargs):
        """ 
        Handles GET request

        Return JSON with Two Factor Authentication Settings for given account ID. 
        Returns a 404 error with error message if account does not exist.
        """
        try:
            settings = Settings.objects.get(accountID=account_id)
            settings_detail = serializers.serialize('json', [settings])
            return JsonResponse(settings_detail, safe=False)
        except Account.DoesNotExist:
            return JsonResponse({'error': 'An account does not exist with this account ID.'}, status=404)
        except Settings.DoesNotExist:
            return JsonResponse({'error': 'Settings does not exist with this account ID.'}, status=404)

    
    def patch(self, request, account_id, *args, **kwargs):
        """ 
        Handles Patch request.
        
        Updates the 2FactAuth account setting information to either true or false.

        Returns 204 HTTP response upon success.
        Returns 404 if Account or Settings is not found
        """
        try:
            settings = Settings.objects.get(accountID=account_id)
            data = json.loads(request.body)
            settings.accountID = Account.objects.get(accountID=data.get('accountID'))
            settings.isVerified = data.get('isVerified')
            settings.verificationToken = data.get('verificationToken')
            settings.hasContentFilterEnabled = data.get('hasContentFilterEnabled')
            settings.displayTheme = data.get('displayTheme')
            settings.is2FAEnabled = data.get('is2FAEnabled')
            settings.save()
            return HttpResponse(status=204)
        except Account.DoesNotExist:
            return JsonResponse({'error': 'An account does not exist with this account ID.'}, status=404)
        except Settings.DoesNotExist:
            return JsonResponse({'error': 'Settings does not exist with this account ID.'}, status=404)
        

