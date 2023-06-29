from django.db import models
from mesh.accounts.models import Account

# Create your models here.
from django.db import models

class Message(models.Model):
    messageID = models.AutoField(primary_key=True)
    from_account = models.OneToOneField(Account, unique = True, on_delete=models.CASCADE, related_name='message_from')
    to_account = models.OneToOneField(Account, unique = True, on_delete=models.CASCADE, related_name='message_to')
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)


    def __str__(self) -> str:
        return str(self.messageID)
