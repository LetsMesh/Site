from django.http import HttpResponse
import json
from django.http import JsonResponse, HttpResponse
from .middlewares.exceptions import InvalidJSONError, MissingRequiredFieldsError

def validate_data(request_body, required_fields):
    try:
        data = json.loads(request_body)
    except json.JSONDecodeError:
        raise InvalidJSONError()
        
    if not all(field in data for field in required_fields):
        raise MissingRequiredFieldsError()

    return data

def index(request):
    if request.method == "GET":
        print(request)
        return HttpResponse("Hello, world.")
