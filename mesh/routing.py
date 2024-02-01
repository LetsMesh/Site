# mesh/routing.py

from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from mesh.conversation import consumers  # Import your WebSocket consumer

websocket_urlpatterns = [
    path('ws/chat/<int:conversation_id>/', consumers.ChatConsumer.as_asgi()),
]
