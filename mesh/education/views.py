# Django Imports
from django.http import JsonResponse
from django.views import View

# Model Imports
from .models import Education, EducationBridge
from mesh.accounts.models import Account
from mesh.profiles.models import Profile

# Utilities Imports
from mesh.utils.validate_data import validate_json_and_required_fields
from mesh.exceptions.MissingRequiredFields import MissingRequiredFields
from mesh.exceptions.InvalidJsonFormat import InvalidJsonFormat


class EducationView(View):
    def post(self, request, *args, **kwargs):
        """
        Handle POST requests to /education/ endpoint.
        Creates a new Education and connects it to a new EducationBridge.

        Example Request JSON:
        {
            'accountID': '1',
            'degreeName': 'BS',
            'collegeName': 'Hamburger University',
            'optionalDescription': "I'll have you know I graduated top of my class"
        }

        The optionalDescription field can be ommitted, in which an empty optionalDescription
        will be created.

        Returns:
            - JsonResponse with educationID and 201 status if Education and EducationBridge
                are successfully created
            - JsonResponse with error message and 400 status if:
                - JSON is in invalid format OR
                - JSON has missing fields OR
                - A field has invalid type OR
                - Account or Profile is not found
        """
        REQUIRED_FIELDS = ['accountID', 'degreeName', 'collegeName']
        try:
            data = validate_json_and_required_fields(request.body, REQUIRED_FIELDS)

            account_id, degree_name, college_name, description = get_post_fields(data)

            if type(degree_name) is not str or type(college_name) is not str:
                raise ValueError

            account = Account.objects.get(accountID=account_id)
            profile = Profile.objects.get(accountID=account)

            education = Education.objects.create(degreeName=degree_name, collegeName=college_name,
                                                 optionalDescription=description)
            EducationBridge.objects.create(accountID=profile, educationID=education)

            return JsonResponse({'educationID': education.educationID}, status=201)

        except InvalidJsonFormat:
            return JsonResponse({'error': 'Invalid JSON format.'}, status=400)

        except MissingRequiredFields:
            return JsonResponse({'error': 'Missing required JSON fields.'}, status=400)

        except ValueError:
            return JsonResponse({'error': 'A field has invalid type.'}, status=400)

        except (Account.DoesNotExist, Profile.DoesNotExist):
            return JsonResponse({'error': 'Account or Profile not found.'}, status=400)


def get_post_fields(data):
    account_id = data['accountID']
    degree_name = data['degreeName']
    college_name = data['collegeName']

    if 'optionalDescription' not in data:
        description = ''
    else:
        description = data['optionalDescription']

    return account_id, degree_name, college_name, description