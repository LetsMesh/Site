from django.urls import path
from . import views as occupation_views

urlpatterns = [
    
    path('', occupation_views.occupation, name="occupation")
]