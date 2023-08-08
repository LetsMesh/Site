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
            "status": "Error",
            "message": "Could not update profile picture."
        }
        
        # Grab POST request data
        text_data = request.POST
        file_data = request.FILES

        # Ensure an accountID and profilePicture are included in POST
        if "accountID" not in text_data:
            
            response["message"] = "Account ID not found in POST request."
            return JsonResponse(response, status=400)
        
        accountID = text_data["accountID"]
        
        # Ensure account exists
        try:
            profile = Profile.objects.get(accountID = accountID)
        
        except ObjectDoesNotExist:
            
            response["message"] = "Invalid request. Account ID does not exist."
            return JsonResponse(response, status=400)

        # If user doesn't upload profile picture, then their profile picture will remain null.
        if "profilePicture" not in file_data:
            profile = Profile.objects.get(accountID = accountID)
            profile.image = None
            profile.save()

            response["status"] = "Success"
            response["message"] = "Profile picture not specified, using default null value."
            
            return JsonResponse(response, status=200)
        
        profile_picture = file_data["profilePicture"]
             
        # Check if file is an image
        if profile_picture is not None:
            profile_picture_name = profile_picture.name
            
            extension_location = profile_picture_name.index(".") + 1
            
            file_extension = profile_picture_name[extension_location:].lower()

            accepted_image_formats = ["png", "jpeg", "jpg"]
            
            if file_extension not in accepted_image_formats:
                response["message"] = "Uploaded file type is not an image."
                return JsonResponse(response, status=400)
        
        # Save profile
        profile.image = profile_picture
        profile.save()
        
        response["status"] = "Success"
        response["message"] = "Successfully uploaded profile picture."
        
        return JsonResponse(response, status=200)
