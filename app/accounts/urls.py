# in accounts folder: urls.py  (accounts.urls)

from django.contrib import admin
from django.urls import path, include
import views

urlpatterns = [
    path('', views.get_all_accounts, name='get_all_accounts'),
    path('create/', views.create_account, name='create_account'),
    path('update/<int:account_id>/', views.update_account, name='update_account'),
]