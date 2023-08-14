# Django Imports
from django.http import JsonResponse, HttpResponse
from django.views import View
from django.core import serializers

# Model Imports
from .models import Occupation, OccupationBridge
from mesh.accounts.models import Account
from mesh.profiles.models import Profile

# Utilities Imports
from mesh.utils.validate_data import validate_json_and_required_fields
from mesh.exceptions.MissingRequiredFields import MissingRequiredFields
from mesh.exceptions.InvalidJsonFormat import InvalidJsonFormat

# Library Imports
import json


class OccupationsView(View):
    """
        Handles HTTP requests related to the collection of Occupation,
        supporting GET to retrieve the list of all Occupations and
        POST to create a new Occupation.
    """
    
    def get(self, request, *args, **kwargs):
        """
            Handle GET requests.

            Returns a JSON response containing all Occupations.
        """
        occupations = Occupation.objects.all()
        
        # Create a list of dictionaries containing occupation details
        occupations_list = serializers.serialize("json", occupations)
        
        return JsonResponse(occupations_list, status = 200, safe = False)
    
    def post(self, request, *args, **kwargs):
        """
            Handle POST requests.

            Creates a new Occupation, also creates a new OccupationBridge or 
            updates an existing OccupationBridge. 
            
            The required fields are 
            "accountID", "occupationID", "occupationName", "occupationOrganization", "occupationDescription",
            "occupationStartDate", and "occupationEndDate".

            OccupationDescription, occupationStartDate, and occupationEndDate can all be null,
            but must be present in the request JSON.

            If all fields are present and valid, it returns a JSON response with
            the newly created Occupation's ID and a HTTP status code 201,
            indicating the Occupation or OccupationBridge has been successfully created or updated.

            Note: The supplied Occupation should not exist, as in the user would be entering in
            their own Occupation at this point. If the Occupation DOES exist, they should use the PATCH
            endpoint at /occupations/ with a supplied occupationID, along with optional occupationDescription,
            occupationStartDate, and occupationEndDate fields.

            Note: Dates should be in "YYYY-MM-DD" format.
        """
        REQUIRED_FIELDS = ["accountID", "occupationName", 
                           "occupationOrganization", "occupationDescription", 
                           "occupationStartDate", "occupationEndDate"]

        # Try to parse JSON input data, ensure account and profile exist
        try:
            data = validate_json_and_required_fields(request.body, REQUIRED_FIELDS)

            # Parse data if it's valid
            account_id = data["accountID"]

            account = Account.objects.get(accountID=account_id)
            profile = Profile.objects.get(accountID=account)

            occupation_name = data["occupationName"]
            occupation_organization = data["occupationOrganization"]
            occupation_description = data["occupationDescription"]
            occupation_start_date = data["occupationStartDate"]
            occupation_end_date = data["occupationEndDate"]
            
            # Ensure Occupation does not exist yet
            if Occupation.objects.filter(occupationName=occupation_name, 
                                      occupationOrganization=occupation_organization):
                return JsonResponse({"error": "Occupation already exists, " +
                                     "use PATCH endpoint along with occupationID instead."}, 
                                    status = 409)
            
            occupation = Occupation.objects.create(occupationName=occupation_name, 
                                      occupationOrganization=occupation_organization)
            
            OccupationBridge.objects.create(accountID=profile, occupationID=occupation,
                                            occupationDescription=occupation_description,
                                            occupationStartDate=occupation_start_date,
                                            occupationEndDate=occupation_end_date)      

            return JsonResponse({"occupationID": occupation.occupationID}, status = 201)

        except InvalidJsonFormat:
            return JsonResponse({"error": "Invalid JSON format."}, status = 400)
        
        except MissingRequiredFields:
            return JsonResponse({"error": "Missing required JSON fields."}, status = 400)

        except (Account.DoesNotExist, Profile.DoesNotExist):
            return JsonResponse({"error": "Account or Profile not found."}, status = 404)       

    def patch(self, request, *args, **kwargs):
        pass
class OccupationsDetailView(View):
    """
        Handles HTTP requests related to a singular Occupation,
        supporting GET to retrieve one Occupation, or PATCH 
        to update an existing OccupationBridge.
    """

    def get(self, request, account_id, *args, **kwargs):
        """
            Handle GET requests for a single Account's Occupation(s).

            Returns a JSON response containing the requested Occupation(s).

            If the Occupation does not exist, it returns a 404 status code
            and an error message.
        """
        
        try:
            occupation_bridges = OccupationBridge.objects.filter(accountID_id=account_id)
            
            occupation_data = serializers.serialize("json", occupation_bridges)
            return JsonResponse(occupation_data, status = 200, safe = False)
        
        except OccupationBridge.DoesNotExist:
            return JsonResponse({"error": "OccupationBridge not found."}, status=404)
        
        except Occupation.DoesNotExist:
            return JsonResponse({"error": "Occupation not found."}, status=404)
    
    def patch(self, request, account_id, *args, **kwargs):
        """
            Handle PATCH requests for a single Occupation.

            Updates the specified fields (currently, only the description) 
            of the OccupationBridge of the given accountID. 

            If the OccupationBridge does not exist, it returns a 404 status code and
            and error message.

            If a field is not provided in the request body, the current value for that field
            will remain unchanged.

            Returns a 204 HTTP status to indicate that the request has
            succeeded butt does not include an entity-body in the response. 
        """
        try:
            occupation_bridge = OccupationBridge.objects.get(accountID=account_id)
            data = json.loads(request.body)
        
        except OccupationBridge.DoesNotExist:
            return JsonResponse({"error": "OccupationBridge for this account not found."}, status = 404)
        
        except json.JSONDecodeError:
            return JsonResponse({"error": "JSON could not be decoded."}, status = 400)

        occupation_bridge.occupationDescription = data.get("occupationDescription", 
                                                           occupation_bridge.occupationDescription)
        occupation_bridge.save()
        return HttpResponse(status = 204)
