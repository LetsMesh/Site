from django.urls import path
from . import views as tag_views

urlpatterns = [
    
    # Default path
    path('', tag_views.test_endpoint, name="test_endpoint"),
    
    # Get User tags 
    path('usertags/', tag_views.user_tags, name="user_tags")
]