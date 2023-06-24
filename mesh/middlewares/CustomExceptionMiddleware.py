from django.http import JsonResponse
from ..exceptions.BaseCustomException import BaseCustomException

class CustomExceptionMiddleware:
    """
    Middleware to handle custom exceptions.

    This middleware catches any exception that inherits from BaseCustomException and returns 
    a JSON response with an error message and the appropriate status code.

    Attributes:
        get_response: A callable that takes a request and returns a response. This will be 
        the actual view function that Django is trying to reach when a request comes in.

    Methods:
        __call__: Required method to make this a callable Middleware. It is the actual code 
        that will be run for each request.
    """

    def __init__(self, get_response):
        """
        Constructor method to initialize the middleware.

        Args:
            get_response: A callable which can be any function which receives a request and 
            returns a response. This will most often be the view associated with the requested 
            URL path, though it could also be another middleware if you have multiple ones stacked.
        """
        self.get_response = get_response

    def __call__(self, request):
        """
        The actual middleware process that gets executed with each request.

        Args:
            request: The request object.

        Returns:
            response: The response object. It can be either the response from the view 
            if everything went fine or a JsonResponse with the error message and status code 
            if a BaseCustomException was raised.
        """
        try:
            response = self.get_response(request)
        except BaseCustomException as e:
            response = JsonResponse({'error': e.message}, status=e.error_code)
        return response
