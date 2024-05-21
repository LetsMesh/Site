from django.db import models
from mesh.accounts.models import Account

class Profile(models.Model):
    accountID = models.OneToOneField(Account, primary_key=True, on_delete=models.CASCADE)
    userName = models.CharField(max_length=255)
    preferredName = models.CharField(max_length=255, null=True)
    preferredPronouns = models.CharField(max_length=40)
    biography = models.TextField()
    profilePicture = models.URLField(max_length=200, null=True, blank=True)

    def __str__(self):
        return str(self.accountID)