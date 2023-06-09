from django.urls import path
from . import views as accounts_views

urlpatterns = [
    
    path('biography', accounts_views.bio_view)
]
