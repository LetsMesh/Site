# in accounts folder: (accounts.models) models.py
from django.db import models
from django.utils import timezone

class Account(models.Model):
    accountID = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=255, unique=True)

    #please set editable to False after debugging process
    encryptedPass = models.BinaryField(max_length=64,editable = True)
    salt = models.BinaryField(max_length = 36,editable = True)
    phoneNum = models.CharField(max_length=15)
    isMentor = models.BooleanField(default=False)
    isMentee = models.BooleanField(default=False)
    otp_base32 = models.CharField(
        max_length=200, null=True, blank=True
    )  # One Time Password's secret key
    last_login = models.DateTimeField(default=timezone.now)

    @property
    def is_authenticated(self):
        # Assuming all Account instances represent authenticated users
        return True
    
    def __str__(self) -> str:
        return str(self.accountID)
    
    class Meta:
        app_label = 'accounts'
        db_table = 'accounts'  # specify custom table name