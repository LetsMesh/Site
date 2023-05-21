from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Accounts
from django.core import serializers
import json

def get_all_accounts(request):
    if request.method == 'GET':
        accounts = Accounts.objects.all()
        accounts_list = serializers.serialize('json', accounts)
        return JsonResponse(accounts_list, safe=False)

@csrf_exempt
def create_account(request):
    if request.method == 'POST':
        data = json.loads(request.body)
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
    if request.method == 'PUT':
        account = Accounts.objects.get(id=account_id)
        data = json.loads(request.body)
        account.email = data.get('email', account.email)
        account.encryptedPass = data.get('encryptedPass', account.encryptedPass)
        account.phoneNum = data.get('phoneNum', account.phoneNum)
        account.displayTheme = data.get('displayTheme', account.displayTheme)
        account.enabled2Factor = data.get('enabled2Factor', account.enabled2Factor)
        account.save()
        return HttpResponse(status=204)
