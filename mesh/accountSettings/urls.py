from django.urls import path
from . import views as accountsettings_views

urlpatterns = [
    path("displayTheme", accountsettings_views.display_theme, name="display_theme"),
    path("", accountsettings_views.SettingsView.as_view(), name = "settings"),
    path("<int:account_id>/", accountsettings_views.SettingsDetailView.as_view(), name = "specific_settings"),
]
