from django.urls import path

from . import views as profile_views

urlpatterns = [
    path("biography", profile_views.bio_view),
    path("profile-picture", profile_views.ProfilePicturesView.as_view(), name="profile-picture"),
    path("user-name", profile_views.UserNamesView.as_view(), name="user-name"),
    path("preferred-name", profile_views.PreferredNamesView.as_view(), name="preferred-name"),
    path("preferred-pronouns", profile_views.PreferredPronounsView.as_view(), name="preferred-pronouns"),
]
