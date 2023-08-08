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
            ("occupationTag", "occupationTag not found in POST request data."),
            ("occupationDescriptor", "occupationDescriptor not found in POST request data."),
        ]

        for field_name, error_message in required_fields:
            check_result = check_required_field(data, field_name, response, error_message)
            if check_result is not None:
                return check_result
        
        account_id = data["accountID"]
        
        # Ensure account with supplied accountID exists
        try:
            account = Account.objects.get(accountID=account_id)

        except ObjectDoesNotExist:
            response["message"] = "Account with that ID could not be found."
            return JsonResponse(response, status=400)
        
        # Ensure profile with supplied accountID exists
        try:
            profile = Profile.objects.get(accountID=account)
        
        except ObjectDoesNotExist:
            response["message"] = "Profile with that ID could not be found."
            return JsonResponse(response, status=400)
        
        # If all required details are included begin to create/update Occupation
        # and OccupationBridge
        occupation_name = data["occupationName"]
        occupation_tag = data["occupationTag"]
        occupation_descriptor = data["occupationDescriptor"]
        
        # Check if profile already has linked Occupation
        # if so, just update Occupation
        try:
            occupation_bridge = OccupationBridge.objects.get(accountID=profile)
            occupation = occupation_bridge.occupationID
            
            occupation.occupationName = occupation_name
            occupation.occupationTag = occupation_tag
            occupation.occupationDescriptor = occupation_descriptor
            occupation.save()

            response["message"] = "Occupation successfully updated."

            # Update OccupationBridge
            occupation_bridge.occupationID = occupation
            occupation_bridge.save()

        # If Occupation does not already exist, create it 
        except ObjectDoesNotExist:
            occupation = Occupation(occupationName=occupation_name, 
                                    occupationTag=occupation_tag, 
                                    occupationDescriptor=occupation_descriptor)
            occupation.save()

            # Create OccupationBridge and connect to profile
            occupation_bridge = OccupationBridge(accountID=profile, occupationID=occupation)
            occupation_bridge.save()

            response["message"] = "Occupation successfully created and linked to account."

        
        response["status"] = "Success"

        return JsonResponse(response, status=200)
        
def check_required_field(data, field_name, response, field_error_message):
    if field_name not in data:
        response["message"] = field_error_message
        return JsonResponse(response, status=400)
    return None