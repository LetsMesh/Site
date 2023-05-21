class InvalidJSONError(Exception):
    """Raised when the request body is not a valid JSON"""

class MissingRequiredFieldsError(Exception):
    """Raised when one or more required fields are missing from the data"""