from django.urls import path, include
from . import views as profile_views
from django.http import HttpRequest

urlpatterns = [
    
    path('biography', profile_views.bio_view)
]