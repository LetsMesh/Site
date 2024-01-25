from django.urls import path
from . import views

urlpatterns = [
    path('', views.create_message, name='create_message'),
    path('<int:message_id>/', views.MessageView.as_view(), name='single_message_view'),
    path('conversation/<int:account1_id>/<int:account2_id>/', views.get_conversation, name='get_conversation'),
    path('conversations/<int:account_id>/', views.get_account_conversations, name='get_account_conversations'),
]
