# in accounts folder: urls.py  (accounts.urls)

from django.contrib import admin
from django.urls import path, include
import views


urlpatterns = [
    # GET    /api/accounts/ 
    path('', views.get_all_accounts, name='get_all_accounts'), 
    # POST   /api/accounts/create/ 
    path('create/', views.create_account, name='create_account'), 
    # PATCH  /api/accounts/update/:account_id
    path('update/<int:account_id>/', views.update_account, name='update_account'), 
]

# urlpatterns = [
#     # GET    /api/accounts will returns all the current accounts
#     # POST   /api/accounts will create accounts
#     path('', views.default, name='default'),
#     # GET    /api/accounts/:id will return the account with that ID if exists, 
#     # PATCH  /api/accounts/:id will update the account with the ID (the update info will be in the request body)
#     path('<int:account_id>/', views.with_id, name='with_id'), 
# ]