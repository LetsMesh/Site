from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.views import View
from django.core import serializers

from mesh.accountSettings.models import Settings


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

class TwoFactAuthView(View):
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
            settings_2FactAuth = Settings.objects.get(accountID=account_id).is2FAEnabled
            settings_detail = serializers.serialize('json', [settings_2FactAuth])
            return JsonResponse(settings_detail, safe=False)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'An account does not exist with this account ID.'}, status=404)

    
    def patch():
        """ 
        Handles Patch request
        
        t
        """
        

