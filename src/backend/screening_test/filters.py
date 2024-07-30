from django_filters import FilterSet, CharFilter

from screening_test.models import GlobalScreeningTestQuestions


class GlobalScreeningTestQuestionsFilter(FilterSet):
    question = CharFilter(lookup_expr='icontains')

    class Meta:
        model = GlobalScreeningTestQuestions
        fields = ['question']
