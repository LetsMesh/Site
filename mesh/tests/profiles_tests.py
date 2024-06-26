'''
You can run this test with

python manage.py test mesh.tests.profiles_tests
'''
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
            salt=bytes("salt", "utf-8"),
            phoneNum="1234567890",
            isMentor=False,
            isMentee=True,
        )
        
        self.test_profile = Profile.objects.create(
            accountID=test_account,
            userName="profileTest",
            preferredName="Profile Test",
            preferredPronouns="Patrick",
            biography="Biography Test",
            profilePicture=SimpleUploadedFile(
                name="profile_test_image.png",
                content=open("media/image/test_image.png", "rb").read()
            )
        )

    def tearDown(self):
        image_path = "media/image/profile_test_image.png"
        if os.path.exists(image_path):
            os.remove(image_path)

    """ 
    Profile Picture Testing 
    """
    def test_profile_picture(self):
        test_user = Account.objects.get(email="profilestest@gmail.com")
        response = self.client.get(f"/profiles/profile-picture/{test_user.accountID}")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("data"), {"get": {"profilePicture": "profile_test_image.png"}})

    def test_no_account_profile_picture(self):
        response = self.client.get("/profiles/profile-picture/9999")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("status"), "error")
        self.assertEquals(json_response.get("message"), "An account does not exist with this account ID.")
  
    """ 
    Profile username, preferred name, and pronoun Testing 
    """
    def test_user_name(self):
        test_user = Account.objects.get(email="profilestest@gmail.com")
        response = self.client.get(f"/profiles/user-name/{test_user.accountID}")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("data"), {"get": {"userName": "profileTest"}})

    def test_no_account_user_name(self):
        response = self.client.get("/profiles/user-name/9999")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("status"), "error")
        self.assertEquals(json_response.get("message"), "An account does not exist with this account ID.")

    def test_preferred_name(self):
        test_user = Account.objects.get(email="profilestest@gmail.com")
        response = self.client.get(f"/profiles/preferred-name/{test_user.accountID}")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("data"), {"get": {"preferredName": "Profile Test"}})

    def test_no_account_preferred_name(self):
        response = self.client.get("/profiles/preferred-name/9999")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("status"), "error")
        self.assertEquals(json_response.get("message"), "An account does not exist with this account ID.")

    def test_preferred_pronouns(self):
        test_user = Account.objects.get(email="profilestest@gmail.com")
        response = self.client.get(f"/profiles/preferred-pronouns/{test_user.accountID}")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("data"), {"get": {"preferredPronouns": "Patrick"}})

    def test_no_account_preferred_pronouns(self):
        response = self.client.get("/profiles/preferred-pronouns/9999")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("status"), "error")
        self.assertEquals(json_response.get("message"), "An account does not exist with this account ID.")

    def test_post_user_name (self):
        user_name_data = {"userName": "kwame brown"}
        response = self.client.post(
            f'/profiles/user-name/{self.test_profile.accountID}', 
            data=user_name_data,
            content_type='application/json'            
        )
        self.assertEquals(response.status_code, 200)

    def test_post_preferred_name (self):
        preferred_name_data = {"preferredName": "brown"}
        response = self.client.post(
            f'/profiles/preferred-name/{self.test_profile.accountID}', 
            data=preferred_name_data, 
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 200)

    def test_post_preferred_pronouns (self):
        preferred_pronouns_data = {"preferredPronouns": "brown/black"}
        response = self.client.post(
            f'/profiles/preferred-pronouns/{self.test_profile.accountID}', 
            data=preferred_pronouns_data, 
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 200)

    """ 
    Biography Testing 
    """
    def test_biography(self):
        """
        Test Case for seeing if biography can be retrieved from speicified account

        A GET request is sent to the '/profiles/biography/{account_id}' endpoint.
        The test passes if the response status code is 200.
        """
        test_user = Account.objects.get(email="profilestest@gmail.com")
        response = self.client.get(f'/profiles/biography/{test_user.accountID}')
        self.assertEqual(response.status_code, 200)
        
    def test_biography_update(self):
        """
        Test Case for seeing if biography can be updated from specified account
        
        A POST request is sent to the '/profiles/biography/{account_id}' endpoint.
        The test passes if the response status code is 200.
        """
        test_user = Account.objects.get(email="profilestest@gmail.com")
        response = self.client.post(
            f"/profiles/biography/{test_user.accountID}",
            data={'biography': "Testing..."}, 
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 200)
