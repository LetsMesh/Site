from .models import Account
from django.http import JsonResponse
from django.core.mail import send_mail
import pyotp
import bcrypt
import os

def encrypt(password ):
    salt = bcrypt.gensalt(12)

    pepper = os.getenv("PEPPER")

    password = f"{password}{pepper}".encode('utf-8')

    return salt,bcrypt.hashpw(password,salt)

def decrypt(password, salt):
    pepper = os.getenv("PEPPER")
    password = f"{password}{pepper}".encode('utf-8')
    return bcrypt.hashpw(password,salt)


def getUserServices(request):
    """
    Get the account object
    
    @return: account object if id exist, None otherwise
    """
    try:
        data = request.data
        account_id = data.get('accountID', None)
        account = Account.objects.get(accountID = account_id)
        return account
    except Account.DoesNotExist:
        return None


def postEmailCodeService(user):
    """
    Generate the otp code, save the otp_base32 for the user
    Send the code through email

    @return
    """
    otp_base32 = pyotp.random_base32()
    

    user.otp_base32 = otp_base32
    user.save()
    send_mail(
        "User OTP",
        "the otp: {otp_base32}",
        os.environ.get("EMAIL_NAME"),
        [user.objects.get(field_name='email')],
        fail_silently=False,
    )

def getLoginUserService(request):
    """
    Return the user id
    """
    data = request.data
    username = data.get('username', None)
    password = data.get('password', None)
    try:
        user = Account.objects.get(username = username, password = encrypt(password))
        return user
    except:
        return None
