# Generated by Django 4.2.2 on 2023-07-25 05:31

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
                ('occupationTag', models.CharField(max_length=255)),
                ('occupationDescriptor', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='OccupationBridge',
            fields=[
                ('accountID', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='profiles.profile')),
                ('occupationID', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='occupations.occupation')),
            ],
        ),
    ]
