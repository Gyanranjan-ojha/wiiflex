"""
URL configuration for company.
"""

from django.urls import path
from company.views import AllCompanyUsersAPIView


urlpatterns = [
    #___________________________GET URL paths______________________________
    path('all_company_users/', AllCompanyUsersAPIView.as_view(), name='all_company_users'),
    #____________________________POST URL paths______________________________
]

