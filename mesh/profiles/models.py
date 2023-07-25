from django.db import models
from mesh.accounts.models import Account
import secrets
import os

# Updates file name and path to file, to prevent users from being
# able to go to .../media/image/example_file.png and see anyone's profile picture
def path_and_rename(profile_instance, file_name):
    
    # File path to upload to, so this leads to media\image
    upload_to = "image"

    # Get the file's extension, ex: jpg/png
    file_extension = file_name.split(".")[-1]

    # Use url_safe string along with user pk to ensure no collisions
    random_string = secrets.token_urlsafe(8) + "_" +str(profile_instance.pk)

    file_name = '{}.{}'.format(random_string, file_extension)
    
    return os.path.join(upload_to, file_name)

class Profile(models.Model):
    accountID = models.ForeignKey(Account, primary_key=True, on_delete=models.CASCADE)
    userName = models.CharField(max_length= 255)
    preferredName = models.CharField(max_length= 255, null= True)
    preferredPronouns = models.CharField(max_length = 40)
    biography = models.TextField()
    image = models.ImageField(upload_to = path_and_rename, null = True, blank = True)

    def __str__(self):
        return str(self.accountID)