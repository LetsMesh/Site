from django.http import JsonResponse
from ..tags.models import TagBridge
from ..accounts.models import Account
from django.views import View
from django.views.decorators.csrf import csrf_exempt

class TagsView(View):
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
    '''
    Post call 
     -Allow user to post tags

    - When the tag were sucessfully created it will return response with 201 http response
    '''
    @csrf_exempt
    def post_tags(self, request, *args, **kwargs):
        print("Request Method:", request.method)
        if request.method == "POST":
            data = request.POST

            required_fields = ["tagName", "accountID"]
            if not all(field in data for field in required_fields):
                response_data = {'status': "Error: Missing field"}
                return JsonResponse(response_data, status=400)

            try:
                tag, created = Tag.objects.get_or_create(
                    tagName=data["tagName"],
                    isDefault=data.get('isDefault', False) == "true"
                )
                account = Account.objects.get(accountID=int(data["accountID"]))

                tag_bridge, created_bridge = TagBridge.objects.get_or_create(
                    tagID=tag,
                    accountID=account
                )

                response_data = {'status': 'Success'}
                return JsonResponse(response_data, status=200)

            except Account.DoesNotExist:
                response_data = {"status": "Error: accountID does not exist."}
                return JsonResponse(response_data, status=400)
        else:
            print("invalid request")
            response_data = {"status": "Error: Invalid request method."}
            return JsonResponse(response_data, status=405)