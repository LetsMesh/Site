from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import *
import bcrypt
import os




def encrypt(password ):
    salt = bcrypt.gensalt(12)
    
    pepper = os.getenv("PEPPER")
    
    password = f"{password}{pepper}".encode('utf-8')
    
    return salt,bcrypt.hashpw(password,salt)

def decrypt(password, salt):
    pepper = os.getenv("PEPPER")
    password = f"{password}{pepper}".encode('utf-8')
    return bcrypt.hashpw(password,salt)


@csrf_exempt
def create_account(request):
    if request.method == "POST":
        #post endpoint is creation
        body = request.POST
        email = body["email"]
        phone_number = body["phoneNumber"]
        password = body["password"]
        salt,hash = encrypt(password)
        is_mentee = bool(body.get("isMentee",False)) 
        is_mentor = bool(body.get("isMentor",False))

        created = Account.objects.filter(email = email).values()
        if not created:

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
                    "status":"account already exists"
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
    
@csrf_exempt
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
    