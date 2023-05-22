from django.http import HttpResponse
from .middlewares.exceptions import CustomException

def index(request):
    if request.method == "GET":
        print(request)
        return HttpResponse("Hello, world.")
