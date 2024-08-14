# mesh/conversation/urls.py

from django.urls import path, include
from .views import *

urlpatterns = [
    # POST /conversations
    path('', ConversationsView.as_view(), name='conversations'),
    path('<int:conversationID>/', include([
        # GET /conversation/<int:conversationID>/
        # todo: PATCH & DELETE
        path('', SingleConversationView.as_view(), name='single_conversation'),
        # get conversation's messages with conversation_messages
        path('messages/', conversation_messages, name='conversation_messages'),
    ])),
]
