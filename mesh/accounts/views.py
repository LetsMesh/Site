from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def password(request):
    if request.method == "POST":
        data = request.POST
        if("password" not in data):
            
            return HttpResponse({"here":"here"}, status = 200)
    
    else :
        return HttpResponse({"here":"here"}, status = 400)