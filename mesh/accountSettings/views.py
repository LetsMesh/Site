from django.http import JsonResponse

from mesh.accountSettings.models import Settings


def display_theme(request):
    if request.method == "GET":
        data = request.GET
        response = {
            "status": "success"
        }
        if data.get("accountID") is None:
            response.update({"status": "error"})
            response.update({"message": "Missing account ID."})
            return JsonResponse(response)
        else:
            if Settings.objects.filter(accountID=int(data.get("accountID"))).exists():
                settings = Settings.objects.filter(accountID=int(data.get("accountID")))
                response.update({
                    "data": {
                        "get": {
                            "displayTheme": settings.get().displayTheme
                        }
                    }
                })
                return JsonResponse(response)
            else:
                response.update({"status": "error"})
                response.update({"message": "An account does not exist with this account ID."})
                return JsonResponse(response)
