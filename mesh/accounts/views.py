from django.shortcuts import render
from django.http import HttpResponse
def passsword(request):
    if request.method == "POST":
        return HttpResponse(request.method)