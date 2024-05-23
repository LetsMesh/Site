'''
Command to test tags: 

python manage.py test mesh.tests.tags_tests --noinput
'''

import json
from django.test import TestCase, Client
from ..tags.models import Tag
from ..accounts.models import Account
from ..tags.models import TagBridge


class TagsTestCase(TestCase):
    def setUp(self):
        test_tag = Tag.objects.create(tagName='testTag', isDefault=False)
        test_tag2 = Tag.objects.create(tagName='2testTag', isDefault=False)

        sample_account = Account.objects.create(
            email='test@gmail.com',
            encryptedPass=bytes('password', 'utf-8'),
            salt=bytes('salt', 'utf-8'),
            phoneNum='1234567890',
            isMentor=False,
            isMentee=True
        )

        # Connects 2 test tags to the sample account using TagBridge
        TagBridge.objects.create(tagID=test_tag, accountID=sample_account)
        TagBridge.objects.create(tagID=test_tag2, accountID=sample_account)

        # Account with no tags
        Account.objects.create(
            email='kek@aol.lul',
            encryptedPass=bytes('JavascriptIsBestLanguage', 'utf-8'),
            salt=bytes('salt', 'utf-8'),
            phoneNum='9098692290',
            isMentor=True,
            isMentee=False
        )

        # Initializes client to test endpoints
        self.client = Client()

    def test_get_tags(self):
        # Checks if test_tag was created correctly
        test_tag = Tag.objects.get(tagName='testTag')
        self.assertEqual(test_tag.tagName, 'testTag')
        self.assertEqual(test_tag.isDefault, False)

        sample_account = Account.objects.get(email='test@gmail.com')
        
        raw_response = self.client.get(f'/tags/{sample_account.accountID}')
        response_data = json.loads(raw_response.content.decode('utf-8'))
        self.assertEqual(raw_response.status_code, 200)
        self.assertEqual(response_data.get('tags'), [{
            'tagID': 'testTag',
            'tagName': 'testTag',
            'isDefault': False
        }, {
            'tagID': '2testTag',
            'tagName': '2testTag',
            'isDefault': False
        }])

    def test_get_invalid_account_id(self):
        raw_response = self.client.get('/tags/100')
        response_data = json.loads(raw_response.content.decode('utf-8'))
        self.assertEqual(raw_response.status_code, 404)
        self.assertEqual(response_data.get('error'), 'Account does not exist.')

    def test_get_no_tags_on_user(self):
        sample_account = Account.objects.get(email='kek@aol.lul')

        raw_response = self.client.get(f'/tags/{sample_account.accountID}')
        response_data = json.loads(raw_response.content.decode('utf-8'))
        self.assertEqual(raw_response.status_code, 200)
        self.assertEqual(response_data.get('tags'), [])

    def test_post_tags(self):
        # creates new tag to store to account
        test_tag3 = Tag.objects.create(tagName='3testTag', isDefault=False)
        sample_account = Account.objects.get(email='test@gmail.com')
        
        raw_response = self.client.post(f'/tags/{sample_account.accountID}', {'tagID': f'{test_tag3.tagID}'})
        response_data = json.loads(raw_response.content.decode('utf-8'))
        self.assertEqual(raw_response.status_code, 201)
        self.assertEqual(response_data.get('accountID'), sample_account.accountID)
        self.assertEqual(response_data.get('tagID'), test_tag3.tagID)

        # test if tag was added using GET request
        raw_response = self.client.get(f'/tags/{sample_account.accountID}')
        response_data = json.loads(raw_response.content.decode('utf-8'))
        self.assertEqual(raw_response.status_code, 200)
        self.assertEqual(response_data.get('tags'), [{
            'tagID': 'testTag',
            'tagName': 'testTag',
            'isDefault': False
        }, {
            'tagID': '2testTag',
            'tagName': '2testTag',
            'isDefault': False
        }, {
            'tagID': '3testTag',
            'tagName': '3testTag',
            'isDefault': False
        }])

    def test_post_invalid_account_id(self):
        # creates new tag to store to account
        test_tag3 = Tag.objects.create(tagName='3testTag', isDefault=False)
        
        raw_response = self.client.post('/tags/100', {'tagID': f'{test_tag3.tagID}'})
        response_data = json.loads(raw_response.content.decode('utf-8'))
        self.assertEqual(raw_response.status_code, 404)
        self.assertEqual(response_data.get('error'), 'Account does not exist.')

    def test_post_invalid_tag_id(self):
        sample_account = Account.objects.get(email='test@gmail.com')
        
        raw_response = self.client.post(f'/tags/{sample_account.accountID}', {'tagID': 'invalidTestTag'})
        response_data = json.loads(raw_response.content.decode('utf-8'))
        self.assertEqual(raw_response.status_code, 404)
        self.assertEqual(response_data.get('error'), 'Tag does not exist.')
    
    def test_post_tag_already_exists(self):
        # this tag already exists for this account
        test_tag = Tag.objects.get(tagName='testTag')
        sample_account = Account.objects.get(email='test@gmail.com')
        
        raw_response = self.client.post(f'/tags/{sample_account.accountID}', {'tagID': f'{test_tag.tagID}'})
        response_data = json.loads(raw_response.content.decode('utf-8'))
        self.assertEqual(raw_response.status_code, 409)
        self.assertEqual(response_data.get('error'), 'Account already has the tag with that id.')
