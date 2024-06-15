from django.urls import path, include
from . import views as confirmation_views

urlpatterns = [
    path('<str:user_email>/', include([
        path('', confirmation_views.email_confirmation, name="email_confirmation"),
        path('<str:url_token>/', confirmation_views.confirm_token, name="confirm_token"),
    ])),
]