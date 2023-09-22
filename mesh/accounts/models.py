# in accounts folder: (accounts.models) models.py
from django.db import models

class Account(models.Model):
    accountID = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=255, unique=True)

    #please set editable to False after debugging process
    encryptedPass = models.BinaryField(max_length=64,editable = True)
    salt = models.BinaryField(max_length = 36,editable = True)
    phoneNum = models.CharField(max_length=15)
    isMentor = models.BooleanField(default=False)
    isMentee = models.BooleanField(default=False)

    def __str__(self) -> str:
        return str(self.accountID)
    
    class Meta:
        app_label = 'accounts'
        db_table = 'accounts'  # specify custom table name