import json
import os

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, Client

from mesh.accounts.models import Account
from mesh.profiles.models import Profile


class ProfilesTest(TestCase):
    def setUp(self):
        self.client = Client()
        test_account = Account.objects.create(
            email="profilestest@gmail.com",
            encryptedPass=bytes("password_test", "utf-8"),
            phoneNum="1234567890",
            displayTheme="0",
            enabled2Factor=False,
            isMentor=False,
            isMentee=True,
        )
        test_profile = Profile.objects.create(
            accountID=test_account,
            userName="profileTest",
            preferredName="Profile Test",
            preferredPronouns="",
            biography="Biography Test",
            image=SimpleUploadedFile(name="profile_test_image.png",
                                     content=open("media/image/test_image.png", "rb").read())
        )

    def tearDown(self):
        os.remove("media/image/profile_test_image.png")

    """ 
    Profile Picture Testing 
    """
    def test_profile_picture(self):
        test_user = Account.objects.get(email="profilestest@gmail.com")
        response = self.client.get("/profiles/profilePicture", {"accountID": test_user.accountID})
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("data"), {'get': {'profilePicture': '/media/image/profile_test_image.png'}})

    def test_missing_account_profile_picture(self):
        response = self.client.get("/profiles/profilePicture")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("status"), "error")
        self.assertEquals(json_response.get("message"), "Missing account ID.")

    def test_no_account_profile_picture(self):
        response = self.client.get("/profiles/profilePicture", {"accountID": 9999})
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("status"), "error")
        self.assertEquals(json_response.get("message"), "An account does not exist with this account ID.")

    """ 
    Biography Testing 
    """
    def test_biography(self):
        """
        Test Case for seeing if biography can be retrieved from speicified account

        A GET request is sent to the '/profiles/biography/{account_id}/' endpoint.
        The test passes if the response status code is 200.
        """
        test_user = Account.objects.get(email="profilestest@gmail.com")
        response = self.client.get(f'/profiles/biography/{test_user.accountID}/')
        self.assertEqual(response.status_code, 200)