# mesh/conversation/urls.py

from django.urls import path
from .views import *

urlpatterns = [
    path('', ConversationsView.as_view(), name='conversations'),
    path('<int:conversation_id>/messages/', conversation_messages, name='conversation_messages'),
    path('<int:conversation_id>/participants/', ConversationParticipantsView.as_view(), name='conversation_participants'),
]
