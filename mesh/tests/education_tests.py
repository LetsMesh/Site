from django.test import TestCase, Client

from mesh.education.models import Education
from mesh.accounts.models import Account
from mesh.education.models import EducationBridge


class EducationTestCase(TestCase):
    def setUp(self):
        # Initializes client to test endpoints
        self.client = Client()

        self.test_account = Account.objects.create(
            email='test@gmail.com',
            encryptedPass=bytes('password', 'utf-8'),
            salt=bytes('salt', 'utf-8'),
            phoneNum='1234567890',
            displayTheme='D',
            enabled2Factor=False,
            isMentor=False,
            isMentee=True
        )

    """
    POST tests
    """
    def test_post_valid_education_to_account_succeeds(self):
        """
        Makes request to POST endpoint at '/education/'

        Passes if:
            - New education row is created and its data is correct
            - New education bridge row is created and its data is correct
            - POST response status code is 201.
        """

        education_req_body = {
            'accountID': self.test_account.accountID,
            'degreeName': 'BS',
            'collegeName': 'Hamburger University',
            'optionalDescription': "I'll have you know I graduated top of my class, " \
                                    "and I have over 300 confirmed happy customers."
        }
        response = self.client.post('/education/', education_req_body, content_type='application/json')
        education_bridge_row = EducationBridge.objects.filter(accountID=self.test_account.accountID)[0]
    
        resp_education_ID = education_bridge_row.educationID
        education_row = Education.objects.filter(educationID=resp_education_ID)[0]

        self.assertEqual(education_req_body['degreeName'], education_row.degreeName)
        self.assertEqual(education_req_body['collegeName'], education_row.collegeName)
        self.assertEqual(education_req_body['optionalDescription'], education_row.optionalDescription)

        self.assertEqual(response.status_code, 201)

    def test_post_education_creates_empty_description_if_missing(self):
        """
        Passes if:
            - New education row has empty description
            - POST response status code is 201.
        """

        education_req_body = {
            'accountID': self.test_account.accountID,
            'degreeName': 'BS',
            'collegeName': 'Hamburger University'
        }
        response = self.client.post('/education/', education_req_body, content_type='application/json')
        education_bridge_row = EducationBridge.objects.filter(accountID=self.test_account.accountID)[0]
    
        resp_education_ID = education_bridge_row.educationID
        education_row = Education.objects.filter(educationID=resp_education_ID)[0]

        self.assertEqual(education_row.optionalDescription, '')
        self.assertEqual(response.status_code, 201)

    def test_post_education_to_nonexistent_account_id_fails(self):
        """
        Passes if POST response status code is 400.
        """
        education_req_body = {
            'accountID': 180280,
            'degreeName': 'BS',
            'collegeName': 'Hamburger University'
        }
        response = self.client.post('/education/', education_req_body, content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_post_education_to_null_account_id_fails(self):
        """
        Passes if POST response status code is 400.
        """
        education_req_body = {
            'accountID': '',
            'degreeName': 'BS',
            'collegeName': 'Hamburger University'
        }
        response = self.client.post('/education/', education_req_body, content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_post_education_with_invalid_degree_name_fails(self):
        """
        Passes if POST response status code is 400.
        """
        education_req_body = {
            'accountID': self.test_account.accountID,
            'degreeName': 1,
            'collegeName': 'Hamburger University'
        }
        response = self.client.post('/education/', education_req_body, content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_post_education_with_invalid_college_name_fails(self):
        """
        Passes if POST response status code is 400.
        """
        education_req_body = {
            'accountID': self.test_account.accountID,
            'degreeName': 'BS',
            'collegeName': 1
        }
        response = self.client.post('/education/', education_req_body, content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_post_education_missing_degree_name_fails(self):
        """
        Passes if POST response status code is 400.
        """
        education_req_body = {
            'accountID': self.test_account.accountID,
            'collegeName': 'Hamburger University'
        }
        response = self.client.post('/education/', education_req_body, content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_post_education_missing_college_name_fails(self):
        """
        Passes if POST response status code is 400.
        """
        education_req_body = {
            'accountID': self.test_account.accountID,
            'degreeName': 'BS',
        }
        response = self.client.post('/education/', education_req_body, content_type='application/json')
        self.assertEqual(response.status_code, 400)
