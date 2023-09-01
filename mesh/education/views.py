# Django Imports
from django.http import JsonResponse, HttpResponse
from django.views import View
from django.core import serializers
from django.utils.datastructures import MultiValueDictKeyError

# Model Imports
from .models import Education, EducationBridge
from mesh.accounts.models import Account
from mesh.profiles.models import Profile

# Utilities Imports
from mesh.utils.validate_data import validate_json_and_required_fields
from mesh.exceptions.MissingRequiredFields import MissingRequiredFields
from mesh.exceptions.InvalidJsonFormat import InvalidJsonFormat

# Library Imports
import json


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
            JsonResponses
            - With educationID and 201 status if Education and EducationBridge
                are successfully created

        """
        REQUIRED_FIELDS = ['accountID', 'degreeName', 'collegeName']
        try:
            data = validate_json_and_required_fields(request.body, REQUIRED_FIELDS)

            account_id = data['accountID']
            account = Account.objects.get(accountID=account_id)
            profile = Profile.objects.get(accountID=account)

            degree_name = data['degreeName']
            college_name = data['collegeName']
            
            if 'optionalDescription' not in data:
                description = ''
            else:
                description = data['optionalDescription']

            education = Education.objects.create(degreeName=degree_name, collegeName=college_name,
                                                 optionalDescription=description)
            
            EducationBridge.objects.create(accountID=profile, educationID=education)

            return JsonResponse({'educationID': education.educationID}, status=201)

        except MissingRequiredFields:
            return JsonResponse({"error": "Missing required JSON fields."}, status=400)