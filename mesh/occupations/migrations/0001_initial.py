# Generated by Django 4.2.2 on 2023-08-08 05:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Occupation',
            fields=[
                ('occupationID', models.AutoField(primary_key=True, serialize=False)),
                ('occupationName', models.CharField(max_length=255)),
                ('occupationOrganization', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='OccupationBridge',
            fields=[
                ('accountID', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='profiles.profile')),
                ('occupationDescription', models.TextField()),
                ('occupationID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='occupations.occupation')),
            ],
        ),
    ]
