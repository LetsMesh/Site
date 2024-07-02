from django.urls import include, path

from . import views as profile_views

urlpatterns = [
    
    path('<int:account_id>/', include([
        # GET    /profiles/:account-id
        # GET    /profiles/:account-id?fields=
        # PATCH  /profiles/:account-id
        path('', profile_views.ProfileDetailsView.as_view(), name='profile-details'),

        # GET    /profiles/:account-id/profile-picture
        # POST   /profiles/:account-id/profile-picture
        # DELETE /profiles/:account-id/profile-picture
        path('profile-picture/', profile_views.ProfilePicturesView.as_view(), name="profile-picture"),
    ])),
]