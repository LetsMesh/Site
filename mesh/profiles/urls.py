<<<<<<< HEAD
from django.urls import path, include
from . import views as profile_views
from django.http import HttpRequest
=======
from django.urls import path
from . import views as profile_views
>>>>>>> dev_new

urlpatterns = [
    
    path('biography', profile_views.bio_view)
<<<<<<< HEAD
]
=======
]
>>>>>>> dev_new
