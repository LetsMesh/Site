from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Accounts
from django.core import serializers
import json
from ..views import validate_data

def get_all_accounts(request):
    if request.method == 'GET':
        accounts = Accounts.objects.all()
        accounts_list = serializers.serialize('json', accounts)
        return JsonResponse(accounts_list, safe=False)

@csrf_exempt
def create_account(request):
    if request.method == 'POST':
        REQUIRED_FIELDS = ['email', 'encryptedPass', 'phoneNum', 'displayTheme', 'enabled2Factor']
        data = validate_data(request.body, REQUIRED_FIELDS)
        account = Accounts.objects.create(
            email = data['email'], 
            encryptedPass = data['encryptedPass'], 
            phoneNum = data['phoneNum'], 
            displayTheme = data['displayTheme'], 
            enabled2Factor = data['enabled2Factor']
        )
        return JsonResponse({'account_id': account.id})

@csrf_exempt
def update_account(request, account_id):
    if request.method == 'PATCH':
        try:
            account = Accounts.objects.get(id = account_id)
        except Accounts.DoesNotExist:
            return HttpResponse(status = 404) # return error if the account_id is not valid
        
        data = validate_data(request.body)
        account.email = data.get('email', account.email)
        account.encryptedPass = data.get('encryptedPass', account.encryptedPass)
        account.phoneNum = data.get('phoneNum', account.phoneNum)
        account.displayTheme = data.get('displayTheme', account.displayTheme)
        account.enabled2Factor = data.get('enabled2Factor', account.enabled2Factor)
        account.save()
        return HttpResponse(status=204)
