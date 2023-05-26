from django.http import HttpResponse


def index(request):
    if request.method == "GET":
        print(request)
        return HttpResponse("Hello, world.")
    
def verify_email(request):
    if request.method == "POST":
        print(request)
        return HttpResponse(request)
    