# Django
from django.http import JsonResponse, HttpResponse
from django.core.exceptions import ValidationError
from django.core.serializers import serialize
from django.views import View

# Libraries
import bcrypt
import os
import json

# Models
from .models import *
from ..accountSettings.models import Settings

# Utils
from ..utils.validate_data import validate_json_and_required_fields

from mesh.accounts.services import (
    get_OTP_validity_service,
    get_user_services,
    post_email_code_service,
)

def encrypt(password):
    salt = bcrypt.gensalt(12)

    pepper = os.getenv("PEPPER")

    password = f"{password}{pepper}".encode('utf-8')

    return salt,bcrypt.hashpw(password,salt)

def decrypt(password, salt):
    pepper = os.getenv("PEPPER")
    password = f"{password}{pepper}".encode('utf-8')
    return bcrypt.hashpw(password,salt)

class AccountsView(View):
    """
    Handles HTTP requests related to the collection of Account, supporting GET to 
    retrieve the list of all Account and POST to create a new Account.
    """

    def get(self, request):
        """
        Handles GET requests to retrieve a list of all Account instances.

        Retrieves all Account records from the database and serializes them into JSON format. 
        Returns a JSON array where each element represents an Account with its details.

        Responses:
            - HTTP 200 (OK): Successfully retrieved and returned all Account records.

        Parameters:
            request: The HTTP request object.

        Returns:
            HttpResponse: A JSON-formatted array of all Accounts with HTTP status 200.
        """
        accounts = Account.objects.all()
        serialized_data = serialize('json', accounts)
        return HttpResponse(serialized_data, status=200, content_type='application/json')
    
    def post(self, request):
        """
        Handles POST requests to create a new Account.

        Expects a JSON payload with required fields: 'email', 'password', 'phoneNum', 'isMentor', and 'isMentee'.
        Validates the presence and uniqueness of 'email' and 'phoneNum'. Encrypts the password and creates a new Account instance.
        Saves the instance to the database if all validations pass.

        Responses:
            - HTTP 201 (Created): Successfully created a new Account.
            - HTTP 400 (Bad Request): If data is invalid or missing required fields.
            - HTTP 409 (Conflict): If an account with the same email or phone number already exists.

        Parameters:
            request: The HTTP request object with necessary account data.

        Returns:
            JsonResponse: A response with the new account's ID and status, along with an appropriate HTTP status code.
        """
        try:
            REQUIRED_FIELDS = ['email', 'password', 'phoneNum', 'isMentor', 'isMentee']
            data = validate_json_and_required_fields(request.body, REQUIRED_FIELDS)

            # check if there is any account created with this email/phoneNum
            created_email = Account.objects.filter(email = data["email"]).values()
            created_phone = Account.objects.filter(phoneNum = data["phoneNum"]).values()

            if created_email or created_phone:
                return JsonResponse(
                    data={ "error" : "account with same email or phone number exists" },
                    status=409
                )
            
            # encrypt the password
            salt, hash = encrypt(data['password'])
            new_account = Account(
                email=data['email'],
                encryptedPass=hash,
                salt=salt,
                phoneNum=data['phoneNum'],
                isMentor=data['isMentor'],
                isMentee=data['isMentee'],
            )
            new_account.full_clean()
            new_account.save()
            return JsonResponse(
                data={
                    "accountID": new_account.accountID, 
                    "status": "successfully created"
                }, 
                status=201
            )
        
        except (KeyError, json.JSONDecodeError, ValidationError):
            return JsonResponse(
                data={
                    "error": "Invalid data format",
                },
                status=400,
                content_type='application/json'
            )


