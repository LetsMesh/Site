from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.utils.decorators import method_decorator
from django.views import View

from .models import Accounts
from ..utils.validate_data import validate_data
from ..middlewares.exceptions import CustomException
import json

@method_decorator(csrf_exempt, name='dispatch')
class AccountView(View):
    def get(self, request, *args, **kwargs):
        print('request get all accounts')
        accounts = Accounts.objects.all()
        accounts_list = serializers.serialize('json', accounts)
        return JsonResponse(accounts_list, safe=False)

    def post(self, request, *args, **kwargs):
        REQUIRED_FIELDS = ['email', 'encryptedPass', 'phoneNum', 'displayTheme', 'enabled2Factor', 'isMentor', 'isMentee']
        data = validate_data(request.body, REQUIRED_FIELDS)
        account = Accounts.objects.create(
            email = data['email'], 
            encryptedPass = data['encryptedPass'], 
            phoneNum = data['phoneNum'], 
            displayTheme = data['displayTheme'], 
            enabled2Factor = data['enabled2Factor'],
            isMentor = data['isMentor'],
            isMentee = data['isMentee']
        )
        return JsonResponse({'account_id': account.id}, status=201)  # Return a 201 status code

@method_decorator(csrf_exempt, name='dispatch')
class AccountDetailView(View):

    def get(self, request, account_id, *args, **kwargs):
        try:
            account = Accounts.objects.get(id=account_id)
            account_detail = serializers.serialize('json', [account])
            return JsonResponse(account_detail, safe=False)
        except Accounts.DoesNotExist:
            return JsonResponse({'error': 'Account does not exist'}, status=404)

    def patch(self, request, account_id, *args, **kwargs):
        try:
            account = Accounts.objects.get(id=account_id)
        except Accounts.DoesNotExist:
            return JsonResponse({'error': 'Account does not exist'}, status=404)

        data = json.loads(request.body)
        account.email = data.get('email', account.email)
        account.encryptedPass = data.get('encryptedPass', account.encryptedPass)
        account.phoneNum = data.get('phoneNum', account.phoneNum)
        account.displayTheme = data.get('displayTheme', account.displayTheme)
        account.enabled2Factor = data.get('enabled2Factor', account.enabled2Factor)
        account.isMentor = data.get('isMentor', account.isMentor)
        account.isMentee = data.get('isMentee', account.isMentee)
        account.save()
        return HttpResponse(status=204)