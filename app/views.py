from django.http import HttpResponse

def index(request):
    if request.method == "GET":
        print(request)
        return HttpResponse("Hello, world.")
    
def password_reset_confirmed(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        new_password = str(body_data['newpassword'])
        return HttpResponse(new_password)