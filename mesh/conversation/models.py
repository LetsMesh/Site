from django.db import models
from mesh.accounts.models import Account

class Conversation(models.Model):
    class ConversationTypes(models.IntegerChoices):
        DM = 0, "Direct Message"
        GROUP = 1, "Group Conversation"
    conversationID = models.AutoField(primary_key=True)
    conversationType = models.SmallIntegerField(choices=ConversationTypes.choices, default=ConversationTypes.DM)
    conversationName = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.conversationType} {self.conversationType} {self.pk}"

class ConversationParticipant(models.Model):
    conversation = models.ForeignKey(Conversation, related_name='participants', on_delete=models.CASCADE)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)

    def __str__(self):
        return f"Account {self.account} in conversation {self.conversation}"

class Message(models.Model):
    messageID = models.AutoField(primary_key=True)
    conversation = models.ForeignKey(Conversation, related_name='messages', on_delete=models.CASCADE)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.account} in {self.conversation}"
