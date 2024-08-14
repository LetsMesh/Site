# Django Imports
from django.core.exceptions import ObjectDoesNotExist
from django.utils.datastructures import MultiValueDictKeyError
from django.http import HttpResponse, JsonResponse
from django.views import View
from django.http.multipartparser import MultiPartParser

# Model Imports
from mesh.accounts.models import Account
from mesh.profiles.models import Profile

# Utilities Imports
from mesh.utils.validate_data import validate_json_and_required_fields
from mesh.exceptions.MissingRequiredFields import MissingRequiredFields
from mesh.exceptions.InvalidJsonFormat import InvalidJsonFormat

# Library Imports
import os
import uuid
import json
from urllib.parse import urlparse
from requests.exceptions import HTTPError
from b2sdk.v1 import B2Api, InMemoryAccountInfo, UploadSourceBytes

class ProfileDetailsView(View):
    """
    View for getting or updating profile details by account ID.
    """
    valid_fields = ['biography', 'userName', 'preferredName', 'preferredPronouns', 'profilePicture']    

    def get(self, request, account_id, *args, **kwargs):
        """
        Handle GET requests.

        Retrieves specified fields of the profile in JSON format.
        """
        fields = request.GET.get('fields')
        if fields:
            fields = [field for field in fields.split(',') if field in self.valid_fields]
        else:
            fields = self.valid_fields
        
        if len(fields) == 0:
            return JsonResponse({'error': 'Invalid fields'}, status=400)
        
        try:
            profile = Profile.objects.get(accountID=account_id)
            profile_data = { field: getattr(profile, field, None) for field in fields }
            return JsonResponse({"profile": profile_data}, status=200)
        except Profile.DoesNotExist:
            return JsonResponse({"error": "Profile not found."}, status=404)

    def patch(self, request, account_id, *args, **kwargs):
        """
        Handle PATCH requests.

        Updates specified fields of the profile.
        """
        try:
            profile = Profile.objects.get(accountID=account_id)
            data = json.loads(request.body)

            for field, value in data.items():
                if field in self.valid_fields:
                    setattr(profile, field, value)

            profile.save()
            return JsonResponse({"message": "Profile updated successfully."}, status=200)
        except Profile.DoesNotExist:
            return JsonResponse({"error": "Profile not found."}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)
        except KeyError:
            return JsonResponse({"error": "Invalid fields in the request."}, status=400)
        
class ProfilePicturesView(View):
    """
    Handles HTTP requests related to Profile Pictures, supporting
    POST to upload a profile picture,
    PATCH to update a profile picture,
    DELETE to delete a profile picture.
    """

    def post(self, request, account_id, *args, **kwargs):
        """
        Handles POST requests.

        Grabs an existing Profile and uploads a profile picture to Backblaze,
        and saves the link with the Profile.

        The required field is "profilePicture".

        If a profile picture already exists, it will be replaced with the new one.
        """
        try:
            profile = Profile.objects.get(accountID=account_id)
            _, backblaze_bucket = initialize_backblaze_client()

            # Grab photo from request files
            image_file = request.FILES["profilePicture"]

            if check_if_file_is_not_image(image_file):
                return JsonResponse(
                    {"error": "Uploaded file is not an image."}, status=400
                )

            image_file = image_file.read()

            if profile.profilePicture is not None:
                # parse url, get file name
                profile_picture_url = urlparse(profile.profilePicture)
                file_name = os.path.basename(profile_picture_url.path)
                
                try:
                    # find file info to grab file id
                    file_version_info = backblaze_bucket.get_file_info_by_name(file_name)
                    file_id = file_version_info.as_dict()["fileId"]

                    # delete old profile picture
                    backblaze_bucket.delete_file_version(file_id, file_name)
                except:
                    # Handle the case where the file does not exist
                    pass

            original_file_name = request.FILES["profilePicture"].name
            new_file_name = generate_unique_filename(account_id, original_file_name)

            # upload image to backblaze
            upload_source = UploadSourceBytes(image_file)
            upload_result = backblaze_bucket.upload(upload_source, file_name=new_file_name)

            image_link = generate_image_url(new_file_name)

            # Save photo URL with user
            profile.profilePicture = image_link
            profile.save()

            return JsonResponse({"profileID": profile.accountID.accountID, "profilePicture": image_link}, status=201, safe=False)

        except MultiValueDictKeyError:
            return JsonResponse({"error": "Missing required JSON fields."}, status=400)

        except Profile.DoesNotExist:
            return JsonResponse({"error": "Profile not found."}, status=404)

        except HTTPError:
            return JsonResponse({"error": "Uploaded file is not an image."}, status=400)

        except ValueError:
            return JsonResponse({"error": "accountID or profilePicture field is empty."}, status=400)
            
    def delete(self, request, account_id, *args, **kwargs):
        """
        Handles DELETE requests.

        Grabs an existing Profile and deletes its profilePicture.
        """
        try:
            profile = Profile.objects.get(accountID=account_id)

            # Ensure their profilePicture does not exist already.
            if profile.profilePicture is None:
                return JsonResponse(
                    {"error": "Profile picture not found, nothing to delete."},
                    status=404,
                )

            # parse url, get file name
            profile_picture_url = urlparse(profile.profilePicture)
            file_name = os.path.basename(profile_picture_url.path)

            # find file info to grab file id
            _, backblaze_bucket = initialize_backblaze_client()

            try:
                file_version_info = backblaze_bucket.get_file_info_by_name(file_name)
                file_id = file_version_info.as_dict()["fileId"]
                # delete file
                backblaze_bucket.delete_file_version(file_id, file_name)
            except:
                pass

            # update profile
            profile.profilePicture = None
            profile.save()

            return JsonResponse({"message": "Profile picture deleted"}, status=204)

        except Profile.DoesNotExist:
            return JsonResponse({"error": "Profile not found."}, status=404)

        except ValueError:
            return JsonResponse(
                {"error": "accountID field is empty."}, status=400
            )
        
def initialize_backblaze_client():
    BACKBLAZE_APPLICATION_KEY_ID = os.environ.get("BACKBLAZE_MASTER_KEY")
    BACKBLAZE_APPLICATION_KEY = os.environ.get("BACKBLAZE_APPLICATION_KEY")
    BACKBLAZE_BUCKET_NAME = os.environ.get("BACKBLAZE_BUCKET_NAME")

    account_info = InMemoryAccountInfo()
    backblaze_api = B2Api(account_info)
    backblaze_api.authorize_account(
        "production", BACKBLAZE_APPLICATION_KEY_ID, BACKBLAZE_APPLICATION_KEY
    )
    bucket = backblaze_api.get_bucket_by_name(BACKBLAZE_BUCKET_NAME)

    return backblaze_api, bucket

# create unique, random file name containing accountID + random string
def generate_unique_filename(account_id, original_filename):
    extension = original_filename.split(".")[-1]
    unique_id = uuid.uuid4().hex
    new_filename = f"{account_id}_{unique_id}.{extension}"
    return new_filename

# for generating image urls for each file, to be saved with the profile
def generate_image_url(file_name):
    BACKBLAZE_URL = "https://f005.backblazeb2.com/file/LetsMesh/"
    file_url = BACKBLAZE_URL + file_name
    return file_url

# ensure uploaded file is an image
def check_if_file_is_not_image(file):
    ACCEPTED_FILE_TYPES = ["jpeg", "jpg", "png"]
    file_type = file.name.split(".")[-1].lower()

    if file_type not in ACCEPTED_FILE_TYPES:
        return True

    return False
    