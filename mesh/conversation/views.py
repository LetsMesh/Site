from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from .models import Account, Message
import json

@require_POST
def create_message(request):
    try:
        data = json.loads(request.body)
        from_account_id = data.get('from_account_id')
        to_account_id = data.get('to_account_id')
        message_text = data.get('message')

        from_account = Account.objects.get(accountID=from_account_id)
        to_account = Account.objects.get(accountID=to_account_id)

        message = Message.objects.create(
            from_account=from_account,
            to_account=to_account,
            message=message_text
        )
        return JsonResponse({'status': 'success', 'message_id': message.messageID}, status=201)
    except Account.DoesNotExist:
        return JsonResponse({'error': 'Account not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

from django.views.decorators.http import require_http_methods
from django.views import View

class MessageView(View):
    def put(self, request, message_id):
        try:
            data = json.loads(request.body)
            message_text = data.get('message')
            message = Message.objects.get(messageID=message_id)
            message.message = message_text
            message.save()
            return JsonResponse({'status': 'success', 'message': 'Message updated'}, status=200)
        except Message.DoesNotExist:
            return JsonResponse({'error': 'Message not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    def delete(self, request, message_id):
        try:
            message = Message.objects.get(messageID=message_id)
            message.message = None  # Or set to empty string ''
            message.save()
            return JsonResponse({'status': 'success', 'message': 'Message deleted'}, status=200)
        except Message.DoesNotExist:
            return JsonResponse({'error': 'Message not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

from django.views.decorators.http import require_GET
from django.db.models import Q

@require_GET
def get_conversation(request, account1_id, account2_id):
    try:
        messages = Message.objects.filter(
            Q(from_account_id=account1_id, to_account_id=account2_id) | 
            Q(from_account_id=account2_id, to_account_id=account1_id)
        ).order_by('timestamp')

        messages_data = [{
            'message_id': message.messageID,
            'from_account_id': message.from_account.accountID,
            'to_account_id': message.to_account.accountID,
            'message': message.message,
            'timestamp': message.timestamp
        } for message in messages]

        return JsonResponse({'messages': messages_data}, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@require_GET
def get_account_conversations(request, account_id):
    try:
        messages = Message.objects.filter(Q(from_account_id=account_id) | Q(to_account_id=account_id)).order_by('timestamp')

        conversations = {}
        for message in messages:
            other_account_id = message.from_account.accountID if message.from_account.accountID != account_id else message.to_account.accountID
            if other_account_id not in conversations:
                conversations[other_account_id] = []

            conversations[other_account_id].append({
                'message_id': message.messageID,
                'from_account_id': message.from_account.accountID,
                'to_account_id': message.to_account.accountID,
                'message': message.message,
                'timestamp': message.timestamp
            })

        return JsonResponse({'conversations': conversations}, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
