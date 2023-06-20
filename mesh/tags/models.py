from django.db import models
from mesh.accounts.models import Account

# Create your models here.
class Tag(models.Model):
    tagID = models.AutoField(primary_key=True)
    tagName = models.CharField(max_length=255)
    isDefault = models.BooleanField()

class TagBridge(models.Model):
    tagID = models.ForeignKey(primary_key=True)
    accountID = models.ForeignKey(Account, primary_key=True, on_delete=models.CASCADE)