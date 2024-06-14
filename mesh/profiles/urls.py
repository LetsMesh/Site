from django.urls import re_path, path

from . import views as profile_views

urlpatterns = [
    
    # GET /profiles/:account-id/profile-picture
    # POST /profiles/:account-id/profile-picture
    # PATCH /profiles/:account-id/profile-picture
    # DELETE /profiles/:account-id/profile-picture
    path('<int:account_id>/profile-picture/', profile_views.ProfilePicturesView.as_view(), name="profile-picture"),

    # GET    /profiles/:account-id
    # GET    /profiles/:account-id?fields=
    # PATCH  /profiles/:account-id
    path('<int:account_id>/', profile_views.ProfileDetailsView.as_view(), name='profile-details'),
]