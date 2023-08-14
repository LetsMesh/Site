from django.urls import path
from . import views as profile_views

urlpatterns = [
    
    path('biography', profile_views.bio_view),
    path("profilePicture", profile_views.profile_picture, name="profile_picture"),

    path("profile-picture", profile_views.ProfilePicturesView.as_view(), name="profile-picture")
]
