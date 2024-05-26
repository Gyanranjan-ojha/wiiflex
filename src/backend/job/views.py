from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from accounts.models import User
from company.models import CompanyDetails, UserCompanyAssociation
from job.models import JobDetails

class JobsCreate(APIView):
    """This view allows users to create their jobs."""
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            email = request.data.get('email')
            name = request.data.get('name')
            description = request.data.get('description')
            company_name = request.data.get('company_name')
            company_website = request.data.get('company_website')
            company_size = request.data.get('company_size')
            company_city = request.data.get('company_city')
            company_state = request.data.get('company_state')
            company_country = request.data.get('company_country')
            company_address = request.data.get('company_address')
            job_city = request.data.get('job_city')
            job_state = request.data.get('job_state')
            job_country = request.data.get('job_country')
            job_address = request.data.get('job_address')
            job_type = request.data.get('job_type')
            experience_years = request.data.get('experience_years')
            pay_from = request.data.get('pay_from')
            pay_to = request.data.get('pay_to')
            pay_contract_type = request.data.get('pay_contract_type')
            compensation_offers = request.data.get('compensation_offers')
            benefit_offers = request.data.get('benefit_offers')
            no_of_candidates = request.data.get('no_of_candidates')
            joining_time = request.data.get('joining_time')
            is_fully_remote = request.data.get('is_fully_remote')
            allows_video_interviews = request.data.get('allows_video_interviews')
            allows_video_calling = request.data.get('allows_video_calling')
            allows_email_communication = request.data.get('allows_email_communication')
            available_shifts = request.data.get('available_shifts')
            skills_required = request.data.get('skills_required')
            
            user = User.objects.get(email=email)
            company, created = CompanyDetails.objects.update_or_create(
                name=company_name,
                defaults={
                    'website': company_website,
                    'size': company_size,
                    'city': company_city,
                    'state': company_state,
                    'country': company_country,
                    'address': company_address
                }
            )

            user_company_association, created = UserCompanyAssociation.objects.get_or_create(user=user, company=company)
            if created:
                user_company_association.save()

            job = JobDetails.objects.create(
                name=name,
                description=description,
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
        except Exception as e:
            print(e)
            return Response({"error": "Internal server error."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)