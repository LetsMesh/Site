from django.urls import path, include
from . import views as confirmation_views

urlpatterns = [
    
    path('<str:token>/', confirmation_views.email_confirmation, name="email_confirmation"),
    path('error/', confirmation_views.confirmation_error, name="confirmation_error"),
    path('success/', confirmation_views.confirmation_success, name="confirmation_success")
]