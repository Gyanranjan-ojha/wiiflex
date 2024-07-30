"""
URL configuration for candidates.
"""

from django.urls import path
from candidates.views import (
    CreateCandidateAPIView,
    CandidatesRetrieveAPIView,
    CandidateUpdateAPIView,
    CandidateDeleteAPIView
)


urlpatterns = [
    #___________________________ GET URL paths ______________________________
    path('get_candidate/', CandidatesRetrieveAPIView.as_view(), name='get_candidate'),
    # recruiter or agent email or candidate id in query param
    
    #____________________________ POST URL paths ______________________________
    path('create_candidate/', CreateCandidateAPIView.as_view(), name='create_candidate'),
    
    #____________________________ PUT URL paths ______________________________
    path('update_candidate/', CandidateUpdateAPIView.as_view(), name='update_candidate'),
    
    #____________________________ DELETE URL paths ______________________________
    path('delete_candidate/', CandidateDeleteAPIView.as_view(), name='delete_candidate'),
]

