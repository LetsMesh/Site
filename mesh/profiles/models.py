from django.db import models
from mesh.accounts.models import Account

# Create your models here.

class Profile(models.Model):
    accountID = models.ForeignKey(Account, primary_key=True, on_delete=models.CASCADE)
    userName = models.CharField(max_length= 255)
    preferredName = models.CharField(max_length= 255, null= True)
    preferredPronouns = models.CharField(max_length = 40)
    biography = models.TextField()
    profilePicture = models.ImageField(upload_to = "image")

    def __str__(self):
        return str(self.accountID)