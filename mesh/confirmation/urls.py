from django.urls import path, include
from . import views as confirmation_views

urlpatterns = [
    path('<str:user_email>/', confirmation_views.email_confirmation, name="email_confirmation"),
    path('<str:user_email>/<str:url_token>/', confirmation_views.confirm_token, name="confirm_token"),
]