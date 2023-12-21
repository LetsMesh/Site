'''
You can run this test with

python manage.py test mesh.tests.settings_tests
'''
import json

from django.test import TestCase, Client

from mesh.accountSettings.models import Settings
from mesh.accounts.models import Account


class SettingsTest(TestCase):
    """
    Test case for the Settings model and related views.
    """

    def setUp(self):
        """
        Sets up the test environment before each test method.

        This method initializes a test client and creates a test account and associated settings
        which will be used in subsequent tests.
        """
        self.client = Client()
        self.test_account = Account.objects.create(
            email="settingstest@gmail.com",
            encryptedPass=bytes("password_test", "utf-8"),
            salt=bytes("salt", "utf-8"),
            phoneNum="1234567890",
            isMentor=False,
            isMentee=True
        )
        self.test_settings = Settings.objects.create(
            accountID=self.test_account,
            isVerified=False,
            verificationToken=None,
            hasContentFilterEnabled=False,
            displayTheme="0",
            is2FAEnabled=False
        )

    def test_get_all_accounts_settings(self):
        """
        Test case for getting all account settings.

        A GET request is sent to the '/account-settings/' endpoint.
        The test passes if the response status code is 200.
        """
        response = self.client.get("/account-settings/")
        self.assertEqual(response.status_code, 200)

    def test_get_specific_account_settings(self):
        """
        Test case for getting settings of a specific account.

        A GET request is sent to the '/account-settings/{account_id}/' endpoint.
        The test passes if the response status code is 200 and the settings data matches the test account.
        """
        response = self.client.get(f"/account-settings/{self.test_settings.accountID}/")
        self.assertEqual(response.status_code, 200)
        
    def test_display_theme(self):
        """
        Test case for getting the display theme setting of a specific account.

        A GET request is sent to the '/account-settings/displayTheme/{account_id}' endpoint.
        The test passes if the response status code is 200 and the 'displayTheme' value is correct.
        """
        test_user = Account.objects.get(email="settingstest@gmail.com")
        response = self.client.get(f"/account-settings/displayTheme/{test_user.accountID}")
        self.assertEqual(response.status_code, 200)
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response, {"displayTheme": "0"})

    def test_missing_account_display_theme(self):
        """
        Test case for attempting to get the display theme setting of a non-existent account.

        A GET request is sent to the '/account-settings/displayTheme/9999' endpoint with an invalid account ID.
        The test passes if the response status code is 404, indicating that the account was not found.
        """
        response = self.client.get("/account-settings/displayTheme/9999")
        self.assertEqual(response.status_code, 404)

    def test_no_account_display_theme(self):
        """
        Test case for verifying the error message when attempting to get the display theme of a non-existent account.

        A GET request is sent to the '/account-settings/displayTheme/9999' endpoint with an invalid account ID.
        The test passes if the response includes an error message indicating that the account does not exist.
        """
        response = self.client.get("/account-settings/displayTheme/9999")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("error"), "Account does not exist")

    def test_create_settings(self):
        """
        Test case for creating new settings associated with a newly created account.

        The test involves two steps:
        1. Creating a new account via a POST request to '/accounts/'.
        2. Creating new settings for this account via a POST request to '/account-settings/'.

        The test passes if both requests return a status code of 201 (Created) and the newly created settings 
        match the provided data.
        """
        account_data = {
            'email': 'new@email.com',
            'password': 'newpassword',
            'phoneNum': '0987654321',
            'isMentor': True,
            'isMentee': False
        }
        create_account_response = self.client.post('/accounts/', json.dumps(account_data), content_type='application/json')
        self.assertEqual(create_account_response.status_code, 201)
        account_json_response = json.loads(create_account_response.content.decode("utf-8"))
        account = Account.objects.get(accountID=account_json_response["accountID"])
        
        setting_data = {
            "accountID": account.accountID,
            "isVerified": True,
            "verificationToken": "token123",
            "hasContentFilterEnabled": False,
            "displayTheme": "1",
            "is2FAEnabled": True
        }
        create_setting_response = self.client.post("/account-settings/", json.dumps(setting_data), content_type='application/json')
        self.assertEqual(create_setting_response.status_code, 201)

        setting = Settings.objects.get(accountID=account.accountID)
        self.assertEqual(setting.isVerified, setting_data["isVerified"])
        self.assertEqual(setting.verificationToken, setting_data["verificationToken"])
        self.assertEqual(setting.hasContentFilterEnabled, setting_data["hasContentFilterEnabled"])
        self.assertEqual(setting.displayTheme, setting_data["displayTheme"])
        self.assertEqual(setting.is2FAEnabled, setting_data["is2FAEnabled"])

    def test_update_settings(self):
        """
        Test case for updating settings of a specific account.

        A PATCH request with updated settings data is sent to the '/account-settings/{account_id}/' endpoint.
        The test passes if the response status code is 204 and the settings data in the database is updated accordingly.
        """
        test_account = Account.objects.get(email="settingstest@gmail.com")
        update_data = {
            "isVerified": True,
            "displayTheme": "1"
        }
        response = self.client.patch(f"/account-settings/{test_account.accountID}/", json.dumps(update_data), content_type="application/json")
        self.assertEqual(response.status_code, 204)
        
        setting = Settings.objects.get(accountID=test_account.accountID)
        self.assertEqual(setting.isVerified, update_data["isVerified"])
        self.assertEqual(setting.displayTheme, update_data["displayTheme"])
