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
        if"password" not in data:
            
            return JsonResponse({"error":"here"}, status = 400)
        else:
            
            salt,hash = encrypt("pass")
            print(salt)
            print
            return JsonResponse({"hash":"hash",
                                 "salt":"salt"},
                                   status = 201)
    else :
        return JsonResponse({"here":"here"}, status = 400)