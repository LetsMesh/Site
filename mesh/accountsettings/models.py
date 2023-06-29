from django.db import models
from mesh.accounts.models import Account
from django.utils.translation import gettext as _
from django.db.models import Q

class Settings(models.Model):

    class Themes(models.TextChoices):
        LIGHT = '0', _('Light')
        DARK = '1', _('Dark')

    accountID = models.OneToOneField(Account, primary_key=True, on_delete=models.CASCADE)
    isVerified = models.BooleanField(default=0)
    verificationToken = models.CharField(max_length=35, null=True)
    hasContentFilterEnabled = models.BooleanField(default=0)
    displayTheme = models.CharField(choices=Themes.choices, default=Themes.LIGHT, max_length=1)
    is2FAEnabled = models.BooleanField(default=0)

    def __str__(self) -> str:
        return str(self.accountID)

class BlockedAccountBridge(models.Model):

    class Meta:

        constraints = [
            models.UniqueConstraint(
                fields=['blockerAccountID', 'blockedAccountID'],
                name='unique blocked account'
            ),
            models.CheckConstraint(
                check=~Q(blockerAccountID_id=models.F('blockedAccountID_id')),
                name='different blocked accounts'
            )
        ]

        verbose_name_plural = 'Blocked Account Bridges'

    blockerAccountID = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='blocker')
    blockedAccountID = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='blocked')

    def __str__(self) -> str:
        return f"self.blockerAccountID, self.blockedAccountID"