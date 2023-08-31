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
        return HttpResponse(status=200)