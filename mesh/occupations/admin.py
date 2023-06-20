from django.contrib import admin
from .models import Occupation, OccupationBridge
# Register your models here.
admin.site.register((Occupation, OccupationBridge))