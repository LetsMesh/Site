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
            "Status": "Error",
            "Message": "Unable to POST occupation data."
        }
        
        # Ensure accountID is in POST request
        if "accountID" not in data:
            response["Message"] = "AccountID not found in POST request data."
            return JsonResponse(response, status=400)
        
        account_id = data["accountID"]

        # Ensure all required occupation details are in POST request
        if "occupationName" not in data:
            response["Message"] = "occupationName not found in POST request data."
            return JsonResponse(response, status=400)
        
        if "occupationTag" not in data:
            response["Message"] = "occupationTag not found in POST request data."
            return JsonResponse(response, status=400)
        
        if "occupationDescriptor" not in data:
            response["Message"] = "occupationDescriptor not found in POST request data."
            return JsonResponse(response, status=400)
        
        # Ensure account with supplied accountID exists
        try:
            account = Account.objects.get(accountID=account_id)

        except ObjectDoesNotExist:
            response["Message"] = "Account with that ID could not be found."
            return JsonResponse(response, status=400)
        
        # Ensure profile with supplied accountID exists
        try:
            profile = Profile.objects.get(accountID=account)
        
        except ObjectDoesNotExist:
            response["Message"] = "Profile with that ID could not be found."
            return JsonResponse(response, status=400)
        
        # If all required details are included, create Occupation Bridge and create Occupation
        # Create Occupation first
        occupation_name = data["occupationName"]
        occupation_tag = data["occupationTag"]
        occupation_descriptor = data["occupationDescriptor"]
        
        occupation = Occupation(occupationName=occupation_name, 
                                occupationTag=occupation_tag, 
                                occupationDescriptor=occupation_descriptor)
        
        occupation.save()

        # Then create Occupation Bridge and 
        # connect the Occupation and Account to the Occupation Bridge

        occupation_bridge = OccupationBridge(accountID=profile, occupationID=occupation)
        occupation_bridge.save()
        
        response["Status"] = "Success"
        response["Message"] = "Occupation successfully created and linked to account."
        
        return JsonResponse(response, status=200)
        
