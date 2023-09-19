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

        Retrieves a list of all accounts in JSON format.

        Returns a JSON response containing all Account.
        """
        accounts = Account.objects.all()
        serialized_data = serialize('json', accounts)
        return JsonResponse({'accounts': json.loads(serialized_data)}, status=200)
    
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
            REQUIRED_FIELDS = ['email', 'password', 'phoneNum', 'displayTheme', 'enabled2Factor', 'isMentor', 'isMentee']
            data = validate_json_and_required_fields(request.body, REQUIRED_FIELDS)
            # data = json.loads(request.body)
            salt,hash = encrypt(data['password'])
            new_account = Account(
                email=data['email'],
                encryptedPass=hash,
                salt=salt,
                phoneNum=data['phoneNum'],
                displayTheme=data['displayTheme'],
                enabled2Factor=data['enabled2Factor'],
                isMentor=data['isMentor'],
                isMentee=data['isMentee'],
            )
            new_account.full_clean()
            new_account.save()
            return JsonResponse(
                {
                    'status': 'account created',
                    'accountID': new_account.accountID
                }, 
                status=201
            )
        
        except (KeyError, json.JSONDecodeError, ValidationError):
            return JsonResponse(
                {
                    'status': 'failed to create',
                    'error': 'Invalid data format',
                },
                status=400
            )


class SingleAccountView(View):
    """
    View for getting an Account by ID or updating an Account.
    """

    def get(self, request, account_id):
        """
        Handle GET requests.

        Returns a JSON response containing the Account with the given ID.
        If the Account does not exist, it returns a 404 status code and an error message.
        """
        try:
            account = Account.objects.get(accountID=account_id)
        except Account.DoesNotExist:
            return JsonResponse(
                {
                    'status': 'Account does not exist'
                }, 
                status=404
            )

        serialized_data = serialize('json', [account])
        return JsonResponse({'account': json.loads(serialized_data)}, status=200)

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
        account.displayTheme = data.get('displayTheme', account.displayTheme)
        account.enabled2Factor = data.get('enabled2Factor', account.enabled2Factor)
        account.isMentor = data.get('isMentor', account.isMentor)
        account.isMentee = data.get('isMentee', account.isMentee)
        account.save()
        return HttpResponse(status=204)

def encrypt(password ):
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

            return JsonResponse(
                {
                    "status":"successfully created"
                },
                status = 201
            )
        else:
            return JsonResponse(
                {
                    "status":"account with same email or phone number exists"
                },
                status = 409
            )
    else :
        return JsonResponse(
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
            return JsonResponse(
                {
                    "error":"Account not found",
                },
                status = 404
            )
        else:

            hash = user_created[0]["encryptedPass"]
            salt = user_created[0]["salt"]

            if hash == decrypt(password, salt):

                return JsonResponse(
                    {
                        "message":"Access granted"
                    },
                    status = 200
                )
            else:
                return JsonResponse(
                    {
                        "message":"Access denied, wrong password"
                    },
                    status = 200
                )

    else :
        return JsonResponse(
            {
                "status":f"{request.method} method not allowed"
            },
            status = 405
        )


