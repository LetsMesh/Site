from django.db import models
from mesh.profiles.models import Profile


# Create your models here.
class Occupation(models.Model):
    occupationID = models.AutoField(primary_key=True)
    occupationName = models.CharField(max_length=255)
    occupationOrganization = models.CharField(max_length=255)

    def __str__(self):
        return str(self.occupationID)


class OccupationBridge(models.Model):
    accountID = models.ForeignKey(Profile, on_delete=models.CASCADE)
    occupationID = models.ForeignKey(Occupation, on_delete=models.CASCADE)
    startDate = models.DateField(null=True, blank=True)
    endDate = models.DateField(null=True, blank=True)
    occupationDescription = models.TextField()
