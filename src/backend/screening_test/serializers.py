from rest_framework import serializers

from job.serializers import JobSerializer
from screening_test.models import ScreeningTestDetails, ScreeningTestQuestions, GlobalScreeningTestQuestions


class ScreeningTestQuestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScreeningTestQuestions
        fields = ['question_type', 'question', 'options', 'answer']

class ScreeningTestDetailsSerializer(serializers.ModelSerializer):
    job = JobSerializer()
    questions = serializers.SerializerMethodField()

    class Meta:
        model = ScreeningTestDetails
        fields = ['id', 'name', 'job', 'questions']

    def get_questions(self, obj):
        questions = ScreeningTestQuestions.objects.filter(screening_test=obj)
        return ScreeningTestQuestionsSerializer(questions, many=True).data

class GlobalScreeningTestQuestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlobalScreeningTestQuestions
        fields = ['question']