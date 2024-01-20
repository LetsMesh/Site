'''
You can run this test with

python manage.py test mesh.tests.accounts_tests
'''

import json
from django.test import TestCase, Client
from ..accounts.models import Account  
from ..accounts.views import encrypt
class AccountTest(TestCase):
    """
    Test case for the Account model.
    """
    def setUp(self):
        """
        Set up test environment. Create a Client instance and a test account.
        """
        self.client = Client()
        
        self.test_account_password='some_encrypted_pass'
        salt, hash = encrypt(self.test_account_password)
        self.test_account = Account(
            email='test@email.com',
            encryptedPass=hash,
            salt=salt,
            phoneNum='1234567890',
            isMentor=False,
            isMentee=True
        )
        self.test_account.full_clean()
        self.test_account.save()

    def test_get_all_accounts(self):
        """
        Test case for getting all accounts. 

        A GET request is sent to the '/api/accounts' endpoint.
        The test passes if the response status code is 200.
        """
        response = self.client.get('/accounts')
        self.assertEqual(response.status_code, 200)

    def test_get_specific_account(self):
        """
        Test case for getting a specific account. 

        A GET request is sent to the '/api/accounts/{account_id}' endpoint.
        The test passes if the response status code is 200.
        """
        response = self.client.get(f'/accounts/{self.test_account.accountID}/')
        self.assertEqual(response.status_code, 200)
        
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertEqual(json_response["email"], self.test_account.email)
        self.assertEqual(json_response["encryptedPass"], self.test_account.encryptedPass.decode('utf-8'))
        self.assertEqual(json_response["isMentor"], self.test_account.isMentor)
        self.assertEqual(json_response["isMentee"], self.test_account.isMentee)

    def test_post_create_account(self):
        """
        Test case for creating a new account.

        A POST request containing new account data is sent to the '/api/accounts' endpoint.
        The test passes if the response status code is 201 and the created account has the same
        information as `data`
        """
        data = {
            'email': 'new@email.com',
            'password': 'newpassword',
            'phoneNum': '0987654321',
            'isMentor': True,
            'isMentee': False
        }
        response = self.client.post('/accounts/', json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        
        json_response = json.loads(response.content.decode("utf-8"))
        account = Account.objects.get(accountID=json_response["accountID"])
        self.assertEqual(account.accountID, json_response["accountID"])
        self.assertEqual(account.email, data["email"])
        self.assertEqual(account.phoneNum, data["phoneNum"])
        self.assertEqual(account.isMentor, data["isMentor"])
        self.assertEqual(account.isMentee, data["isMentee"])
        
        from ..accounts.views import decrypt
        self.assertEqual(account.encryptedPass, decrypt(data['password'], account.salt))

    def test_patch_update_account(self):
        """
        Test case for updating an account. 

        A PATCH request containing updated account data is sent to the '/api/accounts/{account_id}/' endpoint.
        The test passes if the response status code is 204 and the account data is successfully updated in the database.
        """
        updated_account_data = {
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
        self.assertEqual(updated_account.isMentor, updated_account_data['isMentor'])
        self.assertEqual(updated_account.isMentee, updated_account_data['isMentee'])

    def test_check_password(self):
        """
        Test case for checking a user's password.

        A POST request with the user's email and password is sent to the '/accounts/check-password/' endpoint.
        The test passes if the response status code is 200 for correct credentials and 401 for incorrect credentials.
        """
        # create new account
        data = {
            'email': 'new_account_email@email.com',
            'password': 'correct_password',
            'phoneNum': '456456456',
            'isMentor': True,
            'isMentee': False
        }
        response = self.client.post('/accounts/', json.dumps(data), content_type='application/json')
        # check if account is created successfully (detailed test for account creation is performed in another test)
        self.assertEqual(response.status_code, 201) 

        # Correct credentials
        correct_credentials = {
            'email': "new_account_email@email.com",
            'password': 'correct_password'
        }
        response = self.client.post('/accounts/check-password/', json.dumps(correct_credentials), content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # Incorrect credentials
        incorrect_credentials = {
            'email': "new_account_email@email.com",
            'password': 'wrong_password'
        }
        response = self.client.post('/accounts/check-password/', json.dumps(incorrect_credentials), content_type='application/json')
        
        self.assertEqual(response.status_code, 401)
    
    def test_change_password(self):
        """
        Test case for changing a user's password.

        A PATCH request with the user's email, old password, and new password is sent to the '/accounts/change-password/' endpoint.
        The test passes if the response status code is 204 and the user's password is successfully updated.
        """
        # create new account
        data = {
            'email': 'test_change_password@email.com',
            'password': 'correct_password',
            'phoneNum': '123123123',
            'isMentor': True,
            'isMentee': False
        }
        response = self.client.post('/accounts/', json.dumps(data), content_type='application/json')
        # check if account is created successfully (detailed test for account creation is performed in another test)
        self.assertEqual(response.status_code, 201) 

        # test changing password
        change_password_data = {
            'email': 'test_change_password@email.com',
            'old_password': 'correct_password',  # Assuming this is the correct current password
            'new_password': 'new_secure_password'
        }
        response = self.client.patch('/accounts/change-password/', json.dumps(change_password_data), content_type='application/json')
        self.assertEqual(response.status_code, 204)

        # verify if the password has indeed been changed by attempting to log in with the new password
        login_data = {
            'email': 'test_change_password@email.com',
            'password': 'new_secure_password'
        }
        login_response = self.client.post('/accounts/check-password/', json.dumps(login_data), content_type='application/json')
        self.assertEqual(login_response.status_code, 200)

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
