from django.contrib import admin
from .models import *
# Register your models here.
# print(Accounts)
dataBase = [
    userProfile,
    Account
]
admin.site.register(Account)

