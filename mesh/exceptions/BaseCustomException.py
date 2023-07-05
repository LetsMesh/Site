class BaseCustomException(Exception):
    """
    Base exception class. All custom exceptions should extend this class.
    """
    error_code = 400
    message = 'An error occurred.'

    def __init__(self, message=None, error_code=None):
        if message is not None:
            self.message = message
        if error_code is not None:
            self.error_code = error_code
        super().__init__(self.message)