from .BaseCustomException import BaseCustomException


class ProfileDoesNotExist(BaseCustomException):
    """
    Exception raised when account does not exist.
    """
    error_code = 400
    message = "Profile does not exist."
