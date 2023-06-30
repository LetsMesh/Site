from .BaseCustomException import BaseCustomException

class MissingRequiredFields(BaseCustomException):
    """
    Exception raised when one or more required fields are missing.
    """
    error_code = 400
    message = 'Missing one or more required fields.'