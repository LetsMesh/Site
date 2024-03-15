# in accounts folder: (accounts.models) models.py
from django.db import models


class Account(models.Model):
    accountID = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=255, unique=True)

    # please set editable to False after debugging process
    encryptedPass = models.BinaryField(max_length=64, editable=True)
    salt = models.BinaryField(max_length=36, editable=True)
    ###
    phoneNum = models.CharField(max_length=15)
    DISPLAY_THEMES = [
        ("L", "Light"),
        ("D", "Dark"),
    ]
    displayTheme = models.CharField(max_length=1, choices=DISPLAY_THEMES, default="L")
    enabled2Factor = models.BooleanField(default=False)
    isMentor = models.BooleanField(default=False)
    isMentee = models.BooleanField(default=False)
    otp_base32 = models.CharField(max_length=200, null=True)

    def __str__(self) -> str:
        return str(self.accountID)

    class Meta:
        app_label = "accounts"
        db_table = "accounts"  # specify custom table name
