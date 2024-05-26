from django.db import models
from accounts.models import User

class CompanyDetails(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True, null=True, blank=True)
    size = models.IntegerField(default=0)
    website = models.URLField(max_length=200, null=True, blank=True)
    phone = models.CharField(max_length=15, unique=True, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    state = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        app_label = 'company'
        verbose_name_plural = 'company Details'
        db_table = 'company_details'

class UserCompanyAssociation(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_column="user_id")
    company = models.ForeignKey(CompanyDetails, on_delete=models.CASCADE, db_column="company_id")

    def __str__(self):
        return f"{self.user}, {self.company}"

    class Meta:
        app_label = 'company'
        verbose_name_plural = 'user Company Associations'
        db_table = 'user_company_association'
        unique_together = ('user', 'company')