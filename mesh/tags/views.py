from django.http import JsonResponse
from ..tags.models import TagBridge
from ..accounts.models import Account


def user_tags(request):
    if request.method == "GET":
        request_data = request.GET
        response_data = {
            "status": "",
            "tags": []
        }

        if (request_data.get("userID") is None):
            response_data.update({"status": "Error: Missing userID field in request query."})
            return JsonResponse(response_data, status=400)
            # Returns a 400 error if request query string is missing userID field
        
        try:
            Account.objects.get(accountID=int(request_data.get("userID")))
        except:
            response_data.update({"status": "Error: User with given userID does not exist."})
            return JsonResponse(response_data, status=400)
            # Returns a 400 error if user ID does not exist


        tags_entry = TagBridge.objects.filter(accountID=request_data.get("userID"))
        user_tags = []

        for tag in tags_entry:
            tag_entry = tag.tagID
            user_tags.append(tag_entry.tagName)
        # Groups all tag names associated with the user ID into a list

        response_data.update({"status": "Success", "tags": user_tags})

        return JsonResponse(response_data, status=200)


 def post(self, request):
        if request.method == "POST":
            data = request.POST

            required_Fields = ["tagName", "isDefault", "acountID"]  
            if not all(field in data for field in required_fields):
                response_data = {'status': "Error : Missing field"}
                return JsonResponse(response_data, status=400)

            try:
                #creating new tag object
                tag=Tag.objects.create(
                    tagName=request_data["tagName"],
                    isDefault=BooleanField[request_data['isDefault']]
                )

                account = Account.objects.get(accountID=int(request_data["accountID"]))

                #Create Tag Bridge object

                tag_bridge= TagBridge.objects.create(
                    tagID=tag,
                    acountID=account
                )

                response_data={'status': 'Success', 'tagID', tag.tagID}

                return JsonResponse(response_data, status=101)
            
             except Account.DoesNotExist:
            response_data = {"status": "Error:  accountID does not exist."}
            return JsonResponse(response_data, status=400)
    else:
        response_data = {"status": "Error: Invalid request method. "}
        return JsonResponse(response_data, status=405)
