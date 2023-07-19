# Generated by Django 4.2.2 on 2023-07-09 23:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Settings',
            fields=[
                ('accountID', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='accounts.account')),
                ('isVerified', models.BooleanField(default=0)),
                ('verificationToken', models.CharField(max_length=35, null=True)),
                ('hasContentFilterEnabled', models.BooleanField(default=0)),
                ('displayTheme', models.CharField(choices=[('0', 'Light'), ('1', 'Dark')], default='0', max_length=1)),
                ('is2FAEnabled', models.BooleanField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='BlockedAccountBridge',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('blockedAccountID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blocked', to='accounts.account')),
                ('blockerAccountID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blocker', to='accounts.account')),
            ],
            options={
                'verbose_name_plural': 'Blocked Account Bridges',
            },
        ),
        migrations.AddConstraint(
            model_name='blockedaccountbridge',
            constraint=models.UniqueConstraint(fields=('blockerAccountID', 'blockedAccountID'), name='unique blocked account'),
        ),
        migrations.AddConstraint(
            model_name='blockedaccountbridge',
            constraint=models.CheckConstraint(check=models.Q(('blockerAccountID_id', models.F('blockedAccountID_id')), _negated=True), name='different blocked accounts'),
        ),
    ]
