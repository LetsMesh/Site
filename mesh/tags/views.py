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


def post_tags(self, request):
    if request.method == "POST":
        data = request.POST
        required_fields = ["tagName", "isDefault", "accountID"]  
        if not all(field in data for field in required_fields):
            response_data = {'status': "Error: Missing field"}
            return JsonResponse(response_data, status=400)
        
        try:
            # Creating new tag object
            tag = Tag.objects.create(
                tagName=data["tagName"],  
                isDefault=data['isDefault'] == "false"  
            )
            account = Account.objects.get(accountID=int(data["accountID"]))  
            # Create TagBridge object
            tag_bridge = TagBridge.objects.create(
                tagID=tag,
                accountID=account  
            )
            response_data = {'status': 'Success', 'tagID': tag.tagID}  # corrected syntax
            return JsonResponse(response_data, status=201)  # corrected status code
        
        except Account.DoesNotExist:
            response_data = {"status": "Error: accountID does not exist."}
            return JsonResponse(response_data, status=400)
    
    else:
        response_data = {"status": "Error: Invalid request method."}
        return JsonResponse(response_data, status=405)
