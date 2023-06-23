from django.db import models

from mesh.profiles.models import Profile


# Create your models here.
class Occupation(models.Model):
    educationID = models.AutoField(primary_key=True)
    degreeName = models.CharField(max_length=255)
    collegeName = models.CharField(max_length=255)
    optionalDescription = models.TextField()

    def __str__(self):
        return str(self.educationID)


class OccupationBridge(models.Model):
    accountID = models.OneToOneField(Profile, primary_key=True, on_delete=models.CASCADE)
    educationID = models.OneToOneField(Occupation, on_delete=models.CASCADE)
