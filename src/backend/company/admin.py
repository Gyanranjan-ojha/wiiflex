from django.contrib import admin
from company.models import CompanyDetails, UserCompanyAssociation

@admin.register(CompanyDetails)
class CompanyDetailsAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "size", "website", "phone", "city", "state", "country", "created_at"]
    search_fields = ["name", "city", "state", "country"]
    ordering = ['created_at']

@admin.register(UserCompanyAssociation)
class UserCompanyAssociationAdmin(admin.ModelAdmin):
    list_display = ['user', 'company']
    search_fields = ['user', 'company']