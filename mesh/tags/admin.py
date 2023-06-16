from django.contrib import admin
from .models import TagBridge, Tag
# Register your models here.
admin.site.register((TagBridge, Tag))