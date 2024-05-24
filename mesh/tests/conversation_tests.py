"""
You can run this test with

python manage.py test mesh.tests.conversation_tests

# Inside Docker container:
pipenv run python manage.py test mesh.tests.conversation_tests
"""

import json
from django.test import TestCase, Client
from mesh.conversation.models import Conversation, Message
from mesh.accounts.models import Account

class ConversationModelTestCase(TestCase):
    """
    Test case for the Conversation model and related functionalities.
    """
    def setUp(self):
        """
        Set up test environment. Create a Client instance and create test data.
        """
        self.client = Client()
        
        # Create test accounts
        self.account1 = Account.objects.create(email='user1@example.com')
        self.account2 = Account.objects.create(email='user2@example.com')

    def test_conversations(self):
        """
        Test case for creating a conversation, adding participants, and checking if the conversation is indeed created.
        The test involves the following steps:
            - POST /conversations/ to create a conversation
            - GET /accounts/<int:accountID>/conversations/ to retrieve conversations of a specific account
        """
        # Check route POST /conversations to create a new conversation
        response = self.client.post(
            '/conversations/', 
            json.dumps({
                "participants": [
                    self.account1.accountID,
                    self.account2.accountID,                
                ],
                "conversationType": 0
            }),
            content_type='application/json'
        )

        # Check the conversation creation response status code
        self.assertEqual(response.status_code, 201)

        # Check if the conversation is really created
        conversation_count = Conversation.objects.count()        
        self.assertEqual(conversation_count, 1)

        # Parse the conversation creation response data
        conversation_response = json.loads(response.content.decode("utf-8"))
        conversation_id = conversation_response["conversationID"]
        
        ######
        # Check route GET /accounts/<int:account_id>/conversations to retrieve the created conversation
        response = self.client.get(f'/accounts/{self.account1.accountID}/conversations/')
        self.assertEqual(response.status_code, 200)
        
        # Parse the response data to get conversations
        conversations = json.loads(response.content.decode("utf-8"))
        self.assertEqual(conversations["conversations"][0]["conversationID"], conversation_id)

        ######
        # create messages and check if the route GET `/conversations/<int:conversationID>/messages`
        # returns expected data for messages
        conversation = Conversation.objects.get(conversationID=conversation_id)
        Message.objects.create(
            conversation=conversation,
            account=self.account1,
            message="Hello from account1"
        )
        Message.objects.create(
            conversation=conversation,
            account=self.account2,
            message="Hello from account2"
        )

        # Check route GET /conversations/<int:conversationID>/messages to retrieve the messages
        response = self.client.get(f'/conversations/{conversation_id}/messages/')
        self.assertEqual(response.status_code, 200)
        
        # Parse the response data to get messages
        messages = json.loads(response.content.decode("utf-8"))['messages']
        self.assertEqual(len(messages), 2)