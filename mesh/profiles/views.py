# Django Imports
from django.core.exceptions import ObjectDoesNotExist
from django.utils.datastructures import MultiValueDictKeyError
from django.http import HttpResponse, JsonResponse
from django.views import View
from django.core import serializers
from django.http.multipartparser import MultiPartParser

# Model Imports
from mesh.profiles.models import Profile

# Utilities Imports
from mesh.utils.validate_data import validate_json_and_required_fields
from mesh.exceptions.MissingRequiredFields import MissingRequiredFields
from mesh.exceptions.InvalidJsonFormat import InvalidJsonFormat

# Library Imports 
import pyimgur
import os
import json
from base64 import b64encode


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
            
class ProfilePicturesView(View):
    """
        Handles HTTP requests related to Profile Pictures, supporting
        POST to upload a profile picture,
        PATCH to update a profile picture,
        DELETE to delete a profile picture.
    """
    
    def post(self, request, *args, **kwargs):
        """
            Handles POST requests.

            Grabs an existing Profile and uploads a profile picture to imgur,
            and saves the link with the Profile.

            The required fields are "accountID" and "profilePicture".

            Note: A user should not have a profile picture by this point, as in their
            profilePicture URL should be empty. If they already have a picture, 
            a PATCH request should be made instead. If a user wishes to delete their picture,
            a DELETE request should be made instead.
        """
        
        try:
            data = request.POST

            account_id = data["accountID"]
            
            profile = Profile.objects.get(accountID=account_id)
            
            # Check if user already has a profilePicture
            if profile.profilePicture is not None:
                return JsonResponse({"error": "Profile already has a profilePicture. " +
                                     "Use PATCH to update the profilePicture or " + 
                                     "DELETE to delete the profilePicture."}, 
                                    status = 409)
            
            imgur_client = initialize_imgur_client()
            
            # Grab raw photo from request files and encode it to upload to imgur
            image_file = b64encode(request.FILES["profilePicture"].read())

            # send POST request to imgur API to upload photo
            imgur_response = imgur_client._send_request('https://api.imgur.com/3/image', 
                                   method='POST', params={'image': image_file})

            image_link = imgur_response["link"]

            # Save photo URL with user
            profile.profilePicture = image_link
            profile.save()

            request_response = json.dumps({"profileID": profile.accountID.accountID ,
                                 "profilePicture": image_link})
            
            return JsonResponse(request_response, status = 201, safe = False)

        except InvalidJsonFormat:
            return JsonResponse({"error": "Invalid JSON format."}, status = 400)

        except MultiValueDictKeyError:
            return JsonResponse({"error": "Missing required JSON fields."}, status = 400)

        except Profile.DoesNotExist:
            return JsonResponse({"error": "Profile not found."}, status = 404)

    def patch(self, request, *args, **kwargs):

        try:
            data = MultiPartParser(request.META, request, request.upload_handlers).parse()
        
            print(data)
            
            account_id = data[0]["accountID"]

            profile = Profile.objects.get(accountID=account_id)

            if profile.profilePicture is None:
                return JsonResponse({"error": "Profile does not have an existing profilePicture." +
                                     "Use a POST request to upload a profilePicture."}, status = 409)
            
            uploaded_profile_picture = data[1]["profilePicture"]

            imgur_client = initialize_imgur_client()
            
            # Grab raw photo from request files and encode it to upload to imgur
            image_file = b64encode(uploaded_profile_picture.read())

            # send POST request to imgur API to upload photo
            imgur_response = imgur_client._send_request('https://api.imgur.com/3/image', 
                                   method='POST', params={'image': image_file})

            image_link = imgur_response["link"]

            # Save photo URL with user
            profile.profilePicture = image_link
            profile.save()

            request_response = json.dumps({"profileID": profile.accountID.accountID ,
                                 "profilePicture": image_link})
            
            return JsonResponse(request_response, status = 201, safe = False)
        
        except Profile.DoesNotExist:
            return JsonResponse({"error": "Profile not found."}, status = 404)


    def delete(self, request, *args, **kwargs):
        """
            Handles DELETE requests.

            Grabs an existing Profile and deletes its profilePicture.

            The required field is "accountID".
        """
        
        REQUIRED_FIELDS = ["accountID"]
        
        try:
            data = validate_json_and_required_fields(request.body, REQUIRED_FIELDS)

            account_id = data["accountID"]
            
            profile = Profile.objects.get(accountID=account_id)

            # Ensure their profilePicture does not exist already.
            if profile.profilePicture is None:
                return JsonResponse({"error": "Profile's profilePicture not found, nothing to delete."},
                                    status = 404)
            
            profile.profilePicture = None
            profile.save()

            return HttpResponse(status=204)

        except InvalidJsonFormat:
            return JsonResponse({"error": "Invalid JSON format."}, status = 400)

        except MissingRequiredFields:
            return JsonResponse({"error": "Missing required JSON fields."}, status = 400)

        except Profile.DoesNotExist:
            return JsonResponse({"error": "Profile not found."}, status = 404)


def initialize_imgur_client():
    IMGUR_CLIENT_ID = os.environ.get("IMGUR_CLIENT_ID")

    imgur_client = pyimgur.Imgur(IMGUR_CLIENT_ID)

    return imgur_client