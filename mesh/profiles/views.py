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
import imghdr
from urllib.parse import urlparse
from requests.exceptions import HTTPError
from b2sdk.v1 import B2Api, InMemoryAccountInfo, UploadSourceBytes


class BiographyView(View):
    """
    View for getting an biography by accountId or updating an biography by accountID.
    """

    def get(self, request, account_id, *args, **kwargs):
        """
        Handle GET requests.

        Retrieves a biography of the listed profile in JSON format.

        Returns a JSON response containing biography of specified profile through id.
        """
        try:
            profile = Profile.objects.get(accountID=account_id)
            profile_biography = profile.biography
            return JsonResponse({"biography": profile_biography}, status=200)
        except Account.DoesNotExist:
            return JsonResponse(
                {"error": "Invalid request. Account does not exist"}, status=404
            )
        except Profile.DoesNotExist:
            return JsonResponse({'error': 'Invalid request. Profile does not exist'}, status=404)
        
    def post(self, request, account_id, *args, **kwargs):
      """
      Handle POST requests.

      Updates the biography of the listed profile.

      Returns a JSON response containing the saved biography of the specified profile through id.
      """
      return post_data(account_id, "biography", request)

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
                return JsonResponse(
                    {
                        "error": "Profile already has a profilePicture. "
                        + "Use PATCH to update the profilePicture or "
                        + "DELETE to delete the profilePicture."
                    },
                    status=409,
                )

            backblaze_api, backblaze_bucket = initialize_backblaze_client()

            # Grab photo from request files
            image_file = request.FILES["profilePicture"]

            if check_if_file_is_not_image(image_file):
                return JsonResponse(
                    {"error": "Uplodaed file is not an image."}, status=400
                )

            image_file = image_file.read()

            original_file_name = request.FILES["profilePicture"].name

            # rename photo to random string + accountID
            new_file_name = generate_unique_filename(account_id, original_file_name)

            # upload image to backblaze
            upload_source = UploadSourceBytes(image_file)
            upload_result = backblaze_bucket.upload(
                upload_source, file_name=new_file_name
            )

            image_link = generate_image_url(new_file_name)

            # Save photo URL with user
            profile.profilePicture = image_link
            profile.save()

            request_response = json.dumps(
                {"profileID": profile.accountID.accountID, "profilePicture": image_link}
            )

            return JsonResponse(request_response, status=201, safe=False)

        except MultiValueDictKeyError:
            return JsonResponse({"error": "Missing required JSON fields."}, status=400)

        except Profile.DoesNotExist:
            return JsonResponse({"error": "Profile not found."}, status=404)

        except HTTPError:
            return JsonResponse({"error": "Uploaded file is not an image."}, status=400)

        except ValueError:
            return JsonResponse(
                {"error": "accountID or profilePicture field is empty."}, status=400
            )

    def patch(self, request, *args, **kwargs):
        try:
            data = MultiPartParser(
                request.META, request, request.upload_handlers
            ).parse()

            account_id = data[0]["accountID"]

            profile = Profile.objects.get(accountID=account_id)

            if profile.profilePicture is None:
                return JsonResponse(
                    {
                        "error": "Profile does not have an existing profilePicture."
                        + "Use a POST request to upload a profilePicture."
                    },
                    status=409,
                )

            # need to delete old profile picture first,
            # then upload new profile picture

            # Grab photo from request files
            image_file = data[1]["profilePicture"]

            if check_if_file_is_not_image(image_file):
                return JsonResponse(
                    {"error": "Uplodaed file is not an image."}, status=400
                )

            image_file = image_file.read()

            # parse url, get file name
            profile_picture_url = urlparse(profile.profilePicture)
            file_name = os.path.basename(profile_picture_url.path)

            # find file info to grab file id
            backblaze_api, backblaze_bucket = initialize_backblaze_client()
            file_version_info = backblaze_bucket.get_file_info_by_name(file_name)
            file_id = file_version_info.as_dict()["fileId"]

            # delete old profile picture
            backblaze_bucket.delete_file_version(file_id, file_name)

            # rename photo to random string + accountID
            original_file_name = data[1]["profilePicture"].name
            new_file_name = generate_unique_filename(account_id, original_file_name)

            # upload image to backblaze
            upload_source = UploadSourceBytes(image_file)
            upload_result = backblaze_bucket.upload(
                upload_source, file_name=new_file_name
            )

            image_link = generate_image_url(new_file_name)

            # Save photo URL with user
            profile.profilePicture = image_link
            profile.save()

            request_response = json.dumps(
                {"profileID": profile.accountID.accountID, "profilePicture": image_link}
            )

            return JsonResponse(request_response, status=200, safe=False)

        except MultiValueDictKeyError:
            return JsonResponse({"error": "Missing required JSON fields."}, status=400)

        except Profile.DoesNotExist:
            return JsonResponse({"error": "Profile not found."}, status=404)

        except HTTPError:
            return JsonResponse({"error": "Uploaded file is not an image."}, status=400)

        except ValueError:
            return JsonResponse(
                {"error": "accountID or profilePicture field is empty."}, status=400
            )

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
                return JsonResponse(
                    {"error": "Profile's profilePicture not found, nothing to delete."},
                    status=404,
                )

            # parse url, get file name
            profile_picture_url = urlparse(profile.profilePicture)
            file_name = os.path.basename(profile_picture_url.path)

            # find file info to grab file id
            backblaze_api, backblaze_bucket = initialize_backblaze_client()
            file_version_info = backblaze_bucket.get_file_info_by_name(file_name)
            file_id = file_version_info.as_dict()["fileId"]

            # delete file
            backblaze_bucket.delete_file_version(file_id, file_name)

            # update profile
            profile.profilePicture = None
            profile.save()

            return HttpResponse(status=204)

        except InvalidJsonFormat:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)

        except MissingRequiredFields:
            return JsonResponse({"error": "Missing required JSON fields."}, status=400)

        except Profile.DoesNotExist:
            return JsonResponse({"error": "Profile not found."}, status=404)

        except ValueError:
            return JsonResponse(
                {"error": "accountID or profilePicture field is empty."}, status=400
            )


