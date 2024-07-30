"""
URL configuration for job.
"""

from django.urls import path
from job.views import (
    JobsCreateAPIView,
    JobsFetchAPIView,
    ParticularJobFetchAPIView,
    CandidateRecommendationView,
)

urlpatterns = [
    #___________________________GET URL paths______________________________
    path('get_jobs/', JobsFetchAPIView.as_view(), name='get_jobs'),
    path('get_particular_job/', ParticularJobFetchAPIView.as_view(), name='get_particular_job'),
    path('candidate_recommendations/', CandidateRecommendationView.as_view(), name='candidate_recommendations'),

    #____________________________POST URL paths______________________________
    path('create_job/', JobsCreateAPIView.as_view(), name='create_job'),
]