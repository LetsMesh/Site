from django.test import TestCase, Client
from .models import Accounts  

class AccountsTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.test_account = Accounts.objects.create(
            email='test@example.com',
            encryptedPass='testpass',
            phoneNum='1234567890',
            displayTheme='L',
            enabled2Factor=False
        )

    def test_get_all_accounts(self):
        response = self.client.get('/api/accounts/')
        self.assertEqual(response.status_code, 200)

    def test_get_specific_account(self):
        response = self.client.get(f'/api/accounts/{self.test_account.id}/')
        self.assertEqual(response.status_code, 200)

    def test_post_create_account(self):
        new_account_data = {
            'email': 'new@example.com',
            'encryptedPass': 'newpass',
            'phoneNum': '0987654321',
            'displayTheme': 'D',
            'enabled2Factor': True
        }
        response = self.client.post('/api/accounts/', new_account_data, content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_patch_update_account(self):
        updated_account_data = {
            'email': 'updated@example.com',
            'encryptedPass': 'updatedpass',
            'phoneNum': '1122334455',
            'displayTheme': 'D',
            'enabled2Factor': True
        }
        response = self.client.patch(f'/api/accounts/{self.test_account.id}/', updated_account_data, content_type='application/json')
        self.assertEqual(response.status_code, 204)
