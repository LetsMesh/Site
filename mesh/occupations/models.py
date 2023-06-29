from django.db import models

from mesh.profiles.models import Profile


# Create your models here.
class Occupation(models.Model):
    occupationID = models.AutoField(primary_key=True)
    occupationName = models.CharField(max_length=255)
    occupationTag = models.CharField(max_length=255)
    occupationDescriptor = models.TextField()

    def __str__(self):
        return str(self.occupationID)


class OccupationBridge(models.Model):
    accountID = models.OneToOneField(Profile, primary_key=True, on_delete=models.CASCADE)
    occupationID = models.OneToOneField(Occupation, on_delete=models.CASCADE)
