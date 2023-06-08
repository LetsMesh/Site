from django.urls import path, include
from . import views as exampleapi_views

urlpatterns = [
    
    # Home Path for Example API 'exampleapi'
    path('', exampleapi_views.index, name="index"),
    
    # Hello World Example
    path('helloworld/', exampleapi_views.hello_world, name="helloworld")
]