class ProfilePictureDetailsView(View):
    def get(self, request, account_id, *args, **kwargs):
        return get_data(account_id, "profilePicture", lambda profile: profile.profilePicture)

class UserNamesView(View):
    def get(self, request, account_id, *args, **kwargs):
        return get_data(account_id, "userName", lambda profile: profile.userName)
    
    def post(self, request, account_id, *args, **kwargs):
        return post_data(account_id, "userName", request)

class PreferredNamesView(View):
    def get(self, request, account_id, *args, **kwargs):
        return get_data(
            account_id, "preferredName", lambda profile: profile.preferredName
        )

    def post(self, request, account_id, *args, **kwargs):
        return post_data(account_id, "preferredName", request)

class PreferredPronounsView(View):
    def get(self, request, account_id, *args, **kwargs):
        return get_data(
            account_id, "preferredPronouns", lambda profile: profile.preferredPronouns
        )

    def post(self, request, account_id, *args, **kwargs):
        return post_data(account_id, "preferredPronouns", request)

def get_data(account_id, name, mapper):
    """
    Handles GET requests when the client fetches for names/nicknames/pronouns
    """
    try:
        profile = Profile.objects.get(accountID=int(account_id))
        return JsonResponse(
            {"status": "success", "data": {"get": {name: mapper(profile)}}}, status=200
        )
    except ObjectDoesNotExist:
        return JsonResponse(
            {
                "status": "error",
                "message": "An account does not exist with this account ID.",
            },
            status=404,
        )

def post_data(account_id, name, request):
    """
    Handles POST requests when the client sends names/nicknames/prounouns to the back end
    """
    try: 
        profile = Profile.objects.get(accountID = account_id)
        data = json.loads(request.body)[name]

        if (name == "userName"):
            profile.userName = data 
        elif (name == "preferredName"):
            profile.preferredName = data
        elif (name == "preferredPronouns"):
            profile.preferredPronouns = data
        elif (name == "biography"):
            profile.biography = data
    
        profile.save()
        return JsonResponse({f'{name}': data, 'message': f'{name} saved successfully'}, status = 200)
    
    except Profile.DoesNotExist:
        return JsonResponse({'error': 'Account does not exist'}, status = 404)
    
    except KeyError:
        return JsonResponse({'error': f'Missing {name} field.'}, status = 400)

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
    file_type = imghdr.what(file)

    if file_type not in ACCEPTED_FILE_TYPES:
        return True

    return False
