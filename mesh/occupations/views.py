# Django Imports
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist

# Model Imports
from .models import Occupation, OccupationBridge
from mesh.accounts.models import Account
from mesh.profiles.models import Profile


def occupation(request):
    if request.method == "POST":
        data = request.POST

        response = {
            "status": "Error",
            "message": "Unable to POST occupation data."
        }
        
        # Check for required fields
        required_fields = [
            ("accountID", "accountID not found in POST request data."),
            ("occupationName", "occupationName not found in POST request data."),
            ("occupationOrganization", "occupationOrganization not found in POST request data."),
            ("occupationDescription", "occupationDescription not found in POST request data."),
        ]

        for field_name, error_message in required_fields:
            check_result = check_required_field(data, field_name, response, error_message)
            if check_result is not None:
                return check_result
        
        account_id = data["accountID"]
        
        # Ensure account and profile exist
        try:
            account = Account.objects.get(accountID=account_id)
            profile = Profile.objects.get(accountID=account)
        
        except ObjectDoesNotExist:
            response["message"] = "Account or profile with that ID could not be found."
            return JsonResponse(response, status=400)
        
        occupation_name = data["occupationName"]
        occupation_organization = data["occupationOrganization"]
        occupation_description = data["occupationDescription"]
        
        try:
            # Check if occupation exists beforehand
            occupation = Occupation.objects.get(occupationName=occupation_name, 
                                                occupationOrganization=occupation_organization)
            
            try:
                # Check if bridge already made for user
                occupation_bridge = OccupationBridge.objects.get(accountID=profile)
                response["message"] = "User Occupation successfully updated."

            except ObjectDoesNotExist:
                # Create bridge if it wasn't made before
                occupation_bridge = OccupationBridge(accountID=profile, occupationID=occupation, 
                                                     occupationDescription=occupation_description)
                response["message"] = "User Occupation successfully created and linked."
                print("3")

            occupation_bridge.accountID = profile
            occupation_bridge.occupationID = occupation
            occupation_bridge.occupationDescription = occupation_description
            occupation_bridge.save()

        except ObjectDoesNotExist:
            # Create occupation if it does not exist
            occupation = Occupation(occupationName=occupation_name, 
                                    occupationOrganization=occupation_organization)
            occupation.save()

            try:
                # Check if bridge already made for user
                occupation_bridge = OccupationBridge.objects.get(accountID=profile)
                response["message"] = "User Occupation successfully created and linked."

            except ObjectDoesNotExist:
                # Create bridge if it wasn't made before
                occupation_bridge = OccupationBridge(accountID=profile, occupationID=occupation, 
                                                     occupationDescription=occupation_description)
                response["message"] = "User Occupation successfully created and linked."

            occupation_bridge.accountID = profile
            occupation_bridge.occupationID = occupation
            occupation_bridge.occupationDescription = occupation_description
            occupation_bridge.save()

        response["status"] = "Success"
        return JsonResponse(response, status=200)
        
def check_required_field(data, field_name, response, field_error_message):
    if field_name not in data:
        response["message"] = field_error_message
        return JsonResponse(response, status=400)
    return None
