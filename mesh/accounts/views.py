from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import *
import bcrypt
import uuid

def encrypt(password ):
    salt = bcrypt.gensalt(12)
    password = password.encode('utf-8')
    print(password)
    print(salt)
    return (salt,bcrypt.hashpw(password,salt))


@csrf_exempt
def account(request):
    if request.method == "POST":
        #post endpoint is creation
        data = request.POST
        if "password" not in data:
            
            return JsonResponse(
                {"missing":"password"},
                status = 400
            )
        else:

            email = data["email"]
            phone_number = data["phoneNumber"]
            password = data["password"]
            salt,hash = encrypt(password)
            is_mentee = bool(data.get("isMentee",False)) 
            is_mentor = bool(data.get("isMentor",False))

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

                return JsonResponse({"status":"successfully created"},status = 201)
            else:
                return JsonResponse(
                    {"status":"account created already"},
                    status = 409
                )
    else :
        return JsonResponse({"status":f"{request.method} method not allowed"}, status = 405)
    
@csrf_exempt
def checkpassword(request):
    if request.method == "POST":
        data = request.POST
        return JsonResponse({"here":"here"}, status = 400)
    else :
        return JsonResponse({"here":"here"}, status = 400)