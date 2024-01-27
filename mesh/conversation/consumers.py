# mesh/conversation/consumer.py

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
import json
from mesh.conversation.models import Conversation, Message
from mesh.accounts.models import Account
from django.forms.models import model_to_dict

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Retrieve conversation ID from URL route
        self.conversation_id = self.scope['url_route']['kwargs']['conversation_id']
        self.room_group_name = f'chat_{self.conversation_id}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        account_id = text_data_json['accountID']

        # Save the message to the database and get the saved message
        saved_message = await self.save_message(account_id, message)
        print('saved_message', saved_message)
        # Broadcast the saved message to the room
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': saved_message
            }
        )

    async def chat_message(self, event):
        # Send saved message data to WebSocket
        await self.send(text_data=json.dumps(event['message']))

    @database_sync_to_async
    def save_message(self, account_id, message):
        conversation = Conversation.objects.get(pk=self.conversation_id)
        account = Account.objects.get(pk=account_id)
        saved_message = Message.objects.create(
            conversation=conversation,
            account=account,
            message=message
        )
        
        # Create a dictionary from the saved message
        message_dict = model_to_dict(saved_message, fields=['messageID', 'message'])
        
        # Manually add the foreign key fields
        message_dict['account_id'] = account_id
        message_dict['timestamp'] = str(saved_message.timestamp)
        return message_dict

