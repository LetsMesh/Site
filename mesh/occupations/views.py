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
        Handles HTTP requests related to the collection of Occupation, supporting 
        GET to retrieve the list of all Occupations,
        POST to create a new Occupation and OccupationBridge, and
        PATCH to connect an existing Occupation to a new OccupationBridge.
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

            Creates a new Occupation and connects it to a new OccupationBridge.
            
            The required fields are 
            "accountID", "occupationID", "occupationName", "occupationOrganization", "occupationDescription",
            "occupationStartDate", and "occupationEndDate".

            OccupationDescription, occupationStartDate, and occupationEndDate can all be empty,
            but must be present in the request JSON.

            If all fields are present and valid, it returns a JSON response with
            the newly created Occupation's ID and a HTTP status code 201,
            indicating the Occupation and OccupationBridge have been successfully created.

            Note: The supplied Occupation should not exist, as in the user would be entering in
            their own Occupation at this point. If the Occupation DOES exist, the PATCH endpoint at 
            /occupations/ with a supplied occupationID, along with optional occupationDescription,
            occupationStartDate, and occupationEndDate fields.

            Note: Dates should be in "YYYY-MM-DD" format.

            Example Request JSON:
            {
                "accountID": "1",
                "occupationName": "Software Engineer",
                "occupationOrganization": "ServiceNow",
                "occupationDescription": "services",
                "occupationStartDate" : "2021-05-21",
                "occupationEndDate": "2022-05-31"
            }

            or with empty values:

            {
                "accountID": "1",
                "occupationName": "Software Engineer",
                "occupationOrganization": "ServiceNow",
                "occupationDescription": "",
                "occupationStartDate" : "",
                "occupationEndDate": ""
            }
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
        """
            Handles PATCH requests for existing Occupations.

            Uses an existing Occupation in a new OccupationBridge.
            
            The required fields are 
            "accountID", "occupationID", "occupationDescription",
            "occupationStartDate", and "occupationEndDate".

            OccupationDescription, occupationStartDate, and occupationEndDate can all be empty,
            but must be present in the request JSON. 

            If all fields are present and valid, it returns a HTTP status code 204 No Content, 
            indicating the OccupationBridge has been successfully created/updated.

            Note: The supplied Occupation should exist, as in the user would be choosing an Occupation from
            a drop-down list. If the Occupation DOES NOT exist, the POST endpoint at 
            /occupations/ should be used with a supplied occupationName and occupationOrganization, 
            along with optional occupationDescription, occupationStartDate, and occupationEndDate fields.

            Note: Dates should be in "YYYY-MM-DD" format.

            Example Request JSON:
            {
                "accountID": "1",
                "occupationID": "3",
                "occupationDescription": "services",
                "occupationStartDate" : "2021-05-21",
                "occupationEndDate": "2022-05-31"
            }

            or with empty values:

            {
                "accountID": "1",
                "occupationID": "3",
                "occupationDescription": "",
                "occupationStartDate" : "",
                "occupationEndDate": ""
            }
        """

        REQUIRED_FIELDS = ["accountID", "occupationID", "occupationDescription",
                           "occupationStartDate", "occupationEndDate"]
        
        try:
            data = validate_json_and_required_fields(request.body, REQUIRED_FIELDS)

            # Parse data if it's valid
            account_id = data["accountID"]

            account = Account.objects.get(accountID=account_id)
            profile = Profile.objects.get(accountID=account)

            occupation_id = data["occupationID"]
            occupation_description = data["occupationDescription"]
            occupation_start_date = data["occupationStartDate"]
            occupation_end_date = data["occupationEndDate"]

            # Get existing Occupation and create a new OccupationBridge
            occupation = Occupation.objects.get(occupationID=occupation_id)
            
            # Use null date values if some dates are missing
            if occupation_start_date == "" and occupation_end_date == "":
                OccupationBridge.objects.create(accountID=profile, occupationID=occupation,
                                            occupationDescription=occupation_description)
            
            elif occupation_end_date == "":
                OccupationBridge.objects.create(accountID=profile, occupationID=occupation,
                                            occupationDescription=occupation_description,
                                            occupationStartDate=occupation_start_date)
            
            else:
                OccupationBridge.objects.create(accountID=profile, occupationID=occupation,
                                            occupationDescription=occupation_description,
                                            occupationStartDate=occupation_start_date,
                                            occupationEndDate=occupation_end_date) 

            return HttpResponse(status=204)
        
        except InvalidJsonFormat:
            return JsonResponse({"error": "Invalid JSON format."}, status = 400)
        
        except MissingRequiredFields:
            return JsonResponse({"error": "Missing required JSON fields."}, status = 400)
        
        except (Account.DoesNotExist, Profile.DoesNotExist):
            return JsonResponse({"error": "Account or Profile not found."}, status = 404)
        
        except Occupation.DoesNotExist:
            return JsonResponse({"error": "Occupation not found."}, status = 404)

        
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
            occupations_and_bridges = { }
            
            for occupation_bridge in occupation_bridges:
                occupation_data = {
                    "occupationID": occupation_bridge.occupationID.occupationID,
                    "occupationName": occupation_bridge.occupationID.occupationName,
                    "occupationOrganization": occupation_bridge.occupationID.occupationOrganization,
                    "occupationStartDate": str(occupation_bridge.occupationStartDate),
                    "occupationEndDate": str(occupation_bridge.occupationEndDate),
                    "occupationDescription": occupation_bridge.occupationDescription
                }
                occupations_and_bridges[occupation_bridge.occupationID.occupationID] = occupation_data

            occupations_and_bridges = json.dumps(occupations_and_bridges)
            
            return JsonResponse(occupations_and_bridges, status=200, safe = False)
        
        except OccupationBridge.DoesNotExist:
            return JsonResponse({"error": "OccupationBridge not found."}, status=404)
        
        except Occupation.DoesNotExist:
            return JsonResponse({"error": "Occupation not found."}, status=404)
