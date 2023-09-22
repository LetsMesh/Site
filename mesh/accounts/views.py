from django.http import JsonResponse, HttpResponse
from django.core.exceptions import ValidationError
from django.core.serializers import serialize
from .models import *
import bcrypt
import os

from django.views import View

from .models import Account
from ..utils.validate_data import validate_json_and_required_fields
import json


class AccountsView(View):
    """
    Handles HTTP requests related to the collection of Account, supporting GET to 
    retrieve the list of all Account and POST to create a new Account.
    """

    def get(self, request):
        """
        Handle GET requests.

        Retrieves all Accounts from the database and returns them in a JSON-formatted array.
        Each element in the array is a JSON object representing an Account, including its model name, primary key, and other fields.

        Returns a 200 HTTP status code along with the JSON-formatted array of Accounts.
        """
        accounts = Account.objects.all()
        serialized_data = serialize('json', accounts)
        return HttpResponse(serialized_data, status=200, content_type='application/json')
    
    def post(self, request):
        """
        Handle POST requests.

        Creates a new account. The required fields are 'email', 'encryptedPass', 'phoneNum', 
        'displayTheme', 'enabled2Factor', 'isMentor', 'isMentee'. If all fields are 
        present and valid, it returns a JSON response with the newly created account's ID and 
        a HTTP status code 201, indicating that the account has been successfully created.
        
        Returns a JSON response with the newly created account's ID and a 201 status code.
        """
        try:
            REQUIRED_FIELDS = ['email', 'password', 'phoneNum', 'isMentor', 'isMentee']
            data = validate_json_and_required_fields(request.body, REQUIRED_FIELDS)
            # data = json.loads(request.body)
            salt,hash = encrypt(data['password'])
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
            return HttpResponse(
                new_account.accountID, 
                status=201,
                content_type='application/json'
            )
        
        except (KeyError, json.JSONDecodeError, ValidationError):
            return JsonResponse(
                {
                    'error': 'Failed to create. Invalid data format',
                },
                status=400,
                content_type='application/json'
            )


class SingleAccountView(View):
    """
    View for getting an Account by ID or updating an Account.
    """

    def get(self, request, account_id):
        """
        Handle GET requests.

        Returns a JSON response containing the details of a single Account
        identified by the given account_id. The JSON object contains the model
        name, primary key, and other fields of the Account.

        Returns a 404 status code and a JSON object containing an error message
        if the account does not exist.
        """
        try:
            account = Account.objects.get(accountID=account_id)
        except Account.DoesNotExist:
            return JsonResponse({'error': 'Account does not exist'}, status=404)

        # Serialize the account and parse it as JSON
        serialized_data = serialize('json', [account])
        parsed_data = json.loads(serialized_data)

        # Extract the first element from the parsed list
        single_account_data = parsed_data[0] if parsed_data else {}

        return HttpResponse(
            json.dumps(single_account_data), 
            status=200,
            content_type='application/json'
        )

    def patch(self, request, account_id, *args, **kwargs):
        """
        Handle PATCH requests.

        Updates the specified fields of the Account with the given ID.
        If the Account does not exist, it returns a 404 status code and an error message.

        Updates the account information with data from the request body. 

        If a field is not provided in the request body, the current value for 
        that field will remain unchanged. 

        After updating the account information, it saves the changes to the database.

        Returns a 204 HTTP status to indicate that the request has succeeded 
        but does not include an entity-body in the response.
        """
        try:
            account = Account.objects.get(accountID=account_id)
        except Account.DoesNotExist:
            return JsonResponse({'error': 'Account does not exist'}, status=404)

        data = json.loads(request.body)
        account.email = data.get('email', account.email)
        if (data.get('password')):
            salt, hash = encrypt(data.get('password'))
            account.encryptedPass = hash
            account.salt = salt
        account.isMentor = data.get('isMentor', account.isMentor)
        account.isMentee = data.get('isMentee', account.isMentee)
        account.save()
        return HttpResponse(status=204)
    
    def delete(self, request, account_id):
        """
        Handle DELETE requests.

        Deletes the Account with the given ID.
        If the Account does not exist, it returns a 404 status code and an error message.

        Returns a 204 HTTP status to indicate that the request has succeeded 
        but does not include an entity-body in the response.
        """
        try:
            account = Account.objects.get(accountID=account_id)
        except Account.DoesNotExist:
            return JsonResponse({'message': 'Account does not exist'}, status=404)

        account.delete()
        return JsonResponse({'message': f'successfully deleted Account with account_id: {account_id}'}, status=204)

def encrypt(password):
    salt = bcrypt.gensalt(12)

    pepper = os.getenv("PEPPER")

    password = f"{password}{pepper}".encode('utf-8')

    return salt,bcrypt.hashpw(password,salt)

def decrypt(password, salt):
    pepper = os.getenv("PEPPER")
    password = f"{password}{pepper}".encode('utf-8')
    return bcrypt.hashpw(password,salt)


def create_account(request):
    if request.method == "POST":
        #post endpoint is creation
        body = request.POST
        email = body["email"]
        phone_number = body["phoneNumber"]
        password = body["password"]
        salt,hash = encrypt(password)
        is_mentee = body.get("isMentee",False)
        is_mentor = body.get("isMentor",False)

        created_email = Account.objects.filter(email = email).values()
        created_phone = Account.objects.filter(phoneNum = phone_number).values()
        if not created_email and not created_phone:

            user_account = Account(
                email = email,
                encryptedPass = hash,
                salt = salt,
                phoneNum = phone_number,
                isMentee = is_mentee,
                isMentor = is_mentor
            )
            user_account.save()

            return HttpResponse(
                {
                    "status":"successfully created"
                },
                status = 201
            )
        else:
            return HttpResponse(
                {
                    "status":"account with same email or phone number exists"
                },
                status = 409
            )
    else :
        return HttpResponse(
            {
                "status":f"{request.method} method not allowed"
            },
            status = 405
        )

def check_password(request):
    if request.method == "POST":
        body = request.POST
        email = body.get("email",False)
        phoneNumber = body.get("phoneNumber",False)
        password = body.get("password",False)

        user_created = Account.objects.filter(email = email,phoneNum = phoneNumber).values()
        if not bool(user_created):
            return HttpResponse(
                {
                    "error":"Account not found",
                },
                status = 404
            )
        else:

            hash = user_created[0]["encryptedPass"]
            salt = user_created[0]["salt"]

            if hash == decrypt(password, salt):

                return HttpResponse(
                    {
                        "message":"Access granted"
                    },
                    status = 200
                )
            else:
                return HttpResponse(
                    {
                        "message":"Access denied, wrong password"
                    },
                    status = 200
                )

    else :
        return HttpResponse(
            {
                "status":f"{request.method} method not allowed"
            },
            status = 405
        )


