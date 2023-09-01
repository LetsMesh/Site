from django.urls import path
from . import views as accountsettings_views

urlpatterns = [
    path("displayTheme", accountsettings_views.display_theme, name="display_theme"),

    # GET    /api/settings/:account_id
    # PATCH  /api/settings/:account_id
    path("settings/<int:account_id>", accountsettings_views.showSettings.as_view(), name="settings")
]
