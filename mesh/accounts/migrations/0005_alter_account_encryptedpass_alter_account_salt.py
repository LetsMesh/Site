# Generated by Django 4.2.2 on 2023-06-22 15:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_account_salt'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='encryptedPass',
            field=models.BinaryField(max_length=64),
        ),
        migrations.AlterField(
            model_name='account',
            name='salt',
            field=models.BinaryField(max_length=36),
        ),
    ]
