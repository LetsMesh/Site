from django.urls import path, include
from . import views as profile_views

urlpatterns = [
    
    # GET /profiles/profile-picture
    # POST /profiles/profile-picture
    # PATCH /profiles/profile-picture
    path("profile-picture", profile_views.ProfilePicturesView.as_view(), name="profile-picture"),
    
    # GET    /api/biography/:account_id
    # POST   /api/biography/:account_id
    path('biography/<int:account_id>/', profile_views.BiographyView.as_view(), name='biography'),
    
    # GET /profiles/profile-picture/:account_id
    path("profile-picture/<int:account_id>", profile_views.ProfilePictureDetailsView.as_view(), name="profile-picture-details"),
    
    # GET /profiles/profile-picture/:account_id
    path("user-name/<int:account_id>", profile_views.UserNamesView.as_view(), name="user-name"),
    
    # GET /profiles/profile-picture/:account_id
    path("preferred-name/<int:account_id>", profile_views.PreferredNamesView.as_view(), name="preferred-name"),
    
    # GET /profiles/profile-picture/:account_id
    path("preferred-pronouns/<int:account_id>", profile_views.PreferredPronounsView.as_view(), name="preferred-pronouns"),
]
