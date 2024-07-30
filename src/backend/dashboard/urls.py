"""
URL configuration for dashboard.
"""

from django.urls import path
from dashboard.views import (
    JobScreeningTestAPI,
    AdminDashboardAPIView
)
from job.views import AllJobsAPIView
from candidates.views import AllCandidatesAPIView
from company.views import AllCompanyJobsAPIView

urlpatterns = [
    #___________________________GET URL paths______________________________
    path('get_jobs_screen_tests/', JobScreeningTestAPI.as_view(), name='get_jobs_screen_tests'),
    path('get_admin_data/', AdminDashboardAPIView.as_view(), name='get_admin_data'),# admin
    path('get_all_jobs/', AllJobsAPIView.as_view(), name='all_jobs'),# admin
    path('get_all_companies/', AllCompanyJobsAPIView.as_view(), name='all_companies'),# admin
    path('get_all_candidates/', AllCandidatesAPIView.as_view(), name='all_candidates'),# admin
    
    #____________________________POST URL paths______________________________
]

