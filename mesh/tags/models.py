from django.db import models
from mesh.accounts.models import Account

# Create your models here.
class Tag(models.Model):
    tagID = models.AutoField(primary_key=True)
    tagName = models.CharField(max_length=255)
    isDefault = models.BooleanField()

class TagBridge(models.Model):
    class Meta:
         constraints = [
             models.UniqueConstraint(fields=['tagID', 'accountID'], name='tag_account_composite')
         ]
    tagID = models.OneToOneField(Tag, on_delete=models.CASCADE)
    accountID = models.ForeignKey(Account, on_delete=models.CASCADE)