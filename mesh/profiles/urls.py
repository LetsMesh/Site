from django.urls import path, include
from . import views as profile_views
from django.http import HttpRequest
from .views import *

urlpatterns = [
    # GET    /api/biography/:account_id
    # POST   /api/biography/:account_id
    path('biography/<int:account_id>/', profile_views.BiographyView.as_view(), name='biography'),

    path("profilePicture", profile_views.profile_picture, name="profile_picture")
]
