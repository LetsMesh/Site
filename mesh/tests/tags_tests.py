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
        test_tag = Tag.objects.create(tagName="testTag", isDefault=False)
        test_tag2 = Tag.objects.create(tagName="2testTag", isDefault=False)
        test_tag3 = Tag.objects.create(tagName="3testTag", isDefault=False)
        test_tag4 = Tag.objects.create(tagName="4testTag", isDefault=False)
        test_tag5 = Tag.objects.create(tagName="5testTag", isDefault=False)

        sample_account = Account.objects.create(
            email='test@gmail.com',
            encryptedPass=bytes('password', 'utf-8'),
            salt=bytes('salt', 'utf-8'),
            phoneNum='1234567890',
            isMentor=False,
            isMentee=True
        )

        TagBridge.objects.create(tagID=test_tag, accountID=sample_account)
        TagBridge.objects.create(tagID=test_tag2, accountID=sample_account)
        TagBridge.objects.create(tagID=test_tag3, accountID=sample_account)
        TagBridge.objects.create(tagID=test_tag4, accountID=sample_account)
        TagBridge.objects.create(tagID=test_tag5, accountID=sample_account)
        # Connects 5 test tags to the sample account using TagBridge

        Account.objects.create(
            email='kek@aol.lul',
            encryptedPass=bytes('JavascriptIsBestLanguage', 'utf-8'),
            salt=bytes('salt', 'utf-8'),
            phoneNum='9098692290',
            isMentor=True,
            isMentee=False
        )
        # Account with no tags

        self.client = Client()
        # Initializes client to test endpoints

    def test_tags(self):
        test_tag = Tag.objects.get(tagName="testTag")
        self.assertEqual(test_tag.tagName, 'testTag')
        self.assertEqual(test_tag.isDefault, False)
        # Checks if test_tag was created correctly

        sample_user = Account.objects.get(email="test@gmail.com")
        raw_response = self.client.get('/tags/', {'userID': sample_user.accountID})
        response_data = json.loads(raw_response.content.decode('utf-8'))

        self.assertEqual(raw_response.status_code, 200)
        self.assertEqual(response_data.get("tags"), ["testTag", "2testTag", "3testTag", "4testTag", "5testTag"])

    def test_no_user_id(self):
        raw_response = self.client.get('/tags/')
        response_data = json.loads(raw_response.content.decode('utf-8'))

        self.assertEqual(raw_response.status_code, 400)
        self.assertEqual(response_data.get("status"), "Error: Missing userID field in request query.")

    def test_invalid_user_id(self):
        raw_response = self.client.get('/tags/', {'userID': 100})
        response_data = json.loads(raw_response.content.decode('utf-8'))

        self.assertEqual(raw_response.status_code, 400)
        self.assertEqual(response_data.get("status"), "Error: User with given userID does not exist.")

    def test_no_tags_on_user(self):
        sample_user = Account.objects.get(email="kek@aol.lul")
        raw_response = self.client.get('/tags/', {'userID': sample_user.accountID})
        response_data = json.loads(raw_response.content.decode('utf-8'))

        self.assertEqual(raw_response.status_code, 200)
        self.assertEqual(response_data.get("tags"), [])

