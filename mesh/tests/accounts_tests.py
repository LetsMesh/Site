'''
You can run this test with

python manage.py test mesh.tests.accounts_tests
'''

from django.test import TestCase, Client
from ..accounts.models import Account  

class AccountTest(TestCase):
    """
    Test case for the Account model.
    """
    def setUp(self):
        """
        Set up test environment. Create a Client instance and a test account.
        """
        self.client = Client()
        self.test_account = Account(
            email='test@email.com',
            encryptedPass=b'some_encrypted_pass',
            salt=b'some_salt',
            phoneNum='1234567890',
            isMentor=False,
            isMentee=True
        )
        self.test_account.full_clean()
        self.test_account.save()

    def test_get_all_accounts(self):
        """
        Test case for getting all accounts. 

        A GET request is sent to the '/api/accounts/' endpoint.
        The test passes if the response status code is 200.
        """
        response = self.client.get('/accounts/')
        self.assertEqual(response.status_code, 200)

    def test_get_specific_account(self):
        """
        Test case for getting a specific account. 

        A GET request is sent to the '/api/accounts/{account_id}/' endpoint.
        The test passes if the response status code is 200.
        """
        response = self.client.get(f'/accounts/{self.test_account.accountID}/')
        self.assertEqual(response.status_code, 200)

    def test_post_create_account(self):
        """
        Test case for creating a new account.

        A POST request containing new account data is sent to the '/api/accounts/' endpoint.
        The test passes if the response status code is 201.
        """
        data = {
            'email': 'new@email.com',
            'password': 'newpassword',
            'phoneNum': '0987654321',
            'isMentor': True,
            'isMentee': False
        }
        import json
        response = self.client.post('/accounts/', json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_patch_update_account(self):
        """
        Test case for updating an account. 

        A PATCH request containing updated account data is sent to the '/api/accounts/{account_id}/' endpoint.
        The test passes if the response status code is 204 and the account data is successfully updated in the database.
        """
        updated_account_data = {
            "email": "profilestest@gmail.com",
            "password": "newpassword123",
            "isMentor": False,
            "isMentee": True,
        }

        response = self.client.patch(
            f'/accounts/{self.test_account.accountID}/', 
            data=updated_account_data, 
            content_type='application/json'
        )
        # check if the update operation went successfully
        self.assertEqual(response.status_code, 204)

        # check if the account is actually updated by comparing the account in the database and the updated_account_data object
        updated_account = Account.objects.get(accountID=self.test_account.accountID)
        self.assertEqual(updated_account.email, updated_account_data['email'])
        self.assertEqual(updated_account.isMentor, updated_account_data['isMentor'])
        self.assertEqual(updated_account.isMentee, updated_account_data['isMentee'])
        # check password
        from ..accounts.views import decrypt
        self.assertEqual(updated_account.encryptedPass, decrypt(updated_account_data['password'], updated_account.salt))

    def test_delete_account(self):
        """
        Test case for deleting an account.

        A DELETE request is sent to the '/accounts/{account_id}/' endpoint.
        The test passes if the response status code is 204 and the account is successfully deleted from the database.
        """
        response = self.client.delete(f'/accounts/{self.test_account.accountID}/')
        self.assertEqual(response.status_code, 204)

        # Make sure the account is actually deleted by trying to retrieve it and expecting an Account.DoesNotExist exception
        with self.assertRaises(Account.DoesNotExist):
            Account.objects.get(accountID=self.test_account.accountID)