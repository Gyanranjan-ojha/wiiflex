from django.db import models
from django.contrib.auth.models import AbstractUser
from accounts.auth.user_manager import UserManager
import uuid


class User(AbstractUser):
    username = None
    date_joined = None
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    phone = models.CharField(max_length=15, unique=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    agree_terms = models.BooleanField(default=False, null=True, blank=True)
    is_admin = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = UserManager()

    def __str__(self):
        return str(self.email) or ''

    class Meta:
        app_label = 'accounts'
        verbose_name_plural = 'users'
        db_table = 'users'

class EmailVerificationToken(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user

    class Meta:
        app_label = 'accounts'
        verbose_name_plural = 'email Verifications'
        db_table = 'email_verifications'