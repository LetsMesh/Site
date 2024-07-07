'''
Author: Jack | blu3eee
This migrate script is migrating from the old Message model in the schema to the new one
with Conversation and ConversationParticipant to allow group messages
'''

from django.db import migrations, models
import django.db.models.deletion
from mesh.accounts.models import Account
from mesh.conversation.models import Message, Conversation

def populate_conversation_and_account(apps, schema_editor):

    for message in Message.objects.all():
        from_account = message.from_account
        to_account = message.to_account

        # Find or create a conversation between from_account and to_account
        conversation, _ = Conversation.objects.get_or_create(
            conversationType=Conversation.ConversationTypes.DM,
            defaults={'conversationName': None}
        )
        conversation.participants.add(from_account, to_account)

        # Update the message
        message.conversation = conversation
        message.account = from_account
        message.save()

class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_account_last_login'),
        ('conversation', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Conversation',
            fields=[
                ('conversationID', models.AutoField(primary_key=True, serialize=False)),
                ('conversationType', models.SmallIntegerField(choices=[(0, 'Direct Message'), (1, 'Group Conversation')], default=0)),
                ('conversationName', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ConversationParticipant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.account')),
                ('conversation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='participants', to='conversation.conversation')),
            ],
        ),
        migrations.AddField(
            model_name='message',
            name='account',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='accounts.account'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='message',
            name='conversation',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='messages', to='conversation.conversation'),
            preserve_default=False,
        ),
        migrations.RunPython(populate_conversation_and_account, reverse_code=migrations.RunPython.noop),
        migrations.RemoveField(
            model_name='message',
            name='from_account',
        ),
        migrations.RemoveField(
            model_name='message',
            name='to_account',
        ),
    ]