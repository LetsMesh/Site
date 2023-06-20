from django.urls import path, include
from . import views as profile_views
from django.http import HttpRequest

urlpatterns = [
    
    # Home Path for Example API 'exampleapi'
    path('biography/', profile_views.biography, name="biography"),
    
]