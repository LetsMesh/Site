from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from mesh.profiles.models import Profile


def bio_view(request):
    if request.method == "POST":
        data = request.POST
        if 'accountID' not in data:
            return JsonResponse({'error': 'Invalid request. Missing accountID field.'}, status=401)
        if 'biography' not in data:
            return JsonResponse({'error': 'Invalid request. Missing biography field.'}, status=400)
        else:
            print(data.get('accountID') + " " + data.get('biography'))  # TODO: Save to database
            return JsonResponse({'message': 'biography saved successfully'}, status=200)
    else:
        return JsonResponse({'error': request.method + ' Method not allowed'}, status=405)


def profile_picture(request):
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
                profile = Profile.objects.get(accountID=int(data.get("accountID")))
                response.update({
                    "data": {
                        "get": {
                            "profilePicture": profile.image.url
                        }
                    }
                })
                return JsonResponse(response)
            except ObjectDoesNotExist:
                response.update({"status": "error"})
                response.update({"message": "An account does not exist with this account ID."})
                return JsonResponse(response)
            
        
    """
        Handles HTTP POST request
        for profile pictures, allowing users to upload,
        replace, and delete their profile pictures.
    """
    if request.method == "POST":
        
        response = {
            "Status": "Error",
            "Message": "Could not update profile picture."
        }
        
        # Grab POST request data
        text_data = request.POST
        file_data = request.FILES

        # Ensure an accountID and profilePicture are included in POST
        if "accountID" not in text_data:
            
            response["Message"] = "Account ID not found."
            return JsonResponse(response, status=401)
        
        accountID = text_data["accountID"]
        
        # Ensure account exists
        try:
            profile = Profile.objects.get(accountID = accountID)
        
        except ObjectDoesNotExist:
            
            response["Message"] = "Invalid request. Account does not exist."
            return JsonResponse(response, status=401)

        # If user doesn't upload profile picture, then their profile picture will remain null.
        if "profilePicture" not in file_data:
            profile = Profile.objects.get(accountID = accountID)
            profile.image = None
            profile.save()

            response["Status"] = "Success"
            response["Message"] = "Profile picture not specified, using default null value."
            
            return JsonResponse(response, status=200)
        
        profile_picture = file_data["profilePicture"]
             
        # Save profile
        profile.image = profile_picture
        profile.save()
        
        response["Status"] = "Success"
        response["Message"] = "Successfully uploaded profile picture."
        
        return JsonResponse(response, status=200)
