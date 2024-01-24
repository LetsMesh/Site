'''
You can run this test with

python manage.py test mesh.tests.auth_session_tests
'''

from django.test import TestCase, Client
from mesh.accounts.models import Account
from ..accounts.views import encrypt
import json

class AuthTestCase(TestCase):
    def setUp(self):
        """
        Setup before each test case runs.
        
        Creates a test user with a hashed password and initializes a test client.
        """
        # Create a test user with a hashed password
        self.test_account_password='encrypted_passsasdas'
        salt, hash = encrypt(self.test_account_password)
        self.test_account = Account(
            email='test@example.com',
            encryptedPass=hash,
            salt=salt,
            phoneNum='1234567890',
            isMentor=False,
            isMentee=True
        )
        self.test_account.full_clean()
        self.test_account.save()

        self.client = Client()

    def test_login_success(self):
        """
        Test case for successful user login.

        Asserts that a user can log in with correct credentials and receives a 200 HTTP status
        code along with the 'is_logged_in' flag set to True in the response.
        """
        # Test successful login
        response = self.client.post('/auth/login/', {'email': 'test@example.com', 'password': self.test_account_password}, content_type='application/json')
        self.assertEqual(response.status_code, 200)

        json_response = json.loads(response.content.decode("utf-8"))
        self.assertTrue(json_response['is_logged_in'])

    def test_login_failure(self):
        """
        Test case for unsuccessful user login with incorrect password.

        Asserts that a user cannot log in with incorrect password and receives a 401 HTTP status
        code indicating unauthorized access.
        """
        # Test login failure with incorrect password
        response = self.client.post('/auth/login/', {'email': 'test@example.com', 'password': 'wrong_password'}, content_type='application/json')
        self.assertEqual(response.status_code, 401)

    def test_logout(self):
        """
        Test case for user logout functionality.

        Asserts that a logged-in user can log out successfully and the session is ended,
        verified by the absence of '_auth_user_id' in the client session.
        """
        # First login
        response = self.client.post('/auth/login/', {'email': 'test@example.com', 'password': self.test_account_password}, content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # Test logout
        response = self.client.post('/auth/logout/')
        self.assertEqual(response.status_code, 200)
        self.assertFalse('_auth_user_id' in self.client.session)

    def test_session_authenticated(self):
        """
        Test case for checking the session of an authenticated user.

        Asserts that a logged-in user's session is correctly recognized with a 200 HTTP status
        code and 'is_logged_in' flag set to True in the response.
        """
        # First login
        response = self.client.post('/auth/login/', {'email': 'test@example.com', 'password': self.test_account_password}, content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # Test session view for logged-in user
        response = self.client.get('/auth/session/')
        self.assertEqual(response.status_code, 200)
        json_response = json.loads(response.content.decode("utf-8"))
        self.assertTrue(json_response['is_logged_in'])

    def test_session_unauthenticated(self):
        """
        Test case for checking the session of an unauthenticated user.

        Asserts that an unauthenticated user's session is correctly recognized with a 401 HTTP status
        code and 'is_logged_in' flag set to False in the response.
        """
        # Test session view for not logged-in user
        response = self.client.get('/auth/session/')
        self.assertEqual(response.status_code, 401)

        json_response = json.loads(response.content.decode("utf-8"))
        self.assertFalse(json_response['is_logged_in'])

    def tearDown(self):
        """
        Cleanup after each test case runs.

        Deletes the test user from the database.
        """
        self.test_account.delete()
