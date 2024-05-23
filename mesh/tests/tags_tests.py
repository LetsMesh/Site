"""
Command to test tags:

python manage.py test mesh.tests.tags_tests --noinput
"""

import json
from django.test import TestCase, Client
from ..tags.models import Tag
from ..accounts.models import Account
from ..tags.models import TagBridge


class TagsTestCase(TestCase):
    def setUp(self):
        # initialize client to test endpoints
        self.client = Client()

        # creates 3 tags
        self.test_tag = Tag.objects.create(tagName='testTag', isDefault=False)
        self.test_tag2 = Tag.objects.create(tagName='2testTag', isDefault=False)
        self.test_tag3 = Tag.objects.create(tagName='3testTag', isDefault=False)

        # account that will have 2 tags
        self.sample_account = Account.objects.create(
            email='test@gmail.com',
            encryptedPass=bytes('password', 'utf-8'),
            salt=bytes('salt', 'utf-8'),
            phoneNum='1234567890',
            isMentor=False,
            isMentee=True
        )

        # account that will have no tags
        self.sample_account_2 = Account.objects.create(
            email='kek@aol.lul',
            encryptedPass=bytes('JavascriptIsBestLanguage', 'utf-8'),
            salt=bytes('salt', 'utf-8'),
            phoneNum='9098692290',
            isMentor=True,
            isMentee=False
        )

        # connects 2 test tags to the sample account using TagBridge
        TagBridge.objects.create(tagID=self.test_tag, accountID=self.sample_account)
        TagBridge.objects.create(tagID=self.test_tag2, accountID=self.sample_account)

    def test_get_tags(self):
        # checks if test_tag was created correctly
        self.assertEqual(self.test_tag.tagName, 'testTag')
        self.assertEqual(self.test_tag.isDefault, False)

        # checks if the first sample account has the two tags
        raw_response = self.client.get(f'/tags/{self.sample_account.accountID}/')
        response_data = json.loads(raw_response.content.decode('utf-8'))
        self.assertEqual(raw_response.status_code, 200)
        self.assertEqual(response_data['tags'], [{
            'tagID': self.test_tag.tagID,
            'tagName': f'{self.test_tag.tagName}',
            'isDefault': self.test_tag.isDefault
        }, {
            'tagID': self.test_tag2.tagID,
            'tagName': f'{self.test_tag2.tagName}',
            'isDefault': self.test_tag2.isDefault
        }])

    def test_get_invalid_account_id(self):
        raw_response = self.client.get('/tags/9999/')  # using an invalid accountID
        response_data = json.loads(raw_response.content.decode('utf-8'))
        self.assertEqual(raw_response.status_code, 404)
        self.assertEqual(response_data['error'], 'Account does not exist.')

    def test_get_no_tags_on_user(self):
        raw_response = self.client.get(f'/tags/{self.sample_account_2.accountID}/')  # account has no tags
        response_data = json.loads(raw_response.content.decode('utf-8'))
        self.assertEqual(raw_response.status_code, 200)
        self.assertEqual(response_data['tags'], [])

    def test_post_tags(self):
        raw_response = self.client.post(f'/tags/{self.sample_account.accountID}/',
                                        {"tagID": self.test_tag3.tagID},  # adding the third tag
                                        content_type="application/json")
        response_data = json.loads(raw_response.content.decode('utf-8'))
        self.assertEqual(raw_response.status_code, 201)
        self.assertEqual(response_data['accountID'], self.sample_account.accountID)
        self.assertEqual(response_data['tagID'], self.test_tag3.tagID)

        # test if tag was added using GET request
        raw_response = self.client.get(f'/tags/{self.sample_account.accountID}/')
        response_data = json.loads(raw_response.content.decode('utf-8'))
        self.assertEqual(raw_response.status_code, 200)
        self.assertEqual(response_data['tags'], [{
            'tagID': self.test_tag.tagID,
            'tagName': f'{self.test_tag.tagName}',
            'isDefault': self.test_tag.isDefault
        }, {
            'tagID': self.test_tag2.tagID,
            'tagName': f'{self.test_tag2.tagName}',
            'isDefault': self.test_tag2.isDefault
        }, {
            'tagID': self.test_tag3.tagID,
            'tagName': f'{self.test_tag3.tagName}',
            'isDefault': self.test_tag3.isDefault
        }])

    def test_post_invalid_account_id(self):
        raw_response = self.client.post('/tags/9999/',  # using an invalid accountID
                                        {"tagID": self.test_tag3.tagID},
                                        content_type="application/json")
        response_data = json.loads(raw_response.content.decode('utf-8'))
        self.assertEqual(raw_response.status_code, 404)
        self.assertEqual(response_data['error'], 'Account does not exist.')

    def test_post_invalid_tag_id(self):
        raw_response = self.client.post(f'/tags/{self.sample_account.accountID}/',
                                        {"tagID": 9999},  # using an invalid tagID
                                        content_type="application/json")
        response_data = json.loads(raw_response.content.decode('utf-8'))
        self.assertEqual(raw_response.status_code, 404)
        self.assertEqual(response_data['error'], 'Tag does not exist.')
    
    def test_post_tag_already_exists(self):
        raw_response = self.client.post(f'/tags/{self.sample_account.accountID}/',
                                        {"tagID": self.test_tag.tagID},  # sample account already has this tag
                                        content_type="application/json")
        response_data = json.loads(raw_response.content.decode('utf-8'))
        self.assertEqual(raw_response.status_code, 409)
        self.assertEqual(response_data['error'], 'Account already has the tag with that id.')
