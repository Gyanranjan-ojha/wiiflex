from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.db import transaction
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from job.models import JobDetails
from screening_test.models import ScreeningTestDetails, ScreeningTestQuestions, GlobalScreeningTestQuestions
from screening_test.filters import GlobalScreeningTestQuestionsFilter
from screening_test.serializers import ScreeningTestDetailsSerializer, GlobalScreeningTestQuestionsSerializer


class CreateScreeningTest(APIView):
    """This view allows users to create their screening test for jobs."""
    permission_classes = [AllowAny]

    @transaction.atomic
    def post(self, request):
        data = request.data
        user_job_id = data.get('job_id')
        screening_test_name = data.get('screening_test_name')
        screening_test_questions_data = data.get('questions_data', [])

        # Validate required fields
        if not user_job_id or not screening_test_name or not screening_test_questions_data:
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            job = JobDetails.objects.get(id=user_job_id)
        except JobDetails.DoesNotExist:
            return Response({"error": "Job not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            screening_test_obj, created = ScreeningTestDetails.objects.get_or_create(
                name=screening_test_name,
                job=job,
            )
            questions_to_create = [
                ScreeningTestQuestions(
                    screening_test=screening_test_obj,
                    question_type=question_data.get('question_type'),
                    question=question_data.get('question'),
                    options=','.join(question_data.get('options', [])),
                    answer=question_data.get('answer')
                ) for question_data in screening_test_questions_data
            ]
            ScreeningTestQuestions.objects.bulk_create(questions_to_create)

            return Response({"message": "Screening test created successfully."}, status=status.HTTP_201_CREATED)

        except ValidationError as e:
            print(f"ValidationError in CreateScreeningTest: {e}")
            return Response({"error": f"Invalid data: {e}"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"Internal server error in CreateScreeningTest: {e}")
            return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GlobalScreeningTestQuestionsView(APIView):
    """This view fetches all global screening tests questions."""
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            screening_tests_questions = GlobalScreeningTestQuestions.objects.values('question')

            if screening_tests_questions.exists():
                return Response(screening_tests_questions, status=status.HTTP_200_OK)
            else:
                return Response({"message": "No global screening tests questions are present"}, status=status.HTTP_204_NO_CONTENT)

        except ObjectDoesNotExist as e:
            print(f"Object does not exist in GlobalScreeningTestQuestionsView: {e}")
            return Response({"error": "Data not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f'Internal server error in GlobalScreeningTestQuestionsView: {str(e)}')
            return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GlobalScreeningTestQuestionsFilterView(ListAPIView):
    """This view fetches all global screening tests questions."""
    queryset = GlobalScreeningTestQuestions.objects.all()
    serializer_class = GlobalScreeningTestQuestionsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = GlobalScreeningTestQuestionsFilter
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        if not queryset.exists():
            return Response({"message": "No global screening test questions found."}, status=status.HTTP_204_NO_CONTENT)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AllScreeningTestView(APIView):
    """This view fetches all screening tests created by users for jobs."""
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            screening_tests = ScreeningTestDetails.objects.all()
            serializer = ScreeningTestDetailsSerializer(screening_tests, many=True)

            if screening_tests.exists():
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"message": "No screening tests created by users"}, status=status.HTTP_204_NO_CONTENT)

        except ObjectDoesNotExist as e:
            print(f"Object does not exist in AllScreeningTestView: {e}")
            return Response({"error": "Data not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f'Internal server error in AllScreeningTestView: {str(e)}')
            return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
