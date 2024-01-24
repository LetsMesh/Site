# in auth folder: urls.py  (auth.urls)

from django.urls import path
from .views import *

urlpatterns = [
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('session/', session_view, name='session'),
]