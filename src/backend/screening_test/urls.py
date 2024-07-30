"""
URL configuration for screening_test.
"""

from django.urls import path
from screening_test.views import (
    CreateScreeningTest,
    AllScreeningTestView,
    GlobalScreeningTestQuestionsView,
    GlobalScreeningTestQuestionsFilterView,
)


urlpatterns = [
    #___________________________GET URL paths______________________________
    path('get_all_screening_test/', AllScreeningTestView.as_view(), name='get_all_screening_test'),
    path('global_screening_test_questions/', GlobalScreeningTestQuestionsView.as_view(), name='global_screening_test_questions'),
    path('filter_questions/', GlobalScreeningTestQuestionsFilterView.as_view(), name='filter_questions'),

    #____________________________POST URL paths______________________________
    path('create_screening_test/', CreateScreeningTest.as_view(), name='create_screening_test'),
]

