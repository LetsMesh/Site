from .models import Account
from django.http import JsonResponse
from django.core.mail import send_mail
import pyotp, json

def get_user_services(request):
    """
    Get the account object
    @return: account object if id exist, None otherwise
    """
    try:
        data = json.loads(request.body.decode("utf-8"))
        account_id = data.get("accountID", None)
        account = Account.objects.get(accountID=account_id)
        return account
    except Account.DoesNotExist:
        return None


def post_email_code_service(user):
    """
    Check if the user has OTP(One Time Password) secret key generated
    If it does not exist, random base32 OTP secret key will be generated and saved for this user
    otherwise, use the saved OTP secret key
    @return: no return value
    """
    if not user.is2FAEnabled:
        # check if the user has 2fa enabled, if not generate one
        user.is2FAEnabled = True
        otp_base32 = pyotp.random_base32()
        user.otp_base32 = otp_base32
        user.save()
    else:
        otp_base32 = user.otp_base32
    totp = pyotp.TOTP(
        otp_base32, interval=60
    )  # for debug, remove after sending email works
    # sending email need authentication
    # send_mail(
    #     "User OTP",
    #     "the otp: {}".format(pyotp.TOTP(otp_base32, interval=90).now),
    #     os.environ.get("EMAIL_NAME"),
    #     [user.email],
    #     fail_silently=False,
    # )
    print(totp.now())  # for debug. remove after sending email works


def get_OTP_validity_service(user, otp):
    """
    Verify the One Time Password
    """
    totp = pyotp.TOTP(user.otp_base32, interval=60)
    if not totp.verify(otp, valid_window=1):
        return False
    return True