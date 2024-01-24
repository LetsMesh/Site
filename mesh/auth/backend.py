from django.contrib.auth.backends import BaseBackend
from mesh.accounts.models import Account

from mesh.accounts.views import decrypt

class AccountAuthenticationBackend(BaseBackend):
    def authenticate(self, request, email=None, password=None):
        try:
            account = Account.objects.get(email=email)
            if account.encryptedPass == decrypt(password, account.salt):
                return account
            else:
                return None
        except Account.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return Account.objects.get(pk=user_id)
        except Account.DoesNotExist:
            return None
