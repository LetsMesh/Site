# Command to test tags: python manage.py test mesh.tests.tags_tests --keepdb

from django.test import TestCase, Client
from ..tags.models import Tag
from ..accounts.models import Account
from ..tags.models import TagBridge


class TagsTestCase(TestCase):
    def setUp(self):
        testTag = Tag.objects.create(tagName="testTag", isDefault=False)
        testTag2 = Tag.objects.create(tagName="2testTag", isDefault=False)
        testTag3 = Tag.objects.create(tagName="3testTag", isDefault=False)
        testTag4 = Tag.objects.create(tagName="4testTag", isDefault=False)
        testTag5 = Tag.objects.create(tagName="5testTag", isDefault=False)

        sampleAccount = Account.objects.create(
            email='test@gmail.com',
            encryptedPass=bytes('password', 'utf-8'),
            salt=bytes('salt', 'utf-8'),
            phoneNum='1234567890',
            displayTheme='D',
            enabled2Factor=False,
            isMentor=False,
            isMentee=True
        )

        TagBridge.objects.create(tagID=testTag, accountID=sampleAccount)
        TagBridge.objects.create(tagID=testTag2, accountID=sampleAccount)
        TagBridge.objects.create(tagID=testTag3, accountID=sampleAccount)
        TagBridge.objects.create(tagID=testTag4, accountID=sampleAccount)
        TagBridge.objects.create(tagID=testTag5, accountID=sampleAccount)
        # Connects 5 test tags to the sample account using TagBridge

        self.client = Client()
        # Initializes client to test endpoints

    def test_tags(self):
        testTag = Tag.objects.get(tagName="testTag")
        self.assertEqual(testTag.tagName, 'testTag')
        self.assertEqual(testTag.isDefault, False)