class SingleAccountView(View):
    """
    View for getting or updating an Account by ID.
    """

    def get(self, request, account_id):
        """
        Handles GET requests to retrieve details of a single Account identified by account_id.

        Fetches the Account instance from the database using the provided account_id.
        Serializes the Account data into JSON format for response.

        Responses:
            - HTTP 200 (OK): Successfully retrieved the Account details.
            - HTTP 404 (Not Found): If no Account is found with the provided account_id.

        Parameters:
            request: The HTTP request object.
            account_id: The ID of the Account to retrieve.

        Returns:
            JsonResponse: Account details in JSON format with an appropriate HTTP status code.
        """
        try:
            account = Account.objects.get(accountID=account_id)
        except Account.DoesNotExist:
            return JsonResponse({'error': 'Account does not exist'}, status=404)

        # Manually construct the response data
        account_data = {
            'email': account.email,
            'encryptedPass': account.encryptedPass.decode('utf-8'),  # Assuming it's stored as bytes
            'salt': account.salt.decode('utf-8'),  # Assuming it's stored as bytes
            'phoneNum': account.phoneNum,
            'isMentor': account.isMentor,
            'isMentee': account.isMentee
        }

        return JsonResponse(account_data, status=200)

    def patch(self, request, account_id, *args, **kwargs):
        """
        Handles PATCH requests to update specific fields of an Account identified by account_id.

        Expects a JSON payload with any of the following fields: 'phoneNum', 'isMentor', 'isMentee'.
        Updates the specified fields for the Account instance if it exists.

        Responses:
            - HTTP 204 (No Content): Successfully updated the Account.
            - HTTP 404 (Not Found): If no Account is found with the provided account_id.

        Parameters:
            request: The HTTP request object with update data.
            account_id: The ID of the Account to update.

        Returns:
            HttpResponse: An HTTP status code indicating the outcome of the request.
        """
        try:
            account = Account.objects.get(accountID=account_id)
        except Account.DoesNotExist:
            return JsonResponse({'error': 'Account does not exist'}, status=404)

        data = json.loads(request.body)
        account.phoneNum = data.get('phoneNum', account.phoneNum)
        account.isMentor = data.get('isMentor', account.isMentor)
        account.isMentee = data.get('isMentee', account.isMentee)
        account.save()
        return HttpResponse(status=204)
    
    def delete(self, request, account_id):
        """
        Handle DELETE requests.
        DELETE /accounts/<int:account_id>

        Deletes the Account with the given ID.
        If the Account does not exist, it returns a 404 status code and an error message.

        Returns a 204 HTTP status to indicate that the request has succeeded 
        but does not include an entity-body in the response.
        """
        try:
            account = Account.objects.get(accountID=account_id)
        except Account.DoesNotExist:
            return JsonResponse({'error': 'Account does not exist'}, status=404)

        account.delete()
        return JsonResponse({'message': f'successfully deleted Account with account_id: {account_id}'}, status=204)

def check_password(request, *args, **kwargs):
    """
    Handles a POST request to authenticate a user's credentials.

    The function expects a JSON payload with 'email' and 'password' fields. It retrieves the user's 
    account using the provided email. If the account exists, the function checks if the provided password 
    matches the encrypted password stored in the database.

    Responses:
        - HTTP 200 (OK): If credentials are valid and authentication is successful.
        - HTTP 401 (Unauthorized): If credentials are invalid.
        - HTTP 400 (Bad Request): If required fields are missing/invalid or JSON format is incorrect.
        - HTTP 500 (Internal Server Error): For any other unexpected errors.
        - HTTP 405 (Method Not Allowed): If the HTTP method is not POST.

    Parameters:
        request: The HTTP request object containing the payload with 'email' and 'password'.

    Returns:
        JsonResponse: An HTTP response with the appropriate status code based on the outcome of the operation.
    """
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            # Query to check if user exists
            account = Account.objects.get(email=email)
            if account and account.encryptedPass == decrypt(password, account.salt):
                return JsonResponse({"message": "Access granted"}, status=200)
            else:
                # Generic error message for security
                return JsonResponse({"error": "Invalid credentials"}, status=401)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)

