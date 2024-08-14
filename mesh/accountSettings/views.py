# Django
from django.http import JsonResponse, HttpResponse
from django.views import View
from django.core.serializers import serialize
from django.core.exceptions import ValidationError, ObjectDoesNotExist

# Libraries
import json

# Models
from .models import Settings, Account

# Utils
from ..utils.validate_data import validate_json_and_required_fields

def display_theme(request, account_id):
    """
    Handle GET requests to retrieve the display theme for a specific account.
    """
    if request.method == "GET":
        try:
            account = Account.objects.get(pk=account_id)
            settings = Settings.objects.get(accountID=account_id)
            
            return JsonResponse(
                {"displayTheme": settings.displayTheme},
                status=200,
            )
        except Account.DoesNotExist:
            return JsonResponse({'error': 'Account does not exist'}, status=404)
        except Settings.DoesNotExist:
            return JsonResponse({"error": "Settings for this account do not exist"}, status=404)
        except ObjectDoesNotExist:
            return JsonResponse({"error": "Account does not exist"}, status=404)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)


class SettingsView(View):
    """
    Handles HTTP requests related to the collection of Settings.
    """

    def get(self, request):
        """
        Handle GET requests.

        Retrieves all Settings from the database and returns them in a JSON-formatted array.
        """
        settings = Settings.objects.all()
        serialized_data = serialize('json', settings)
        return HttpResponse(serialized_data, status=200, content_type='application/json')
    
    def post(self, request):
        """
        Handle POST requests.

        Creates a new settings instance. The required fields depend on your Settings model.
        Returns a JSON response with the newly created settings ID and a 201 status code.
        """
        try:
            # Assuming you are sending JSON data
            REQUIRED_FIELDS = ['accountID']
            data = validate_json_and_required_fields(request.body, REQUIRED_FIELDS)
            account_id = data.get("accountID")

            # Retrieve the corresponding account
            account = Account.objects.get(pk=account_id)

            # Create new settings instance
            new_setting = Settings(
                accountID=account,
                isVerified=data.get("isVerified", False),
                verificationToken=data.get("verificationToken", ""),
                hasContentFilterEnabled=data.get("hasContentFilterEnabled", False),
                displayTheme=data.get("displayTheme", Settings.Themes.LIGHT),
                is2FAEnabled=data.get("is2FAEnabled", False)
            )
            new_setting.full_clean()  # Validates the model
            new_setting.save()

            return JsonResponse({'id': new_setting.accountID.pk}, status=201)
        
        except Account.DoesNotExist:
            return JsonResponse({'error': 'Account does not exist'}, status=404)
        except (KeyError, ValidationError, json.JSONDecodeError):
            return JsonResponse(
                {
                    'error': 'Failed to create. Invalid data format',
                },
                status=400,
                content_type='application/json'
            )

class SettingsDetailView(View):
    valid_fields = ['isVerified', 'verificationToken', 'hasContentFilterEnabled', 'displayTheme', 'is2FAEnabled']    

    def get(self, request, account_id, *args, **kwargs):
        """
        Handles GET requests when the client fetches for a specific account settings
        """
        try: 
            fields = request.GET.get('fields')
            if fields:
                fields = [field for field in fields.split(',') if field in self.valid_fields]
            else:
                fields = self.valid_fields
            if len(fields) == 0:
                return JsonResponse({'error': 'Invalid fields'}, status=400)
            
            settings = Settings.objects.get(accountID= account_id)
            settings_detail = { field: getattr(settings, field, None) for field in fields }
            # Add accountID to the response data
            settings_detail['accountID'] = account_id
        
            return JsonResponse(settings_detail, safe = False, status=200)
        
        except Settings.DoesNotExist:
            return JsonResponse({'error': 'Setting for account not found'}, status=404)
        
    def patch(self, request, account_id):
        """
        Handle PATCH requests to update a specific setting.
        """
        try:
            setting = Settings.objects.get(accountID=account_id)
            data = json.loads(request.body)

            for field, value in data.items():
                if field in self.valid_fields:
                    setattr(setting, field, value)
            
            # After updating, save the setting
            setting.save()
            return HttpResponse(status=204)
        except Settings.DoesNotExist:
            return JsonResponse({'error': 'Setting for account not found'}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)
        except KeyError:
            return JsonResponse({"error": "Invalid fields in the request."}, status=400)

