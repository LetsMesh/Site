from django.urls import path
from . import views as tag_views

urlpatterns = [
    
    # Get User tags 
    path('', tag_views.user_tags, name="user_tags"),
]