def change_password(request, *args, **kwargs):
    """
    Handles a PATCH request to change a user's password.

    The function expects a JSON payload with the fields 'email', 'old_password', and 'new_password'.
    It first validates the presence of these fields. Then, it retrieves the user's account using the provided email.
    If the account exists, the function checks if the old_password matches the current password stored in the database.
    If the password matches, it encrypts the new_password and updates the user's account with the new encrypted password and salt.

    Responses:
        - HTTP 204 (No Content): Password successfully changed.
        - HTTP 400 (Bad Request): If the old password is incorrect or required fields are missing/invalid.
        - HTTP 404 (Not Found): If the account associated with the provided email does not exist.
        - HTTP 405 (Method Not Allowed): If the HTTP method is not PATCH.
        - HTTP 500 (Internal Server Error): For any other unexpected errors.

    Parameters:
        request: The HTTP request object containing the payload with 'email', 'old_password', and 'new_password'.
    
    Returns:
        HttpResponse: An HTTP response with the appropriate status code based on the outcome of the operation.
    """
    if request.method == "PATCH":
        try:
            REQUIRED_FIELDS = ['email', 'old_password', 'new_password']
            data = validate_json_and_required_fields(request.body, REQUIRED_FIELDS)
            
            email = data["email"]
            old_password = data["old_password"]
            new_password = data["new_password"]

            account = Account.objects.get(email=email)
            
            if account.encryptedPass != decrypt(old_password, account.salt):
                return JsonResponse({'error': 'Incorrect old password'}, status=400)

            salt, hash = encrypt(new_password)
            account.encryptedPass = hash
            account.salt = salt
            account.save()
            return HttpResponse(status=204)

        except Account.DoesNotExist:
            return JsonResponse({'error': 'Account not found'}, status=404)
        except ValidationError as e:
            return JsonResponse({'error': str(e)}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({"error": f"{request.method} method not allowed"}, status=405)

class Set2FAView(View):
    """
    Send email to the user for 2FA Verification
    Body should be a JSON request with the accountID
    get_user_services checks if the account id exist and will return the account as an object
    otherwise, get_user_services would return None
    Responses:
        - HTTP 404 (Not Found): User Object is not found.
        - HTTP 500 (Internal Server Error): For any other unexpected errors.
    otherwise, post_email_code_service would attempt to send the email for the One Time Password
    """

    def post(self, request):
        user = get_user_services(request)
        if user == None:
            return JsonResponse(
                {
                    "status": "fail",
                    "message": f"No user with the username or password exists",
                },
                status=404,
            )
        try:
            user_setting = Settings.objects.get(accountID=user.accountID)
        except Exception as e:
            return JsonResponse({'error': (str(e) + " User's account setting is not detected")}, status=500)
        post_email_code_service(user, user_setting)
        return JsonResponse({"status": "successfully sent"}, status=201)

class Verify2FAView(View):
    """
    Verify if the 6 digit OTP(One Time Password) is correct
    Body should be a JSON request with the accountID and OTP as the field
    the account id will first be verified if it exist, if so check the validity of the OTP
    return status 404 if the user does not exist
    return status 400 if the input OTP is not valid
    return status 201 upon successful verification
    """

    def post(self, request):
        data = json.loads(request.body.decode("utf-8"))
        user = get_user_services(request)
        if user == None:
            return JsonResponse(
                {
                    "status": "Verification failed",
                    "message": f"No user with the username or password exists",
                },
                status=404,
            )
        valid_OTP = get_OTP_validity_service(user, data.get("otp", None))
        if not valid_OTP:
            return JsonResponse(
                {"status": "Verification failed", "message": f"OTP is invalid"},
                status=400,
            )
        return JsonResponse({"status": "successfully verified"}, status=201)

def get_login_user_service(request):
    """
    Check if the password from request is correct
    @return: the user account object
    """
    data = json.loads(request.body.decode("utf-8"))
    email_ = data.get("email", None)
    password = data.get("password", None)
    try:
        user = Account.objects.get(email=email_)
        salt = user.salt
        if user.encryptedPass == decrypt(password, salt):
            return user
        else:
            return None
    except:
        return None