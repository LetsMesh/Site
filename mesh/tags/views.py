from django.http import JsonResponse
from django.views import View

from ..tags.models import TagBridge, Tag
from ..accounts.models import Account


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
            # check if account exists
            Account.objects.get(accountID=account_id)
            tag_bridges = TagBridge.objects.filter(accountID=account_id)
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

