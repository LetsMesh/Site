import json
from django.test import TestCase, Client
from ..education.models import Education
from ..accounts.models import Account
from ..education.models import EducationBridge


class EducationTestCase(TestCase):
    def setUp():
        pass

    def tearDown():
        pass

    """
    POST tests
    """
    def test_post_education_to_account_succeeds():
        """
        Passes if POST response status code is 201.
        """
        pass

    def test_post_education_to_nonexistent_account_id_fails():
        """
        Passes if POST response status code is 400.
        """
        pass

    def test_post_education_to_null_account_id_fails():
        """
        Passes if POST response status code is 400.
        """
        pass