# mesh/conversation/views.py
from django.shortcuts import get_object_or_404

import json
from django.http import JsonResponse, HttpResponseBadRequest
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.views.decorators.http import require_GET
from django.views import View

from .models import Conversation, Message, ConversationParticipant
from ..accounts.models import Account
from ..profiles.models import Profile
from ..utils.validate_data import validate_json_and_required_fields
from django.core.exceptions import ValidationError

class ConversationsView(View):
    def post(self, request):
        """
        Create a new conversation.

        This method handles the creation of a new conversation based on the provided data.
        The required fields are 'participants' (a list of account IDs) and 'conversationType'.

        Returns:
            JsonResponse: A JSON response containing the ID of the created conversation.

        Raises:
            HttpResponseBadRequest: If the provided data is invalid or missing required fields.
        """
        try:
            REQUIRED_FIELDS = ['participants', 'conversationType']
            data = validate_json_and_required_fields(request.body, REQUIRED_FIELDS)
            
            participants = data['participants']
            conversationType = data['conversationType']

            if not isinstance(participants, list):
                return HttpResponseBadRequest("Invalid data")

            # Create the conversation
            conversation = Conversation.objects.create(conversationType=conversationType)

            # Add participants to the conversation
            try:
                for accountID in participants:
                    account = Account.objects.get(accountID=accountID)
                    ConversationParticipant.objects.create(conversation=conversation, account=account)
            except Account.DoesNotExist:
                return JsonResponse({'error': 'Participant account not found'}, status=404)

            return JsonResponse({'conversationID': conversation.conversationID}, status=201)
        
        except (KeyError, json.JSONDecodeError, ValidationError):
            return JsonResponse({"error": "Invalid data format"}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"Internal error: {str(e)}"}, status=500)

class SingleConversationView(View):
    def get(self, request, conversationID):
        try:
            conversation = Conversation.objects.get(conversationID)
            participants = conversation.participants.all()
            
            return JsonResponse(
                {
                    'conversationID': conversation.conversationID,
                    'conversationType': conversation.get_conversationType_display(),
                    'conversationName': conversation.conversationName,
                    'participants': [
                        {
                            'accountID': participant.account.accountID,
                            "name": participant.account.email,  # Assuming email represents the name of the user
                        } for participant in participants
                    ] 
                },
                status=200
            )
        except Conversation.DoesNotExist:
            return JsonResponse({"error": f"Conversation not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": f"Internal error: {str(e)}"}, status=500)
        
    def patch(self, request, conversationID):
        # todo: implement this to be able update conversation & its participants
        pass

# todo: implement pagination to consider the case where the user might have too many conversations
@require_GET
def get_account_conversations(request, account_id):
    """
    GET /accounts/<int:account_id>/conversations/
    Retrieve all conversations for a given account.

    This view retrieves all conversations where the specified account is a participant.
    It returns a JSON response containing a list of conversations with their details,
    including conversation ID, type, name, and participating accounts.
    
    return a list of conversations if found
    return:
        - status=200: If the request is successful, returns a JSON response with the following structure:
            {
                "conversations": {
                    "conversationID": int,
                    "conversationType": str,
                    "conversationName": str or None,
                    "participants": { "accountID": int, "name": str }[]
                }[]
            }
        - status=404: If the specified account is not found.
        - status=500: If an internal server error occurs.
    """
    try:
        accountID = account_id
        # Get the account object
        account = get_object_or_404(Account, accountID=accountID)

        # Get the conversations where the account is a participant
        conversation_participants = ConversationParticipant.objects.filter(account=account)
        conversations = [cp.conversation for cp in conversation_participants]

        # Serialize the conversations
        conversation_data = []
        for conversation in conversations:
            participants = conversation.participants.all()
            conversation_data.append({
                'conversationID': conversation.conversationID,
                'conversationType': conversation.get_conversationType_display(),
                'conversationName': conversation.conversationName,
                'participants': [
                    {
                        'accountID': participant.account.accountID,
                        "name": participant.account.email,  # Assuming email represents the name of the user
                    } for participant in participants
                ] 
            })
        return JsonResponse({'conversations': conversation_data}, status=200)
    except Account.DoesNotExist:
        return JsonResponse({"error": "Account not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": f'Internal error: {str(e)}'}, status=500)

@require_GET
def conversation_messages(request, conversationID):
    """
    Retrieve messages for a specific conversation.

    This function retrieves the messages for a given conversation ID, ordered by timestamp in descending order.
    The messages are paginated, with a default of 10 messages per page.

    Args:
        request: The HTTP request object.
        conversationID: The ID of the conversation for which to retrieve messages.

    Returns:
        JsonResponse: A JSON response containing the messages for the specified conversation.
    """
    page = request.GET.get('page', 1)
    per_page = 10  # Number of messages per page
    messages = Message.objects.filter(conversation_id=conversationID).order_by('-timestamp')
    paginator = Paginator(messages, per_page)
    
    try:
        messages_page = paginator.page(page)
    except PageNotAnInteger:
        messages_page = paginator.page(1)
    except EmptyPage:
        messages_page = paginator.page(paginator.num_pages)

    # Convert messages_page to JSON or a suitable format
    return JsonResponse({'messages': list(messages_page.object_list.values())})
