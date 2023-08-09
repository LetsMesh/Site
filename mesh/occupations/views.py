# Django Imports
from django.http import JsonResponse, HttpResponse
from django.views import View

# Model Imports
from .models import Occupation, OccupationBridge
from mesh.accounts.models import Account
from mesh.profiles.models import Profile

# Utilities Imports
from ..utils.validate_data import validate_json_and_required_fields

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
        occupations_list = [
            {
                "occupationID": occupation.occupationID,
                "occupationName": occupation.occupationName,
                "occupationOrganization": occupation.occupationOrganization
            }
            for occupation in occupations
        ]
        
        return JsonResponse(occupations_list, status=200, safe=False)
    
    def post(self, request, *args, **kwargs):
        """
            Handle POST requests.

            Creates a new occupation OR updates an existing OccupationBridge. 
            The required fields are 
            "accountID", "occupationName" and "occupationOrganization".

            If all fields are present and valid, it returns a JSON response with
            the newly created Occupation's ID and a HTTP status code 201,
            indicating the Occupation has been successfully created.
        """
        REQUIRED_FIELDS = ["accountID", "occupationName", 
                           "occupationOrganization", "occupationDescription"]

        # Try to parse JSON input data
        try:
            data = validate_json_and_required_fields(request.body, REQUIRED_FIELDS)

            account_id = data["accountID"]
            occupation_name = data["occupationName"]
            occupation_organization = data["occupationOrganization"]
            occupation_description = data["occupationDescription"]

        except (json.JSONDecodeError, KeyError):
            return JsonResponse({"error": "Invalid JSON or missing fields."}, status=400)
        
        # Ensure account and profile exist
        try:
            account = Account.objects.get(accountID=account_id)
            profile = Profile.objects.get(accountID=account)
        
        except (Account.DoesNotExist, Profile.DoesNotExist):
            return JsonResponse({"error": "Account or Profile not found."}, status=404)
        
        try:
            # Check if OccupationBridge already exists
            occupation_bridge = OccupationBridge.objects.get(
                accountID = profile
            )

            # Update existing OccupationBridge with new or existing Occupation
            occupation = Occupation.objects.get_or_create(
                occupationName = occupation_name,
                occupationOrganization = occupation_organization
            )[0]

            occupation_bridge.occupationID = occupation
            occupation_bridge.occupationDescription = occupation_description
            occupation_bridge.save()

        except OccupationBridge.DoesNotExist:
            
            # Get or create new Occupation
            occupation, _ = Occupation.objects.get_or_create(
                occupationName = occupation_name,
                occupationOrganization = occupation_organization
            )

            occupation_bridge = OccupationBridge.objects.create(
                accountID = profile,
                occupationID = occupation,
                occupationDescription = occupation_description
            )
            

        return JsonResponse({"occupationID": occupation.occupationID}, status=201)
    

class OccupationsDetailView(View):
    """
        Handles HTTP requests related to a singular Occupation,
        supporting GET to retrieve one Occupation, or PATCH 
        to update an existing OccupationBridge.
    """

    def get(self, request, account_id, *args, **kwargs):
        """
            Handle GET requests for a single Account's Occupation.

            Returns a JSON response containing the requested Occupation.

            If the Occupation does not exist, it returns a 404 status code
            and an error message.
        """
        
        try:
            occupation_bridge = OccupationBridge.objects.get(accountID_id=account_id)
            
            occupation = occupation_bridge.occupationID
            occupation_data = {
                "occupationID": occupation.occupationID,
                "occupationName": occupation.occupationName,
                "occupationOrganization": occupation.occupationOrganization,
                "occupationDescription": occupation_bridge.occupationDescription,
            }
            
            return JsonResponse(occupation_data, status=200)
        
        except OccupationBridge.DoesNotExist:
            return JsonResponse({"message": "OccupationBridge not found"}, status=404)
    
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
        
        except Occupation.DoesNotExist:
            return JsonResponse({"error": "OccupationBridge does not exist."}, status=404)
        
        data = json.loads(request.body)

        occupation_bridge.occupationDescription = data.get("occupationDescription", 
                                                           occupation_bridge.occupationDescription)
        occupation_bridge.save()
        return HttpResponse(status=204)
