from django.urls import path
from . import views as accountsettings_views

urlpatterns = [
    path("displayTheme", accountsettings_views.display_theme, name="display_theme")
]
