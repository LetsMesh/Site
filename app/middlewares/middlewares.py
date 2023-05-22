from django.http import JsonResponse
from .exceptions import CustomException

class CustomExceptionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            response = self.get_response(request)
        except CustomException as e:
            response = JsonResponse({'error': e.message}, status=400)

        return response