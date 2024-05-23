from django.http import JsonResponse
from django.views import View

from ..exceptions.InvalidJsonFormat import InvalidJsonFormat
from ..exceptions.MissingRequiredFields import MissingRequiredFields
from ..tags.models import TagBridge, Tag
from ..accounts.models import Account
from ..utils.validate_data import validate_json_and_required_fields


class TagsView(View):
    """
    Handles HTTP requests related to Tags,
    a GET call will retrieve tags from the specified account,
    a POST call will store tags for the specified account.
    """

    def get(self, request, account_id):
        """
        Handles GET requests to retrieve tags from a specific account.

        Responses:
            - HTTP 200 (OK): Successfully retrieved all tags related to an account.
            - HTTP 404 (Not Found): An account was not found with that id.

        Parameters:
            request: The HTTP request object.
            account_id: The id of the account to retrieve tags from.

        Returns:
            JsonResponse: An array of tags associated with the specified account.
        """
        try:
            account = Account.objects.get(accountID=account_id)
            tag_bridges = TagBridge.objects.filter(accountID=account)
            tags = []

            for tag_bridge in tag_bridges:
                tag = tag_bridge.tagID
                tag_data = {
                    'tagID': tag.tagID,
                    'tagName': tag.tagName,
                    'isDefault': tag.isDefault
                }
                tags.append(tag_data)

            return JsonResponse({
                'tags': tags
            }, status=200)
        except Account.DoesNotExist:
            return JsonResponse({
                'error': 'Account does not exist.'
            }, status=404)

    def post(self, request, account_id):
        """
        Handles POST requests to store tags for a specific account.

        Responses:
            - HTTP 201 (Created): Successfully stored a tag for the specified account.
            - HTTP 400 (Bad Request): Has invalid method body.
            - HTTP 404 (Not Found): An account/tag was not found with that id.
            - HTTP 409 (Conflict): The account already has that tag.

        Parameters:
            request: The HTTP request object.
            account_id: The id of the account to store tags to.

        Returns:
            JsonResponse: The account ID and the tag ID.
        """
        required_fields = ['tagID']
        try:
            data = validate_json_and_required_fields(request.body, required_fields)
            tag_id = data['tagID']
            account = Account.objects.get(accountID=account_id)
            tag = Tag.objects.get(tagID=tag_id)

            if TagBridge.objects.filter(tagID=tag, accountID=account).exists():
                return JsonResponse({
                    'error': 'Account already has the tag with that id.'
                }, status=409)
            else:
                TagBridge.objects.create(tagID=tag, accountID=account)
                return JsonResponse({
                    'accountID': account.accountID,
                    'tagID': tag.tagID
                }, status=201)
        except InvalidJsonFormat:
            return JsonResponse({
                'error': 'Invalid JSON format.'
            }, status=400)
        except MissingRequiredFields:
            return JsonResponse({
                'error': 'Missing required JSON fields.'
            }, status=400)
        except Account.DoesNotExist:
            return JsonResponse({
                'error': 'Account does not exist.'
            }, status=404)
        except Tag.DoesNotExist:
            return JsonResponse({
                'error': 'Tag does not exist.'
            }, status=404)
