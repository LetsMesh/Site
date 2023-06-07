from django.http import HttpResponse


def index(request):
    if request.method == "GET":
        print(request)
        return HttpResponse(f"Hello, world.")
