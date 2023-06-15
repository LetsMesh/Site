from django.urls import path, include
from . import views as confirmation_views

urlpatterns = [
    
    path('<str:token>/', confirmation_views.email_confirmation, name="email_confirmation"),
]