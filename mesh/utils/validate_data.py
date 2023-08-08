import json
from ..exceptions.InvalidJsonFormat import InvalidJsonFormat
from ..exceptions.MissingRequiredFields import MissingRequiredFields


def validate_json_and_required_fields(request_body, required_fields):
    """
    This function is specifically designed to validate a request body as JSON and
    ensure it contains certain required fields.

    This function will attempt to parse the request_body as JSON. If it cannot, it will
    raise an InvalidJsonFormat exception.

    It will then check that all required_fields are present in the parsed JSON. If any are missing,
    it will raise a MissingRequiredFields exception.

    If the request_body is valid JSON and contains all required fields, the function will return the
    parsed JSON as a Python dictionary.

    Use this function when you need to validate incoming JSON data and want to ensure certain fields
    are present.

    Args:
        request_body (str): The raw request body to validate and parse.
        required_fields (list): A list of strings representing the required fields.

    Returns:
        dict: The parsed JSON data.

    Raises:
        InvalidJsonFormat: If the request_body is not valid JSON.
        MissingRequiredFields: If one or more of the required_fields are missing from the parsed JSON data.
    """
    try:
        data = json.loads(request_body)
    except json.JSONDecodeError:
        raise InvalidJsonFormat()

    return validate_required_fields(data, required_fields)


def validate_required_fields(data, required_fields):
    if not all(field in data for field in required_fields):
        raise MissingRequiredFields()

    return data
