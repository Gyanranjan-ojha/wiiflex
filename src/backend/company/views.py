from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Count

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status

from company.models import CompanyDetails, UserCompanyAssociation
from job.models import JobDetails


class AllCompanyAPIView(APIView):
    """
    This view fetch all the saved Company
    """
    permission_classes = [AllowAny]
    
    def get(self, request):
        try:
            companies = CompanyDetails.objects.values(
                    'id',
                    'name',
                    'size',
                    'city',
                    'state',
                    'country',
                    'address',
                )
            if companies:
                return Response(companies, status=status.HTTP_200_OK)
            else:
                return Response({"message": "No Company available"}, status=status.HTTP_204_NO_CONTENT)
            
        except ObjectDoesNotExist as e:
            print(f"No Company exists: {e}")
            return Response({"error": "No Company exists."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response({"error": "Internal server error."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AllCompanyJobsAPIView(APIView):
    """This view fetches the all jobs created by users."""
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            jobs = JobDetails.objects.select_related('company', 'user').values(
                'id',
                'name',
                'city',
                'no_of_candidates',
                'company__name',
                'user__email',
                'is_open',
                'company_id'
            ).annotate(total_jobs=Count('company_id'))
            
            if jobs:
                all_jobs = [
                    {
                        "id": job["id"],
                        "role_name": job["name"],
                        "location": job["city"],
                        "no_of_candidates": job["no_of_candidates"],
                        "company_name": job["company__name"],
                        "poc_email": job["user__email"],
                        "status": "open" if job["is_open"] else "closed",
                        "total_jobs_count": job["total_jobs"]
                    }
                    for job in jobs
                ]
                return Response(all_jobs, status=status.HTTP_200_OK)
            else:
                return Response({"message": "No Jobs created by Users"}, status=status.HTTP_204_NO_CONTENT)

        except ObjectDoesNotExist as e:
            print(f"Object does not exist in AllCompanyJobsAPIView: {e}")
            return Response({"error": "Jobs not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f'Internal server error in AllCompanyJobsAPIView: {str(e)}')
            return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AllCompanyUsersAPIView(APIView):
    """
    This view fetch all the saved Company linked users
    """
    permission_classes = [AllowAny]
    
    def get(self, request):
        try:
            
            companies_users = UserCompanyAssociation.objects.select_related('company').select_related('user').values(
                    'id',
                    'user__first_name', 
                    'user__last_name',
                    'company__name',
                )
            if companies_users:
                return Response(companies_users, status=status.HTTP_200_OK)
            else:
                return Response({"message": "No Company Users available"}, status=status.HTTP_204_NO_CONTENT)
            
        except ObjectDoesNotExist as e:
            print(f"No Company exists: {e}")
            return Response({"error": "No Company Users exists."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response({"error": "Internal server error."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)