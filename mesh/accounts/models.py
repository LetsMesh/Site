from django.db import models

class Account(models.Model):
    accountID = models.AutoField(primary_key=True)
    email = models.EmailField()

    #please set editable to False after debugging process
    encryptedPass = models.BinaryField(max_length=64,editable = True)
    salt = models.BinaryField(max_length = 36,editable = True) 
    ###
    phoneNum = models.CharField(max_length=15)
    isMentee = models.BooleanField()
    isMentor = models.BooleanField()

    def __str__(self) -> str:
        return str(self.accountID)
    
