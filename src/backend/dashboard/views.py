from django.core.exceptions import ValidationError
from django.db.models import Count
from django.db.models.functions import TruncDate
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from accounts.models import User
from job.models import JobDetails
from screening_test.models import ScreeningTestDetails
from candidates.models import CandidateDetails


class JobScreeningTestAPI(APIView):
    """This view fetches all the jobs and screening tests created by a particular user."""
    permission_classes = [AllowAny]
    
    def get(self, request):
        try:
            logged_user_email = request.query_params.get('email')
            
            if not logged_user_email:
                return Response({'error': 'Please provide email in query param'}, status=status.HTTP_400_BAD_REQUEST)
            
            user = User.objects.get(email=logged_user_email)
            jobs = JobDetails.objects.filter(user=user, is_open=True)
            
            if not jobs.exists():
                return Response({"message": "No jobs created related to User"}, status=status.HTTP_204_NO_CONTENT)

            # Get total screening tests count for the user
            total_screening_tests_count = ScreeningTestDetails.objects.filter(job__in=jobs).count()

            # Get job data with screening test counts
            jobs_with_screening_test_count = jobs.annotate(
                created_date=TruncDate('created_at'),
                screening_test_count=Count('screeningtestdetails')
            ).values(
                'id',
                'name',
                'created_date',
                'no_of_candidates'
            )

            job_data_list = list(jobs_with_screening_test_count)

            response_data = {
                'total_screening_tests_count': total_screening_tests_count,
                'job_data': job_data_list
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        except ValidationError:
            return Response({"error": "Invalid data."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AdminDashboardAPIView(APIView):
    """This view fetch all admin related data"""
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            total_jobs_count = JobDetails.objects.count()
            total_pending_jobs_count = JobDetails.objects.filter(is_open=True).count()
            total_candidates_count = CandidateDetails.objects.count()
            priority_jobs_queryset = JobDetails.objects.filter(is_open=True).values(
                "id", "name", "city", "created_at", "no_of_candidates", "pay_to", "is_open"
            ).order_by("joining_time")
            
            priority_jobs = [
                {
                    "id": job["id"],
                    "role_name": job["name"],
                    "city": job["city"],
                    "created_at": job["created_at"].strftime("%Y-%m-%d"),
                    "no_of_candidates": job["no_of_candidates"],
                    "salary": job["pay_to"],
                    "status": "open" if job["is_open"] else "closed"
                }
                for job in priority_jobs_queryset
            ]

            data = {
                "total_jobs_count": total_jobs_count,
                "total_candidates_count": total_candidates_count,
                "total_pending_jobs_count": total_pending_jobs_count,
                "priority_jobs": priority_jobs,
            }
            if priority_jobs or data:
                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response({"error": "No data found"}, status=status.HTTP_204_NO_CONTENT)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)