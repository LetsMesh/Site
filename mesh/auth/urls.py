# in auth folder: urls.py  (auth.urls)

from django.urls import path
from .views import *

urlpatterns = [
    # POST   /auth/login/ - login with email and password
    path('login/', login_view, name='login'),
    # POST    /auth/logout/ - logout of the current session
    path('logout/', logout_view, name='logout'),
    # GET    /auth/session/ - get the current session if there is one
    path('session/', session_view, name='session'),
]