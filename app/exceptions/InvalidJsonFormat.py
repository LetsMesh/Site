from .BaseCustomException import BaseCustomException

class InvalidJsonFormat(BaseCustomException):
    """
    Exception raised when the JSON format is invalid.
    """
    error_code = 400
    message = 'Invalid JSON format.'