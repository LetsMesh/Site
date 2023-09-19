# in accounts folder: urls.py  (accounts.urls)

from django.contrib import admin
from django.urls import path, include
from . import views as accounts_views
from .views import *


urlpatterns = [
    # GET    /accounts/ 
    # POST   /accounts/
    path('', accounts_views.AccountsView.as_view(), name='account'),
    # GET    /accounts/:account_id
    # PATCH  /accounts/:account_id
    path('<int:account_id>/', accounts_views.SingleAccountView.as_view(), name='create_account'), 
    
    path('createAccount',create_account,name = "create"),
    path('checkAccount',check_password, name = "check")
]

