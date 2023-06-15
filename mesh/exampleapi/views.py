from django.shortcuts import render
from django.http import HttpResponse



def index(request):
    if request.method == "GET":
        print(request)
        return HttpResponse("You Got Home.")


def hello_world(request):
    if request.method == "GET":
        print(request)
        return HttpResponse("Hello World!")