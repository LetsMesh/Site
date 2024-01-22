# in accounts folder: urls.py  (accounts.urls)

from django.contrib import admin
from django.urls import path, include
from . import views as accounts_views
from .views import *
from ..exampleapi import views as exampleapi_views


urlpatterns = [
    # ... other URL patterns
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
]

