from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('reset', views.password_reset, name="password_reset"),
    path('reset/confirmed',views.password_reset_confirmed, name="password_reset_confirmed")
]