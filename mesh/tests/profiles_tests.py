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
            isMentee=True
        )
        test_profile = Profile.objects.create(
            accountID=test_account,
            userName="profileTest",
            preferredName="Profile Test",
            preferredPronouns="Patrick",
            biography="",
            image=SimpleUploadedFile(name="profile_test_image.png",
                                     content=open("media/image/test_image.png", "rb").read())
        )

    def tearDown(self):
        image_path = "media/image/profile_test_image.png"
        if os.path.exists(image_path):
            os.remove(image_path)

    def test_profile_picture(self):
        test_user = Account.objects.get(email="profilestest@gmail.com")
        response = self.client.get("/profiles/profilePicture", {"accountID": test_user.accountID})
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("data"), {"get": {"profilePicture": "/media/image/profile_test_image.png"}})

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

    def test_user_name(self):
        test_user = Account.objects.get(email="profilestest@gmail.com")
        response = self.client.get("/profiles/userName", {"accountID": test_user.accountID})
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("data"), {"get": {"userName": "profileTest"}})

    def test_missing_account_user_name(self):
        response = self.client.get("/profiles/userName")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("status"), "error")
        self.assertEquals(json_response.get("message"), "Missing account ID.")

    def test_no_account_user_name(self):
        response = self.client.get("/profiles/userName", {"accountID": 9999})
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("status"), "error")
        self.assertEquals(json_response.get("message"), "An account does not exist with this account ID.")

    def test_preferred_name(self):
        test_user = Account.objects.get(email="profilestest@gmail.com")
        response = self.client.get("/profiles/preferredName", {"accountID": test_user.accountID})
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("data"), {"get": {"preferredName": "Profile Test"}})

    def test_missing_account_preferred_name(self):
        response = self.client.get("/profiles/preferredName")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("status"), "error")
        self.assertEquals(json_response.get("message"), "Missing account ID.")

    def test_no_account_preferred_name(self):
        response = self.client.get("/profiles/preferredName", {"accountID": 9999})
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("status"), "error")
        self.assertEquals(json_response.get("message"), "An account does not exist with this account ID.")

    def test_preferred_pronouns(self):
        test_user = Account.objects.get(email="profilestest@gmail.com")
        response = self.client.get("/profiles/preferredPronouns", {"accountID": test_user.accountID})
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("data"), {"get": {"preferredPronouns": "Patrick"}})

    def test_missing_account_preferred_pronouns(self):
        response = self.client.get("/profiles/preferredPronouns")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("status"), "error")
        self.assertEquals(json_response.get("message"), "Missing account ID.")

    def test_no_account_preferred_pronouns(self):
        response = self.client.get("/profiles/preferredPronouns", {"accountID": 9999})
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("status"), "error")
        self.assertEquals(json_response.get("message"), "An account does not exist with this account ID.")
