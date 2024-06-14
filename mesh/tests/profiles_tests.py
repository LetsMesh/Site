'''
You can run this test with

python manage.py test mesh.tests.profiles_tests

Inside a docker container: 
pipenv run python manage.py test mesh.tests.profiles_tests
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
            profilePicture=None
        )

    def tearDown(self):
        image_path = "media/image/profile_test_image.png"
        if os.path.exists(image_path):
            os.remove(image_path)

    def test_get_profile_details_no_query(self):
        test_user = Account.objects.get(email="profilestest@gmail.com")
        response = self.client.get(f"/profiles/{test_user.accountID}", follow=True)
        self.assertEqual(response.status_code, 200)
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEqual(json_response.get("profile"), {'biography': 'Biography Test', 'userName': 'profileTest', 'preferredName': 'Profile Test', 'preferredPronouns': 'Patrick', 'profilePicture': None})
    
    def test_get_profile_details_with_query(self):
        test_user = Account.objects.get(email="profilestest@gmail.com")
        response = self.client.get(f"/profiles/{test_user.accountID}?fields=biography,userName", follow=True)
        self.assertEqual(response.status_code, 200)
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEqual(json_response.get("profile"), {'biography': 'Biography Test', 'userName': 'profileTest'})

    def test_get_profile_details_no_account(self):
        response = self.client.get("/profiles/9999?fields=biography,userName",content_type="application/json", follow=True)
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEqual(response.status_code, 404)
        self.assertEqual(json_response.get("error"), "Profile not found.")

    def test_patch_profile_details(self):
        test_user = Account.objects.get(email="profilestest@gmail.com")
        patch_data = {
            "biography": "Updated Biography",
            "preferredName": "Updated Name"
        }
        response = self.client.patch(
            f"/profiles/{test_user.accountID}/",
            data=json.dumps(patch_data),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEqual(json_response.get("message"), "Profile updated successfully.")

        # Verify the changes
        profile = Profile.objects.get(accountID=test_user)
        self.assertEqual(profile.biography, "Updated Biography")
        self.assertEqual(profile.preferredName, "Updated Name")

    def test_patch_profile_details_no_account(self):
        patch_data = {
            "biography": "Updated Biography"
        }
        response = self.client.patch(
            "/profiles/9999/",
            data=json.dumps(patch_data),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 404)
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEqual(json_response.get("error"), "Profile not found.")

    def test_modify_user_profile_picture(self):
        test_user = Account.objects.get(email="profilestest@gmail.com")
        image_path = "media/image/test_image.png"
        with open(image_path, "rb") as image:
            response = self.client.post(
                f"/profiles/{test_user.accountID}/profile-picture/",
                data={ "profilePicture": image},
                format="multipart"
            )
        self.assertEqual(response.status_code, 201)
        json_response = json.loads(response.content.decode("utf-8"))
        
        expected_profile_id = test_user.accountID
        self.assertEqual(json_response.get("profileID"), expected_profile_id)
        
        profile_picture_url = json_response.get("profilePicture")
        self.assertIsNotNone(profile_picture_url)

        import re
        # Verify the profilePicture URL pattern
        pattern = r'https://f005\.backblazeb2\.com/file/LetsMesh/[\w\d]+\.png'
        self.assertTrue(re.match(pattern, profile_picture_url))

        # delete user pfp
        response = self.client.delete(f"/profiles/{test_user.accountID}/profile-picture/",)

        self.assertEqual(response.status_code, 204)
        # Verify the changes
        profile = Profile.objects.get(accountID=test_user)
        self.assertIsNone(profile.profilePicture)

    def test_post_profile_picture_no_account(self):
        image_path = "media/image/test_image.png"
        with open(image_path, "rb") as image:
            response = self.client.post(
                f"/profiles/9999/profile-picture/",
                data={ "profilePicture": image },
                format="multipart"
            )
        self.assertEqual(response.status_code, 404)
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEqual(json_response.get("error"), "Profile not found.")

    def test_delete_profile_picture_no_account(self):
        response = self.client.delete(
            "/profiles/9999/profile-picture/",
            
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 404)
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEqual(json_response.get("error"), "Profile not found.")
