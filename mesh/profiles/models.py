from django.db import models
from mesh.accounts.models import Account
# Create your models here.
print(str(Account))
class Profile(models.Model):
    accountID = models.OneToOneField(Account, primary_key=True, on_delete=models.CASCADE)
    userName = models.CharField(max_length= 255)
    preferredName = models.CharField(max_length= 255, null= True)
    preferredPronouns = models.CharField(max_length = 40)
    biography = models.TextField()
    image = models.ImageField(upload_to = "image")
    
    def __str__(self):
        return str(self.accountID)