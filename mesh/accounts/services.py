from .models import Account
from django.http import JsonResponse
from django.core.mail import send_mail
import pyotp, bcrypt, json, os

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
    if(not user.enabled2Factor):
        #check if the user has 2fa enabledd generated if not generate one
        user.enabled2Factor = True
        otp_base32 = pyotp.random_base32()
        user.otp_base32 = otp_base32
        user.save()
    else:
        otp_base32 = user.otp_base32
    totp = pyotp.TOTP(otp_base32, interval=60) #for debug, remove after sending email works
    #sending email need authentication
    # send_mail(     
    #     "User OTP",
    #     "the otp: {}".format(pyotp.TOTP(otp_base32, interval=90).now),
    #     os.environ.get("EMAIL_NAME"),
    #     [user.email],
    #     fail_silently=False,
    # )
    print(totp.now())   #for debug. remove after sending email works

def getOTPValidityService(user, otp):
    """
    Verify the OTP
    """
    totp = pyotp.TOTP(user.otp_base32, interval=60)
    if not totp.verify(otp):
        return False
    return True

def getLoginUserService(request):
    """
    Return the user id
    """
    data = json.loads(request.body.decode('utf-8')) 
    email_ = data.get('email', None)
    password = data.get('password', None)
    try:
        user = Account.objects.get(email=email_)
        salt = user.salt
        if user.encryptedPass == decrypt(password, salt):
            return user
        else:
            return None
    except:
        return None