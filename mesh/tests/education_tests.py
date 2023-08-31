import json
from django.test import TestCase, Client
from ..education.models import Education
from ..accounts.models import Account
from ..education.models import EducationBridge


class EducationTestCase(TestCase):
    def setUp(self):
        # Initializes client to test endpoints
        self.client = Client()

        Account.objects.create(
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
        Makes request to /education/ endpoint

        Passes if:
            - New education row is created
            - All education row data is correct.
            - New education bridge row is created
            - All education bridge data is correct.
            - POST response status code is 201.
        """

        test_education = {
            'degreeName': 'BS',
            'collegeName': 'Hamburger University',
            'optionalDescription': "I'll have you know I graduated top of my class, " \
                                    "and I have over 300 confirmed happy customers."
        }
        response = self.client.post()

    def test_post_education_creates_empty_description_if_missing(self):
        """
        Passes if:
            - New education row has empty description
        """
        pass

    def test_post_education_to_nonexistent_account_id_fails(self):
        """
        Passes if POST response status code is 400.
        """
        pass

    def test_post_education_to_null_account_id_fails(self):
        """
        Passes if POST response status code is 400.
        """
        pass

    def test_post_education_with_invalid_degree_name_fails(self):
        """
        Passes if POST response status code is 400.
        """
        pass

    def test_post_education_with_invalid_college_name_fails(self):
        """
        Passes if POST response status code is 400.
        """
        pass

    def test_post_education_missing_degree_name_fails(self):
        """
        Passes if POST response status code is 400.
        """
        pass

    def test_post_education_missing_college_name_fails(self):
        """
        Passes if POST response status code is 400.
        """
        pass
