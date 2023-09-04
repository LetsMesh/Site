'''
You can run this test with

python manage.py test mesh.tests.education_tests

'''

import json
from django.test import TestCase, Client

from mesh.accounts.models import Account
from mesh.profiles.models import Profile
from mesh.education.models import Education
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

        Profile.objects.create(
            accountID=self.test_account,
            userName="profileTest",
            preferredName="Profile Test",
            preferredPronouns="Patrick",
            biography="Biography Test",
            profilePicture=""
        )

    """
    POST tests
    """
    def test_post_valid_education_to_account_succeeds(self):
        """
        Makes request to POST endpoint at '/educations/'

        Passes if:
            - New education row is created and its data is correct
            - New education bridge row is created and its data is correct
            - POST response status code is 201.
        """
        education_req_body = {
            'accountID': self.test_account.accountID,
            'degreeName': 'BS',
            'collegeName': 'Hamburger University',
            'educationStartDate': '2021-05-21',
            'educationEndDate': '2022-05-31',
            'educationDescription': 'cheeseburgers'
        }
        response = self.client.post('/educations/', education_req_body, content_type='application/json')
        education_bridge_dict = EducationBridge.objects.filter(accountID=self.test_account.accountID).values()[0]

        # Django automatically adds '_id' because the column name isn't explicitly defined in the model
        resp_education_ID = education_bridge_dict['educationID_id']
        education_dict = Education.objects.filter(educationID=resp_education_ID).values()[0]

        self.assertEqual(response.status_code, 201)

        self.assertEqual(education_req_body['degreeName'], education_dict['degreeName'])
        self.assertEqual(education_req_body['collegeName'], education_dict['collegeName'])

        self.assertEqual(education_req_body['educationStartDate'], str(education_bridge_dict['educationStartDate']))
        self.assertEqual(education_req_body['educationEndDate'], str(education_bridge_dict['educationEndDate']))
        self.assertEqual(education_req_body['educationDescription'], education_bridge_dict['educationDescription'])
    
    # def test_post_education_to_nonexistent_account_id_fails(self):
    #     """Passes if POST response status code is 400 and error is returned."""
    #     education_req_body = {
    #         'accountID': 180280,
    #         'degreeName': 'BS',
    #         'collegeName': 'Hamburger University'
    #     }
    #     self.post_and_assert_error(request=education_req_body, error_code=404,
    #                                error_msg='Account or Profile not found.')

    # def test_post_education_to_invalid_account_id_fails(self):
    #     """Passes if POST response status code is 400 and error is returned."""
    #     education_req_body = {
    #         'accountID': 'd',
    #         'degreeName': 'BS',
    #         'collegeName': 'Hamburger University'
    #     }
    #     self.post_and_assert_error(request=education_req_body, error_code=400,
    #                                error_msg='A field has invalid type.')

    # def test_post_education_missing_degree_name_fails(self):
    #     """Passes if POST response status code is 400 and error is returned."""
    #     education_req_body = {
    #         'accountID': self.test_account.accountID,
    #         'collegeName': 'Hamburger University'
    #     }
    #     self.post_and_assert_error(request=education_req_body, error_code=400,
    #                                error_msg='Missing required JSON fields.')

    # def test_post_education_missing_college_name_fails(self):
    #     """Passes if POST response status code is 400 and error is returned."""
    #     education_req_body = {
    #         'accountID': self.test_account.accountID,
    #         'degreeName': 'BS'
    #     }
    #     self.post_and_assert_error(request=education_req_body, error_code=400,
    #                                error_msg='Missing required JSON fields.')

    # def post_and_assert_error(self, *, request, error_code, error_msg):
    #     response = self.client.post('/educations/', request, content_type='application/json')
    #     json_response = json.loads(response.content.decode("utf-8"))
    #     self.assertEqual(response.status_code, error_code)
    #     self.assertEqual(json_response.get('error'), error_msg)
