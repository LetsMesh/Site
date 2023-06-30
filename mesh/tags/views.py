from django.shortcuts import render
from django.http import HttpResponse


def test_endpoint(request):
    if request.method == "GET":
        print(request)
        return HttpResponse("Nothing is broken if this works!")


def user_tags(request):
    if request.method == "GET":
        request_data = request.GET
        return HttpResponse(request_data.get("userID"))
