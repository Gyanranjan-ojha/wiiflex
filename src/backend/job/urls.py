"""
URL configuration for dqh_admin_app.
"""

from django.urls import path
from job.views import JobsCreate

urlpatterns = [
    #___________________________GET URL paths______________________________

    #____________________________POST URL paths______________________________
    path('create_job/', JobsCreate.as_view(), name='create_job'),
]