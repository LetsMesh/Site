# in accounts folder: urls.py  (accounts.urls)

from django.contrib import admin
from django.urls import path, include
from . import views as accounts_views
from .views import *


urlpatterns = [
    # GET    /api/accounts/ 
    # POST   /api/accounts/
    path('', accounts_views.AccountsView.as_view(), name='account'),
    # GET    /api/accounts/:account_id
    # PATCH  /api/accounts/:account_id
    path('<int:account_id>/', accounts_views.AccountsDetailView.as_view(), name='create_account'), 
    
    path('createAccount',create_account,name = "create"),
    path('checkAccount',check_password, name = "check")
]

