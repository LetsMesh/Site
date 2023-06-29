# in accounts folder: (accounts.models) models.py
from django.db import models

class Account(models.Model):
    accountID = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=255, unique=True)
    encryptedPass = models.CharField(max_length=64)
    phoneNum = models.CharField(max_length=15)
    DISPLAY_THEMES = [
        ('L', 'Light'),
        ('D', 'Dark'),
    ]
    displayTheme = models.CharField(max_length=1, choices=DISPLAY_THEMES, default='L')
    enabled2Factor = models.BooleanField(default=False)
    isMentor = models.BooleanField(default=False)
    isMentee = models.BooleanField(default=False)

    def __str__(self) -> str:
        return str(self.accountID)
    
    class Meta:
        app_label = 'accounts'
        db_table = 'accounts'  # specify custom table name