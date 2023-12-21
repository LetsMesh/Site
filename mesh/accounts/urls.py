# in accounts folder: urls.py  (accounts.urls)

from django.contrib import admin
from django.urls import path, include
from . import views as accounts_views
from .views import *
from ..exampleapi import views as exampleapi_views


urlpatterns = [
    # GET    /accounts/ - get all the accounts 
    # POST   /accounts/ - create an account
    path('', accounts_views.AccountsView.as_view(), name='accounts'),
    # GET    /accounts/:account_id - get account with id account_id
    # PATCH  /accounts/:account_id - update (patch) account with id account_id
    # DELETE  /accounts/:account_id - delete account with id account_id
    path('<int:account_id>/', accounts_views.SingleAccountView.as_view(), name='single_account'), 
    
    path('checkAccount',check_password, name = "check")
]

