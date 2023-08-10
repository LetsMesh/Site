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

class SettingsView(View):
    def get(self, request, *args, **kwargs):
        """
        Handles GET requests when the client fetches for all accounts settings
        """
        settings = Settings.objects.all()
        accounts_settings = serializers.serialize('json', settings)
        return JsonResponse(accounts_settings, safe=False)

class SettingsDetailView(View):
    def get(self, request, account_id, *args, **kwargs):
        """
        Handles GET requests when the client fetches for a specific account settings
        """
        try: 
            settings = Settings.objects.get(accountID= account_id)
            settings_detail = serializers.serialize('json', [settings])
            return JsonResponse(settings_detail, safe = False)
        
        except Settings.DoesNotExist:
            return JsonResponse({'error': 'Settings for this account does not exist'}, status=404)
