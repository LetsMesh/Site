from django.urls import path

from . import views as profile_views

urlpatterns = [
    path("biography", profile_views.bio_view),
    path("profile-picture/<int:account_id>", profile_views.ProfilePicturesView.as_view(), name="profile-picture"),
    path("user-name/<int:account_id>", profile_views.UserNamesView.as_view(), name="user-name"),
    path("preferred-name/<int:account_id>", profile_views.PreferredNamesView.as_view(), name="preferred-name"),
    path("preferred-pronouns/<int:account_id>", profile_views.PreferredPronounsView.as_view(), name="preferred-pronouns"),
]
