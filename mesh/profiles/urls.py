from django.urls import path, include
from . import views as profile_views

urlpatterns = [
    # GET    /api/biography/:account_id
    # POST   /api/biography/:account_id
    path('biography/<int:account_id>/', profile_views.BiographyView.as_view(), name='biography'),
    path("profile-picture/<int:account_id>", profile_views.ProfilePicturesView.as_view(), name="profile-picture"),
    path("user-name/<int:account_id>", profile_views.UserNamesView.as_view(), name="user-name"),
    path("preferred-name/<int:account_id>", profile_views.PreferredNamesView.as_view(), name="preferred-name"),
    path("preferred-pronouns/<int:account_id>", profile_views.PreferredPronounsView.as_view(), name="preferred-pronouns"),
]
