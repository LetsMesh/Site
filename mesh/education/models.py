from django.db import models

from mesh.profiles.models import Profile


# Create your models here.
class Education(models.Model):
    educationID = models.AutoField(primary_key=True)
    degreeName = models.CharField(max_length=255)
    collegeName = models.CharField(max_length=255)

    def __str__(self):
        return str(self.educationID)


class EducationBridge(models.Model):
    accountID = models.ForeignKey(Profile, on_delete=models.CASCADE)
    educationID = models.ForeignKey(Education, on_delete=models.CASCADE)
    educationStartDate = models.DateField(null=True, blank=True)
    educationEndDate = models.DateField(null=True, blank=True)
    educationDescription = models.TextField(null=True, blank=True)
