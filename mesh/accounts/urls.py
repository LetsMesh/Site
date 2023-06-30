from django.urls import path, include
from .views import *

urlpatterns = [
    path('createAccount',create_account,name = "create"),
    path('checkAccount',check_password, name = "check")
]

