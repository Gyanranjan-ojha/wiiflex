from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.db.models.functions import TruncDate

from accounts.models import User
from candidates.models import CandidateDetails, CandidateSkills
from candidates.serializers import CandidateDetailSummarySerializer
from company.models import CompanyDetails, UserCompanyAssociation
from job.models import JobDetails, JobSkills


class JobsCreateAPIView(APIView):
    """This view allows users to create their jobs."""
    permission_classes = [AllowAny]

    @transaction.atomic
    def post(self, request):
        try:
            data = request.data
            
            logged_user_email = data.get('email')
            
            company_name = data.get('companyName')
            company_website = data.get('companyWebsite')
            company_phone = data.get('phone')
            
            company_size_data = data.get('companySize')
            if company_size_data:
                company_size = int(company_size_data)
            else:
                company_size = 0
            
            company_city = data.get('companyCity')
            company_state = data.get('companyState')
            company_country = data.get('companyCountry')
            company_address = data.get('companyStreetAddress')
            
            job_title = data.get('jobTitle')
            job_recruiter_name = data.get('yourName')
            job_description = data.get('jobDescription')
            job_city = data.get('jobCity')
            job_state = data.get('jobState')
            job_country = data.get('jobCountry')
            job_address = data.get('jobStreetAddress')
            job_type = data.get('jobType')
            
            required_experience_years = data.get('experienceRequired')
            
            pay_from = data.get('salaryRangeFrom')
            pay_to = data.get('salaryRangeTo')

            
            pay_contract_type = data.get('contractType')
            compensation_offers_list = data.get('additionalCompensation', [])
            compensation_offers = ','.join(compensation_offers_list) if compensation_offers_list else None
            benefit_offers_list = data.get('benefits', [])
            benefit_offers = ','.join(benefit_offers_list) if benefit_offers_list else None
            
            no_of_candidates = data.get('hiresRequired')
                
            joining_time = data.get('urgency')
            is_fully_remote = data.get('isHireFullyRemote')
            available_shifts_list = data.get('availability', [])
            available_shifts = ','.join(available_shifts_list) if available_shifts_list else None
            skills_required_list = data.get('skillsRequired', [])
            
            if logged_user_email:
                user = User.objects.get(email=logged_user_email)
                company, created = CompanyDetails.objects.update_or_create(
                    name=company_name,
                    defaults={
                        'website': company_website,
                        'phone': company_phone,
                        'size': company_size,
                        'city': company_city,
                        'state': company_state,
                        'country': company_country,
                        'address': company_address
                    }
                )

                UserCompanyAssociation.objects.get_or_create(user=user, company=company)

                job = JobDetails.objects.create(
                    name=job_title,
                    recruiter_name=job_recruiter_name,
                    description=job_description,
                    user=user,
                    company=company,
                    city=job_city,
                    state=job_state,
                    country=job_country,
                    address=job_address,
                    job_type=job_type,
                    required_experience_years=required_experience_years,
                    pay_from=pay_from,
                    pay_to=pay_to,
                    pay_contract_type=pay_contract_type,
                    compensation_offers=compensation_offers,
                    benefit_offers=benefit_offers,
                    no_of_candidates=no_of_candidates,
                    joining_time=joining_time,
                    is_fully_remote=is_fully_remote,
                    available_shifts=available_shifts,
                )
                if skills_required_list:
                    for skill in skills_required_list:
                        JobSkills.objects.get_or_create(job=job, name=skill)
                
                return Response({"message": "Job created successfully.", "data": {"job_id": job.id}}, status=status.HTTP_201_CREATED)
        
        except ObjectDoesNotExist as e:
            print(f"Object does not exist in JobsCreateAPIView: {e}")
            return Response({"error": "User or Company not found."}, status=status.HTTP_404_NOT_FOUND)
        except ValidationError as e:
            print(f"Validation error in JobsCreateAPIView: {e}")
            return Response({"error": "Invalid data."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"Internal server error in JobsCreateAPIView: {e}")
            return Response({"error": "Internal server error."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class JobsFetchAPIView(APIView):
    """This view fetches all the jobs created by a particular user."""
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            logged_user_email = request.query_params.get('email')
            
            if not logged_user_email:
                return Response({'error': 'Please provide email in query param'}, status=status.HTTP_400_BAD_REQUEST)
            user = User.objects.get(email=logged_user_email)

            jobs = JobDetails.objects.filter(user=user, is_open=True).select_related('company', 'user').annotate(
                    created_date=TruncDate('created_at')
                ).values(
                    'id',
                    'name',
                    'description',
                    'city',
                    'state',
                    'country',
                    'address',
                    'required_experience_years',
                    'pay_from',
                    'pay_to',
                    'company__name',
                    'user__first_name',
                    'user__last_name',
                    'job_type',
                    'created_date',  # Use the annotated field
                    'no_of_candidates'
                ).order_by('-updated_at')  # Order by newest updated first

            if jobs:
                return Response(jobs, status=status.HTTP_200_OK)
            else:
                return Response({"message": "No Jobs created related to User"}, status=status.HTTP_204_NO_CONTENT)

        except ObjectDoesNotExist as e:
            print(f"Object does not exist in JobsFetchAPIView: {e}")
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f'Internal server error in JobsFetchAPIView: {str(e)}')
            return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ParticularJobFetchAPIView(APIView):
    """This view fetches the particular job based on job id."""
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            job_id = request.query_params.get('job_id')
            if not job_id:
                return Response({"error": "Job ID query parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
            
            jobs = JobDetails.objects.filter(id=job_id, is_open=True)

            jobs = jobs.select_related('company', 'user').annotate(
                created_date=TruncDate('created_at')
            ).values(
                'id',
                'name',
                'description',
                'city',
                'state',
                'country',
                'address',
                'required_experience_years',
                'pay_from',
                'pay_to',
                'company__name',
                'user__first_name',
                'user__last_name',
                'job_type',
                'created_date'
            ).order_by('-updated_at')

            if jobs.exists():
                return Response(jobs, status=status.HTTP_200_OK)
            else:
                return Response({"message": "No jobs found."}, status=status.HTTP_204_NO_CONTENT)

        except Exception as e:
            print(f'Internal server error in JobsFetchAPIView: {str(e)}')
            return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AllJobsAPIView(APIView):
    """This view fetches the all jobs created by users."""
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            jobs = JobDetails.objects.select_related('company').select_related('user').values(
                'id',
                'name',
                'city',
                'no_of_candidates',
                'company__name', 
                'user__email',
                'is_open',
            )
            if jobs:
                all_jobs = [
                    {
                        "id": job["id"],
                        "role_name": job["name"],
                        "location": job["city"],
                        "no_of_candidates": job["no_of_candidates"],
                        "company_name": job["company__name"],
                        "poc_email": job["user__email"],
                        "status": "open" if job["is_open"] else "closed"
                    }
                    for job in jobs
                ]
                return Response(all_jobs, status=status.HTTP_200_OK)
            else:
                return Response({"message": "No Jobs created by Users"}, status=status.HTTP_204_NO_CONTENT)

        except ObjectDoesNotExist as e:
            print(f"Object does not exist in AllJobsAPIView: {e}")
            return Response({"error": "Jobs not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f'Internal server error in AllJobsAPIView: {str(e)}')
            return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CandidateRecommendationView(APIView):
    def get(self, request):
        job_id = request.query_params.get('job_id')
        
        if not job_id:
            return Response({"detail": "Job ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Get the skills required for the job
            job_skills = JobSkills.objects.filter(job_id=job_id).values_list('name', flat=True)

            if not job_skills:
                return Response({"detail": "No skills found for the job."}, status=status.HTTP_404_NOT_FOUND)

            # Find candidates who have any of these skills
            candidate_skills = CandidateSkills.objects.filter(name__in=job_skills).values_list('candidate_id', flat=True)
            candidates = CandidateDetails.objects.filter(
                is_active=True,
                id__in=candidate_skills
            ).distinct()

            # Serialize the candidate data
            serializer = CandidateDetailSummarySerializer(candidates, many=True)
            if serializer.data:
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({"message": "No candidates available"}, status=status.HTTP_204_NO_CONTENT)
        
        except JobSkills.DoesNotExist:
            return Response({"detail": "Job not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)