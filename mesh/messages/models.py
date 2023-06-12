from django.db import models

# Create your models here.
class Message(models.Model):
    message_id = models.AutoField(primary_key=True)
    from_account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='messages_from')
    to_account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='messages_to')
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)