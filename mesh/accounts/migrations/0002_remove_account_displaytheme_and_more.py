# Generated by Django 4.2.5 on 2023-12-21 05:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='displayTheme',
        ),
        migrations.RemoveField(
            model_name='account',
            name='enabled2Factor',
        ),
    ]