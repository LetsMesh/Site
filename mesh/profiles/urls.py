from django.urls import path

from . import views as profile_views

urlpatterns = [
    path("biography", profile_views.bio_view),
    path("profilePicture", profile_views.ProfilePicturesView.as_view(), name="profile_picture"),
    path("userName", profile_views.UserNamesView.as_view(), name="user_name"),
    path("preferredName", profile_views.PreferredNamesView.as_view(), name="preferred_name"),
    path("preferredPronouns", profile_views.PreferredPronounsView.as_view(), name="preferred_pronouns"),
]
