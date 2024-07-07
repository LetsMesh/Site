# in accounts folder: urls.py  (accounts.urls)

from django.urls import path
from . import views as accounts_views
from .views import *
from ..conversation.views import get_account_conversations

urlpatterns = [
    # GET    /accounts/ - get all the accounts 
    # POST   /accounts/ - create an account
    path('', accounts_views.AccountsView.as_view(), name='accounts'),
    # GET    /accounts/:account_id - get account with id account_id
    # PATCH  /accounts/:account_id - update (patch) account with id account_id
    # DELETE /accounts/:account_id - delete account with id account_id
    path('<int:account_id>/', accounts_views.SingleAccountView.as_view(), name='single_account'),
    path('<int:account_id>/conversations/', get_account_conversations, name='account_conversations'),
    # PATCH  /accounts/change-password - update account password
    path('change-password/', change_password, name = "change_password"),
    # POST   /accounts/check-password
    path('check-password/', check_password, name = "check_password"),
    # OAuth paths
    path("set-two-factor-auth/", accounts_views.Set2FAView.as_view()),
    path("verify-two-factor-auth/", accounts_views.Verify2FAView.as_view())
]

