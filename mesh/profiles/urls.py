from django.urls import path

from . import views as profile_views

urlpatterns = [
    path("biography", profile_views.bio_view),
    path("profilePicture", profile_views.profile_picture, name="profile_picture"),
    path("userName", profile_views.user_name, name="user_name"),
    path("preferredName", profile_views.preferred_name, name="preferred_name"),
    path("preferredPronouns", profile_views.preferred_pronouns, name="preferred_pronouns"),
]
