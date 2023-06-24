# in accounts folder: urls.py  (accounts.urls)

from django.contrib import admin
from django.urls import path, include
from . import views as accounts_views

urlpatterns = [
    # GET    /api/accounts/ 
    # POST   /api/accounts/
    path('', accounts_views.AccountView.as_view(), name='account'),
    # GET    /api/accounts/:account_id
    # PATCH  /api/accounts/:account_id
    path('<int:account_id>/', accounts_views.AccountDetailView.as_view(), name='create_account'), 
]