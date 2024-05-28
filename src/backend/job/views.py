from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from accounts.models import User
from company.models import CompanyDetails, UserCompanyAssociation
from job.models import JobDetails

class JobsCreate(APIView):
    """This view allows users to create their jobs."""
    permission_classes = [AllowAny]

    @transaction.atomic
    def post(self, request):
        try:
            data = request.data
            print(f'🎯{data}')
            
            logged_user_email = data.get('email')
            
            company_name = data.get('companyName')
            company_website = data.get('company_website')
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
            job_description = data.get('jobDescription')
            job_city = data.get('jobCity')
            job_state = data.get('jobState')
            job_country = data.get('jobCountry')
            job_address = data.get('jobStreetAddress')
            job_type = data.get('jobType')
            
            experience_years = data.get('experienceRequired')
            
            salary_range = data.get('salaryRange', {})
            if salary_range:
                pay_from =salary_range.get('from')
                pay_to =salary_range.get('to')
            else:
                pay_from = None
                pay_to = None
            
            pay_contract_type = data.get('pay_contract_type')
            compensation_offers_list = data.get('additionalCompensation', [])
            compensation_offers = ','.join(compensation_offers_list) if compensation_offers_list else None
            benefit_offers_list = data.get('benefits', [])
            benefit_offers = ','.join(benefit_offers_list) if benefit_offers_list else None
            
            no_of_candidates = data.get('hiresRequired')
                
            joining_time = data.get('urgency')
            is_fully_remote = data.get('is_fully_remote', False)
            interview_options = data.get('interviewOptions', {})
            allows_video_interviews = interview_options.get('videoInterview', False)
            allows_video_calling = interview_options.get('videoCalling', False)
            allows_email_communication = interview_options.get('email', False)
            available_shifts_list = data.get('availability', [])
            available_shifts = ','.join(available_shifts_list) if available_shifts_list else None
            skills_required = data.get('skills_required')
            
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
                description=job_description,
                user=user,
                company=company,
                city=job_city,
                state=job_state,
                country=job_country,
                address=job_address,
                job_type=job_type,
                experience_years=experience_years,
                pay_from=pay_from,
                pay_to=pay_to,
                pay_contract_type=pay_contract_type,
                compensation_offers=compensation_offers,
                benefit_offers=benefit_offers,
                no_of_candidates=no_of_candidates,
                joining_time=joining_time,
                is_fully_remote=is_fully_remote,
                allows_video_interviews=allows_video_interviews,
                allows_video_calling=allows_video_calling,
                allows_email_communication=allows_email_communication,
                available_shifts=available_shifts,
                skills_required=skills_required
            )

            return Response({"message": "Job created successfully."}, status=status.HTTP_201_CREATED)
        
        except ObjectDoesNotExist as e:
            print(f"Object does not exist: {e}")
            return Response({"error": "User or Company not found."}, status=status.HTTP_404_NOT_FOUND)
        except ValidationError as e:
            print(f"Validation error: {e}")
            return Response({"error": "Invalid data."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"Internal server error: {e}")
            return Response({"error": "Internal server error."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
