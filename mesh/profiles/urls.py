from django.urls import path
from . import views as profile_views

urlpatterns = [
    
    path('biography', profile_views.bio_view)
]
