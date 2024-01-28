# in auth folder: backend.py  (auth.backend)

from django.contrib.auth.backends import BaseBackend
from mesh.accounts.models import Account

from mesh.accounts.views import decrypt

class AccountAuthenticationBackend(BaseBackend):
    """
    A custom authentication backend that uses email and password for authentication.

    This backend extends Django's BaseBackend and is specific to the Account model.
    It authenticates users based on their email and password, using custom logic
    defined for the Account model. Additionally, it includes a method to retrieve 
    account data along with its settings.
    """

    def authenticate(self, request, email=None, password=None):
        """
        Authenticates a user based on email and password.

        Args:
            request: The HTTP request object. Not directly used in this method but is
                     required by the Django authentication backend interface.
            email (str, optional): The email of the user attempting to log in.
            password (str, optional): The password of the user.

        Returns:
            Account instance if authentication is successful, None otherwise.

        This method attempts to find an Account instance based on the provided email.
        If found, it decrypts the provided password and compares it against the stored
        encrypted password. If the credentials match, the Account instance is returned.
        Otherwise, None is returned to indicate failed authentication.
        """
        try:
            account = Account.objects.get(email=email)
            if account.encryptedPass == decrypt(password, account.salt):
                return account
            else:
                return None
        except Account.DoesNotExist:
            return None

    def get_user(self, user_id):
        """
        Retrieves a user based on a user ID.

        Args:
            user_id: The ID of the user to retrieve.

        Returns:
            Account instance if a user with the given ID exists, None otherwise.

        This method is used by Django's authentication system to fetch the user
        instance associated with a user ID. It is particularly useful for session
        validation and other authentication-related operations.
        """
        try:
            return Account.objects.get(pk=user_id)
        except Account.DoesNotExist:
            return None
        
    def get_account_data(self, accountID):
        """
        Retrieves account data along with its settings based on the account ID.

        Args:
            accountID: The ID of the account to retrieve.

        Returns:
            A dictionary containing the account data and its settings if they exist,
            otherwise None.

        If the account does not have settings, a default Settings instance is created.
        """
        from django.db import transaction
        from mesh.accountSettings.models import Settings
        with transaction.atomic():
            account_with_settings = Account.objects.filter(accountID=accountID).select_related('settings').first()
            if account_with_settings:
                # Create default settings if they do not exist
                if not hasattr(account_with_settings, 'settings'):
                    Settings.objects.create(accountID=account_with_settings)

                account_data = {
                    'accountID': account_with_settings.accountID,
                    'email': account_with_settings.email,
                    'phoneNum': account_with_settings.phoneNum,
                    'isMentor': account_with_settings.isMentor,
                    'isMentee': account_with_settings.isMentee,
                    'settings': {
                        'isVerified': account_with_settings.settings.isVerified,
                        'hasContentFilterEnabled': account_with_settings.settings.hasContentFilterEnabled,
                        'displayTheme': account_with_settings.settings.displayTheme,
                        'is2FAEnabled': account_with_settings.settings.is2FAEnabled,
                    }
                }

                print(account_data)
                return account_data
        
        return None
