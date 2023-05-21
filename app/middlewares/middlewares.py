from django.http import JsonResponse

from .exceptions import InvalidJSONError, MissingRequiredFieldsError

class CustomExceptionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            response = self.get_response(request)
        except InvalidJSONError:
            response = JsonResponse({'error': 'Invalid JSON format'}, status=400)
        except MissingRequiredFieldsError:
            response = JsonResponse({'error': 'Missing one or more required fields'}, status=400)

        return response
