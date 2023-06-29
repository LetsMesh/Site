from django.contrib import admin
from .models import Settings, BlockedAccountBridge

# Register your models here.
admin.site.register([Settings, BlockedAccountBridge])
