from django.urls import path, include
from .views import *
urlpatterns = [
    path('createAccount',account,name = "create"),
    path('checkAccount',checkpassword, name = "check")
]