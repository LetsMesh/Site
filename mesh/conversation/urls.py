# mesh/conversation/urls.py

from django.urls import path
from .views import *

urlpatterns = [
    # POST /conversations
    path('', ConversationsView.as_view(), name='conversations'),
    # GET /conversation/<int:conversationID>/
    # todo: PATCH & DELETE
    path('<int:conversationID>/', SingleConversationView.as_view(), name='single_conversation'),
    # get conversation's messages with conversation_messages
    path('<int:conversationID>/messages/', conversation_messages, name='conversation_messages'),
]
