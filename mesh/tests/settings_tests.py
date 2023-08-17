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
        self.test_settings = Settings.objects.create(
            accountID=test_account,
            isVerified=False,
            verificationToken=None,
            hasContentFilterEnabled=False,
            displayTheme="0",
            is2FAEnabled=False
        )

    def test_get_all_accounts_settings(self):
        response = self.client.get("/settings/")
        self.assertEqual(response.status_code, 200)

    def test_get_specific_account_settings(self):
        response = self.client.get(f"/settings/{self.test_settings.accountID}/")
        self.assertEqual(response.status_code, 200)
        
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
