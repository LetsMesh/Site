from django.urls import path
from . import views as tag_view

urlpatterns = [

    path('', tag_view.TagsView.as_view(), name='tag'),
]