"""
To run this test:

pytest ./mesh/tests/message_client_tests.py

# Inside Docker container:
(Without activating `pipenv shell`)

pipenv run pytest ./mesh/tests/message_client_tests.py
"""

import pytest
import json
from channels.testing import WebsocketCommunicator
from mesh.conversation.models import Conversation, Message
from mesh.accounts.models import Account
from asgiref.sync import sync_to_async
from django.test import Client
from mesh.conversation.consumers import ChatConsumer
from channels.routing import URLRouter
from django.urls import path
from django.conf import settings

@pytest.mark.django_db
@pytest.mark.asyncio
async def test_chat_consumer():
    """
    Test the ChatConsumer for WebSocket communication between two clients.
    The test covers connection, message sending, and message receiving.
    """
    # Use in-memory channel layers for testing.
    settings.CHANNEL_LAYERS = {
        'default': {
            'BACKEND': 'channels.layers.InMemoryChannelLayer',
        },
    }
    
    client = Client()
    
    # Create a test conversation asynchronously
    conversation = await sync_to_async(Conversation.objects.create)(conversationType=0)
    conversationID = conversation.conversationID
    
    # Create test accounts asynchronously
    account1 = await sync_to_async(Account.objects.create)(email='user1@example.com')
    account2 = await sync_to_async(Account.objects.create)(email='user2@example.com')

    # Add accounts to the conversation as participants
    response = client.post(
        '/conversations/', 
        {
            "participants": [
                account1.accountID,
                account2.accountID,                
            ],
            "conversationType": 0
        },
        content_type='application/json'
    )
    
    # Define the application and the routes for WebSocket communication
    application = URLRouter([
        path("ws/chat/<int:conversation_id>/", ChatConsumer.as_asgi()),
    ])
    
    # Initialize WebSocket communicators for two clients
    communicator1 = WebsocketCommunicator(application, f"/ws/chat/{conversationID}/")
    communicator2 = WebsocketCommunicator(application, f"/ws/chat/{conversationID}/")

    # Connect the first client
    connected, _ = await communicator1.connect()
    assert connected

    # Connect the second client
    connected, _ = await communicator2.connect()
    assert connected
    
    # Send a message from account1
    message_data = {'message': 'Hello from account1', 'accountID': account1.pk}
    await communicator1.send_json_to(message_data)

    # Check if account2 receives the message
    response = await communicator2.receive_json_from()
    assert response['message'] == 'Hello from account1'
    assert str(response['accountID']) == str(account1.pk)
    await communicator1.receive_json_from()

    # Send a message from account2
    message_data = {'message': 'Hello from account2', 'accountID': account2.pk}
    await communicator2.send_json_to(message_data)

    # Check if account1 receives the message
    response = await communicator1.receive_json_from()
    assert response['message'] == 'Hello from account2'
    assert str(response['accountID']) == str(account2.pk)
    await communicator2.receive_json_from()

    # Close connections
    await communicator1.disconnect()
    await communicator2.disconnect()

    # Check if messages are saved in the database
    saved_messages = await sync_to_async(list)(Message.objects.filter(conversation_id=conversationID))
    
    assert len(saved_messages) == 2
    assert saved_messages[0].message == 'Hello from account1'
    assert saved_messages[0].account_id == account1.pk
    assert saved_messages[1].message == 'Hello from account2'
    assert saved_messages[1].account_id == account2.pk
