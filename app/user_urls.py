from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('reset/confirmed',views.password_reset_confirmed, name="password_reset_confirmed")
]