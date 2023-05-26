from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('/verifyemail', views.verify_email, name="verify_email")
]