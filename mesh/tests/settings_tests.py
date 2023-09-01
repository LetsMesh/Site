import json

from django.test import TestCase, Client

from mesh.accountSettings.models import Settings
from mesh.accounts.models import Account


class SettingsTest(TestCase):
    def setUp(self):
        self.client = Client()
        test_account = Account.objects.create(
            email="settingstest@gmail.com",
            encryptedPass=bytes("password_test", "utf-8"),
            phoneNum="1234567890",
            displayTheme="0",
            enabled2Factor=False,
            isMentor=False,
            isMentee=True
        )
        Settings.objects.create(
            accountID=test_account,
            isVerified=False,
            verificationToken=None,
            hasContentFilterEnabled=False,
            displayTheme="0",
            is2FAEnabled=False
        )

    def test_display_theme(self):
        test_user = Account.objects.get(email="settingstest@gmail.com")
        response = self.client.get("/settings/displayTheme", {"accountID": test_user.accountID})
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("data"), {"get": {"displayTheme": "0"}})

    def test_missing_account_display_theme(self):
        response = self.client.get("/settings/displayTheme")
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("status"), "error")
        self.assertEquals(json_response.get("message"), "Missing account ID.")

    def test_no_account_display_theme(self):
        response = self.client.get("/settings/displayTheme", {"accountID": 9999})
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEquals(json_response.get("status"), "error")
        self.assertEquals(json_response.get("message"), "An account does not exist with this account ID.")

    """
    Settings Testing
    """
    def test_get_settings(self):
        """
        Test case to see if settings are retrieved from account settings

        GET request to /accountSettings/settings endpoint.
        Test passes if 200 response status code is returned
        """
        test_user = Account.objects.get(email="settingstest@gmail.com")
        response = self.client.get(f"/settings/{test_user.accountID}/")
        self.assertEqual(response.status_code, 200)

    '''def test_update_settings(self):
        """
        Test case to see if settings are patched or update to account settings

        Patch request to /accountSettings/settings endpoint.
        Test passes if 200 response status code is returned
        """
        test_user_settings = Settings.objects.get(email="settingstest@gmail.com")

        new_account_data = {
            "accountID": test_user,
            "isVerified": False,
            "verificationToken": None,
            "hasContentFilterEnabled": False,
            "displayTheme": "0",
            "is2FAEnabled": False,
        }

        """ json_response = json.loads(response.content.decode("utf-8")) """
        self.assertEqual(test_user_settings.accountID, )
        self.assertEqual(test_user_settings.isVerified, )
        self.assertEqual(test_user_settings.verificationToken, )
        self.assertEqual(test_user_settings.hasContentFilterEnabled, )
        self.assertEqual(test_user_settings.displayTheme, )
        self.assertEqual(test_user_settings.is2FAEnabled, )'''