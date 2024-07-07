from django.urls import path
from . import views as tag_views

urlpatterns = [
    # GET   /tags/:account_id - get tags from account with id account_id
    # POST  /tags/:account_id - store tags to account with id account_id
    path('<int:account_id>/', tag_views.TagsDetailView.as_view(), name='user_tags'),
]
