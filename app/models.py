from django.db import models

# Create your models here.
class Account(models.Model):
    email = models.CharField(max_length=255)
    encryptedPass = models.CharField(max_length=255)
    displayTheme = models.IntegerField()
    phoneNum = models.CharField(max_length=20, blank=True, null=True)
    enable2Factor = models.BooleanField()
    isMentee = models.BooleanField()
    isMentor = models.BooleanField()

    def __str__(self):
        return self.email

class Message(models.Model):
    fromAccount = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='send')
    toAccount = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='received_messages')
    message = models.TextField()
    timestamp = models.DateTimeField()

    def __str__(self):
        return self.message