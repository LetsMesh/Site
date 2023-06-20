from django.db import models
from mesh.accounts.models import Account

# Create your models here.

class Notification(models.Model):
    accountID = models.ForeignKey(Account, on_delete=models.CASCADE)
    notificationID = models.AutoField(primary_key=True)
    timeStamp = models.TimeField()
    notificationContextJSON = models.JSONField()
    