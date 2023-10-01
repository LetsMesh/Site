from .models import Account
from django.http import JsonResponse
from django.core.mail import send_mail
import pyotp, bcrypt, json, os

def encrypt(password ):
    salt = bcrypt.gensalt(12)

    pepper = os.getenv("PEPPER")

    password = f"{password}{pepper}".encode('utf-8')

    return salt,bcrypt.hashpw(password,salt)

def getUserServices(request):
    """
    Get the account object
    
    @return: account object if id exist, None otherwise
    """
    try:
        data = json.loads(request.body.decode('utf-8')) 
        account_id = data.get('accountID', None)
        account = Account.objects.get(accountID=account_id)
        return account
    except Account.DoesNotExist:
        return None


def postEmailCodeService(user):
    """
    Check if the user has otp seed generated
    If it does not exist, random base32 otp seed will be generated and saved for this user
    otherwise, use the saved otp seed

    @return
    no return value
    """
    if(user.otp_base32 == ''):
        #check if the user has otp seed generated if not generate one
        otp_base32 = pyotp.random_base32()
        user.otp_base32 = otp_base32
        user.save()
    else:
        otp_base32 = user.otp_base32
    totp = pyotp.TOTP(otp_base32, interval=30) #for debug, remove after confirming totp works
    #sending email need authentication
    #send_mail(     
    #    "User OTP",
    #    "the otp: {}".format(pyotp.TOTP(otp_base32, interval=30).now),
    #    os.environ.get("EMAIL_NAME"),
    #    [user.email],
    #    fail_silently=False,
    #)
    print(totp.now())   #for debug. remove after sending email works

def getOTPValidityService(user, otp):
    """
    Verify the OTP
    """
    totp = pyotp.TOTP(user.otp_base32)
    if not totp.verify(otp):
        return False
    return True

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
