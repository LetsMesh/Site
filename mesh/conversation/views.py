# mesh/conversation/views.py

import json
from django.http import JsonResponse, HttpResponseBadRequest
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.views.decorators.http import require_GET
from django.views import View

from .models import Conversation, Message, ConversationParticipant
from ..accounts.models import Account
from ..profiles.models import Profile
from ..utils.validate_data import validate_json_and_required_fields

class ConversationsView(View):
    
    def post(self, request):
        '''
        create new conversation
        '''
        try:
            REQUIRED_FIELDS = ['participants', 'conversation_type']
            data = validate_json_and_required_fields(request.body, REQUIRED_FIELDS)
            
            participants = data['participants']
            conversation_type = data['conversation_type']

            if not isinstance(participants, list):
                return HttpResponseBadRequest("Invalid data")

            # Create the conversation
            conversation = Conversation.objects.create(conversation_type=conversation_type)

            # Add participants to the conversation
            for accountID in participants:
                account = Account.objects.get(accountID=accountID)
                ConversationParticipant.objects.create(conversation=conversation, account=account)

            return JsonResponse({'conversation_id': conversation.conversationID}, status=201)
        except json.JSONDecodeError:
            return HttpResponseBadRequest("Invalid JSON")
        except KeyError:
            return HttpResponseBadRequest("Missing data")
        
    def get(self, request):
        accountID = request.user.accountID
        conversations = Conversation.objects.filter(participants__account=accountID).distinct()
        conversations_data = []

        import random

        for conversation in conversations:
            participants_data = []
            for participant in ConversationParticipant.objects.filter(conversation=conversation):
                if participant.account.accountID != accountID:
                    participants_data.append({
                        "accountID": participant.account.accountID,
                        "name": participant.account.email,  # Assuming userName represents the name of the user
                        "isMentor": participant.account.isMentor,
                        "isMentee": participant.account.isMentor
                    })

            messages_data = list(conversation.messages.values(
                'messageID', 'account_id', 'message', 'timestamp'
            ))

            conversations_data.append({
                "conversationID": conversation.conversationID,
                "participants": participants_data,
                "conversation_type": Conversation.ConversationTypes(conversation.conversation_type).label,
                "messages": messages_data
            })

        return JsonResponse({'conversations': conversations_data})

@require_GET
def conversation_messages(request, conversation_id):
    page = request.GET.get('page', 1)
    per_page = 10  # Number of messages per page
    messages = Message.objects.filter(conversation_id=conversation_id).order_by('-timestamp')
    paginator = Paginator(messages, per_page)
    
    try:
        messages_page = paginator.page(page)
    except PageNotAnInteger:
        messages_page = paginator.page(1)
    except EmptyPage:
        messages_page = paginator.page(paginator.num_pages)

    # Convert messages_page to JSON or a suitable format
    return JsonResponse({'messages': list(messages_page.object_list.values())})

class ConversationParticipantsView(View):
    def get(self, request):
        pass
    
    def patch(self, request):
        pass
