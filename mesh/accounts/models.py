from django.db import models

class Account(models.Model):
    accountID = models.AutoField(primary_key=True)
    email = models.EmailField()
    encryptedPass = models.CharField(max_length=64)
    
    phoneNum = models.CharField(max_length=15)
    isMentee = models.BooleanField()
    isMentor = models.BooleanField()

    def __str__(self) -> str:
        return self.accountID
    
