# mesh/conversation/consumer.py

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
import json
from mesh.conversation.models import Conversation, Message
from mesh.accounts.models import Account
from django.forms.models import model_to_dict

class ChatConsumer(AsyncWebsocketConsumer):
    """
    WebSocket consumer to handle chat messages within a conversation.
    Manages WebSocket connections, receives messages from clients, 
    saves them to the database, and broadcasts them to the group.
    """

    async def connect(self):
        """
        Called when a WebSocket connection is established.
        Retrieves the conversation ID from the URL route, 
        joins the corresponding group, and accepts the connection.
        """
        # Retrieve conversation ID from URL route
        self.conversationID = self.scope['url_route']['kwargs'].get('conversationID', 1)
        self.roomGroupName = f'chat_{self.conversationID}'

        # Join room group
        await self.channel_layer.group_add(
            self.roomGroupName,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        """
        Called when the WebSocket connection is closed.
        Leaves the group associated with the conversation.
        """
        # Leave room group
        await self.channel_layer.group_discard(
            self.roomGroupName,
            self.channel_name
        )

    async def receive(self, text_data):
        """
        Called when a message is received from the WebSocket.
        Parses the JSON message, saves it to the database, 
        and broadcasts the saved message to the group.
        """
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        accountID = text_data_json['accountID']

        # Save the message to the database and get the saved message
        saved_message = await self.save_message(accountID, message)
        
        # Broadcast the saved message to the room
        await self.channel_layer.group_send(
            self.roomGroupName,
            {
                'type': 'chat_message',
                'message': saved_message
            }
        )

    async def chat_message(self, event):
        """
        Called when a message is sent to the group.
        Sends the saved message data to the WebSocket.
        """
        await self.send(text_data=json.dumps(event['message']))

    @database_sync_to_async
    def save_message(self, accountID, message):
        """
        Synchronously saves a message to the database.
        Creates a dictionary from the saved message, including 
        foreign key fields and timestamp, and returns it.

        The @database_sync_to_async decorator is used to run this synchronous
        database operation in an asynchronous context. It allows synchronous 
        database queries to be executed without blocking the async event loop.
        """
        conversation = Conversation.objects.get(pk=self.conversationID)
        account = Account.objects.get(pk=accountID)
        saved_message = Message.objects.create(
            conversation=conversation,
            account=account,
            message=message
        )
        
        # Create a dictionary from the saved message
        message_dict = model_to_dict(saved_message, fields=['messageID', 'message'])
        
        # Manually add the foreign key fields
        message_dict['accountID'] = accountID
        message_dict['timestamp'] = str(saved_message.timestamp)
        return message_dict

