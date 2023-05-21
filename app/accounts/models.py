# in accounts folder: (accounts.models) models.py
from django.db import models

class Accounts(models.Model):
    email = models.EmailField(max_length=255, unique=True)
    encryptedPass = models.CharField(max_length=255)
    phoneNum = models.CharField(max_length=15)
    DISPLAY_THEMES = [
        ('L', 'Light'),
        ('D', 'Dark'),
    ]
    displayTheme = models.CharField(max_length=1, choices=DISPLAY_THEMES, default='L')
    enabled2Factor = models.BooleanField(default=False)
