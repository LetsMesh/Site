import json
from ..middlewares.exceptions import CustomException

def validate_data(request_body, required_fields):
    try:
        data = json.loads(request_body)
    except json.JSONDecodeError:
        raise CustomException('Invalid JSON format')
        
    if not all(field in data for field in required_fields):
        raise CustomException('Missing one or more required fields')

    return data