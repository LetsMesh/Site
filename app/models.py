from django.db import models
from django.contrib.auth.models import User
class Account(models.Model):
    
    LIGHT = "L"; DARK  = "D"

    theme = [
        (LIGHT,"LIGHT"),
        (DARK,"DARK")
    ]
    accountID = models.AutoField(primary_key=True)
    email = models.EmailField()
    encryptedPass = models.CharField(max_length=64)
    displayTheme = models.CharField(max_length= 6, choices= theme)
    
    phoneNum = models.CharField(max_length=15)
    is2FAEnabled = models.BooleanField(default=False)
    isMentee = models.BooleanField()
    isMentor = models.BooleanField()
    
    

class userProfile(models.Model):
    accountID = models.ForeignKey(Account, primary_key=True, on_delete=models.CASCADE)
    userName = models.CharField(max_length= 255)
    preferredName = models.CharField(max_length= 255, null= True)
    preferredPronouns = models.CharField(max_length = 40)
    # image = models.ImageField(upload_to= "image")