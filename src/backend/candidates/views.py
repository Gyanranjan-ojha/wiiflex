from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.db import transaction

from accounts.models import User
from candidates.models import (
    CandidateDetails,
    CandidateSkills,
    CandidateExperience,
    CandidateEducation
)
from candidates.serializers import CandidateDetailsSerializer

class CandidatesRetrieveAPIView(APIView):
    """This view returns candidates based on email or candidate ID."""
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            email = request.query_params.get('email')
            candidate_id = request.query_params.get('id')

            if email and candidate_id:
                return Response({"error": "Only one query parameter ('email' or 'id') should be provided."}, status=status.HTTP_400_BAD_REQUEST)

            if email:
                try:
                    user = User.objects.get(email=email)
                except User.DoesNotExist:
                    return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

                candidates = CandidateDetails.objects.filter(created_by=user)
                serializer = CandidateDetailsSerializer(candidates, many=True)
                if serializer.data:
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response({"error": "Candidates not exists."}, status=status.HTTP_204_NO_CONTENT)
            
            elif candidate_id:
                try:
                    candidate = CandidateDetails.objects.get(id=candidate_id)
                except CandidateDetails.DoesNotExist:
                    return Response({"error": "Candidate not found."}, status=status.HTTP_404_NOT_FOUND)

                serializer = CandidateDetailsSerializer(candidate)
                if serializer.data:
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response({"error": "Candidates not exists."}, status=status.HTTP_204_NO_CONTENT)
            
            else:
                return Response({"error": "Either 'email' or 'id' query parameter must be provided."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AllCandidatesAPIView(APIView):
    """This view returns all candidates data."""
    permission_classes = [AllowAny]
    
    def get(self, request):
        try:
            candidates = CandidateDetails.objects.values(
                'id',
                'name',
                'current_designation',
                'phone',
                'is_active', 
            )
            if candidates:
                all_candidates = [
                    {
                        "id": candidate["id"],
                        "name": candidate["name"],
                        "designation": candidate["current_designation"],
                        "phone": candidate["phone"],
                        "no_of_jobs_applied": 0,
                        "status": "active" if candidate["is_active"] else "inactive"
                    }
                    for candidate in candidates
                ]
                return Response(all_candidates, status=status.HTTP_200_OK)
            else:
                return Response({"message": "No candidates created by Users"}, status=status.HTTP_204_NO_CONTENT)

        except Exception as e:
            print(f'Internal server error in AllCandidatesAPIView: {str(e)}')
            return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CreateCandidateAPIView(APIView):
    """This view allows recruiters or agents to create or update their candidates."""
    permission_classes = [AllowAny]

    @transaction.atomic
    def post(self, request):
        try:
            data = request.data

            email = data.get('email')
            
            # Validate the presence of email
            if not email:
                return Response({"error": "Logged User Email is required."}, status=status.HTTP_400_BAD_REQUEST)
            
            # Fetch the user
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({"error": "Logged User not found."}, status=status.HTTP_404_NOT_FOUND)
            
            candidate_id = data.get('candidate_id')
            
            if candidate_id:
                # Update candidate details
                return self.update_candidate_details(data, user)
            else:
                # Create or retrieve candidate
                return self.handle_candidate_creation(data, user)
        
        except Exception:
            return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def handle_candidate_creation(self, data, user):
        candidate_name = data.get('candidate_name')
        
        # Ensure candidate name is provided
        if not candidate_name:
            return Response({"error": "Candidate name is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        candidate, created = CandidateDetails.objects.get_or_create(
            name=data.get('candidate_name'),
            email=data.get('candidate_email', None),
            phone=data.get('candidate_phone', None),
            languages=data.get('candidate_languages', None),
            current_designation=data.get('candidate_current_designation', None),
            current_organization=data.get('candidate_current_organization', None),
            desc=data.get('candidate_desc', None),
            country=data.get('candidate_country', None),
            city_state=data.get('candidate_city_state', None),
            city_area=data.get('candidate_city_area', None),
            street_address=data.get('candidate_street_address', None),
            pincode=data.get('candidate_pincode', None),
            portfolio=data.get('candidate_portfolio', None),
            defaults={'created_by': user, 'updated_by': user}
        )
        if created:
            return Response({"candidate_id": candidate.id, "message": "Candidate personal details created successfully", "data": data}, status=status.HTTP_201_CREATED)
        else:
            # Update the existing candidate with the user who is modifying it
            candidate.updated_by = user
            candidate.save()
            return Response({"candidate_id": candidate.id, "message": "Candidate details updated successfully", "data": data}, status=status.HTTP_200_OK)
    
    def update_candidate_details(self, data, user):
        candidate_id = data.get('candidate_id')
        
        try:
            candidate = CandidateDetails.objects.get(id=candidate_id)
        except CandidateDetails.DoesNotExist:
            return Response({"error": "Candidate not found."}, status=status.HTTP_404_NOT_FOUND)
        
        # Update candidate fields based on the provided data
        for field, value in data.items():
            if field.startswith('candidate_') and hasattr(candidate, field.split('candidate_')[1]):
                setattr(candidate, field.split('candidate_')[1], value)

        candidate.updated_by = user
        candidate.save()
        
        # Update candidate description if provided
        if 'candidate_desc' in data:
            if data.get('candidate_desc'):
                self.update_candidate_desc(candidate, data.get('candidate_desc'))
                return Response({"candidate_id": candidate.id, "message": "Candidate description details updated successfully", "data": data}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "candidate description can't be empty."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Update candidate portfolio if provided
        if 'candidate_portfolio' in data:
            if data.get('candidate_portfolio'):
                self.update_candidate_portfolio(candidate, data.get('candidate_portfolio'))
                return Response({"candidate_id": candidate.id, "message": "Candidate portfolio details updated successfully", "data": data}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "candidate portfolio can't be empty."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Update skills if provided
        if 'candidate_skills_data' in data:
            if data.get('candidate_skills_data'):
                self.update_candidate_skills(candidate, data.get('candidate_skills_data'))
                return Response({"candidate_id": candidate.id, "message": "Candidate skills details updated successfully", "data": data}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "candidate skills data can't be empty."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Update education if provided
        if 'candidate_education_data' in data:
            if data.get('candidate_education_data'):
                self.update_candidate_education(candidate, data.get('candidate_education_data'))
                return Response({"candidate_id": candidate.id, "message": "Candidate education details updated successfully", "data": data}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "candidate education data can't be empty."}, status=status.HTTP_400_BAD_REQUEST)

        # Update experience if provided
        if 'candidate_experience_data' in data:
            if data.get('candidate_experience_data'):
                self.update_candidate_experience(candidate, data.get('candidate_experience_data'))
                return Response({"candidate_id": candidate.id, "message": "Candidate experience details updated successfully", "data": data}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "candidate experience data can't be empty."}, status=status.HTTP_400_BAD_REQUEST)
        
    def update_candidate_desc(self, candidate, desc_data):
        candidate.desc = desc_data
        candidate.save()
    
    def update_candidate_portfolio(self, candidate, portfolio_data):
        candidate.portfolio = portfolio_data
        candidate.save()
    
    def update_candidate_skills(self, candidate, skills_data):
        candidate_skills_to_create = [
            CandidateSkills(
                candidate=candidate,
                name=skill
            ) for skill in skills_data
        ]
        CandidateSkills.objects.bulk_create(candidate_skills_to_create)
        
    def update_candidate_education(self, candidate, education_data):
        candidate_education_to_create = [
            CandidateEducation(
                candidate=candidate,
                level=edu.get('level', None),
                level_others=edu.get('level_others', None),
                board=edu.get('board', None),
                degree=edu.get('degree', None),
                study_field=edu.get('study_field', None),
                degree_specialization=edu.get('degree_specialization', None),
                percentage_cgpa=edu.get('percentage_cgpa', None),
                country=edu.get('country', None),
                city_state=edu.get('city_state', None),
                school_college_name=edu.get('school_college_name', None),
                university_name=edu.get('university_name', None),
                achievements_awards=edu.get('achievements_awards', None),
                subject=edu.get('subject', None),
                study_type=edu.get('study_type', None),
                started_at=edu.get('started_at', None),
                end_at=edu.get('end_at', None),
                is_pursuing=edu.get('is_pursuing'),
                study_desc=edu.get('study_desc', None),
                study_address=edu.get('study_address', None)
            ) for edu in education_data
        ]
        CandidateEducation.objects.bulk_create(candidate_education_to_create)
    
    def update_candidate_experience(self, candidate, experience_data):
        candidate_experience_to_create = [
            CandidateExperience(
                candidate=candidate,
                designation=exp.get('designation', None), 
                job_title=exp.get('job_title', None),
                company_name=exp.get('company_name', None),
                work_type=exp.get('work_type', None),
                joined_at=exp.get('joined_at', None),
                resigned_at=exp.get('resigned_at', None),
                is_currently_working=exp.get('is_currently_working', False),
                notice_period_days=exp.get('notice_period_days', 0),
                work_desc=exp.get('work_desc', None),
                country=exp.get('country', None),
                city_state=exp.get('city_state', None),
                work_address=exp.get('work_address', None),
            ) for exp in experience_data
        ]
        CandidateExperience.objects.bulk_create(candidate_experience_to_create)


class CandidateUpdateAPIView(APIView):
    """This view allows for updating candidate information including their personal details, education, skills, and experience."""
    permission_classes = [AllowAny]

    @transaction.atomic
    def put(self, request):
        return self.update_candidate(request)

    @transaction.atomic
    def patch(self, request):
        return self.update_candidate(request)

    def update_candidate(self, request):
        data = request.data
        print('dataa:', data)

        email = data.get('email')

        # Validate the presence of email
        if not email:
            return Response({"error": "Logged User Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch the user
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Logged User not found."}, status=status.HTTP_404_NOT_FOUND)

        candidate_id = data.get('candidate_id')

        if not candidate_id:
            return Response({"error": "Candidate ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            candidate = CandidateDetails.objects.get(id=candidate_id)
        except CandidateDetails.DoesNotExist:
            return Response({"error": "Candidate not found."}, status=status.HTTP_404_NOT_FOUND)

        # Update personal details
        personal_data_mapping = {
            'candidate_name': 'name',
            'candidate_current_designation': 'current_designation',
            'candidate_current_organization': 'current_organization',
            'candidate_email': 'email',
            'candidate_phone': 'phone',
            'candidate_desc': 'desc',
            'candidate_address': 'address',
            'candidate_portfolio': 'portfolio',
            'candidate_languages': 'languages',
            'candidate_country': 'country',
            'candidate_city_state': 'city_state',
            'candidate_city_area': 'city_area',
            'candidate_street_address': 'street_address',
            'candidate_pincode': 'pincode'
        }

        for json_field, model_field in personal_data_mapping.items():
            if json_field in data:
                # Special handling for languages field
                if json_field == 'candidate_languages':
                    # Convert list to comma-separated string
                    setattr(candidate, model_field, ', '.join(data[json_field]))
                else:
                    setattr(candidate, model_field, data[json_field])

        candidate.updated_by = user
        candidate.save()

        education_data = data.get('candidate_education_data', [])
        skills_data = data.get('candidate_skills_data', [])
        experience_data = data.get('candidate_experience_data', [])

        # Handle education data
        if education_data:
            for edu in education_data:
                edu_id = edu.get('id')
                if edu_id:
                    self.update_candidate_education(candidate, edu)

        # Handle skills data
        if skills_data:
            self.update_candidate_skill(candidate, skills_data)

        # Handle experience data
        if experience_data:
            for exp in experience_data:
                exp_id = exp.get('id')
                if exp_id:
                    self.update_candidate_experience(candidate, exp)

        return Response({"message": "Candidate data updated successfully", "candidate_id":candidate_id}, status=status.HTTP_200_OK)

    def update_candidate_education(self, candidate, edu):
        edu_id = edu.get('id')
        try:
            education_entry = CandidateEducation.objects.get(id=edu_id, candidate=candidate)
            for field, value in edu.items():
                if field != 'id':
                    setattr(education_entry, field, value)
            education_entry.save()
        except CandidateEducation.DoesNotExist:
            return Response({"error": f"Education entry with ID {edu_id} not found."}, status=status.HTTP_404_NOT_FOUND)

    def update_candidate_skill(self, candidate, skills_data):
        # Clear existing skills and add new ones
        CandidateSkills.objects.filter(candidate=candidate).delete()
        candidate_skills_to_create = [
            CandidateSkills(
                candidate=candidate,
                name=skill
            ) for skill in skills_data
        ]
        CandidateSkills.objects.bulk_create(candidate_skills_to_create)

    def update_candidate_experience(self, candidate, exp):
        exp_id = exp.get('id')
        try:
            experience_entry = CandidateExperience.objects.get(id=exp_id, candidate=candidate)
            for field, value in exp.items():
                if field != 'id':
                    setattr(experience_entry, field, value)
            experience_entry.save()
        except CandidateExperience.DoesNotExist:
            return Response({"error": f"Experience entry with ID {exp_id} not found."}, status=status.HTTP_404_NOT_FOUND)

class CandidateDeleteAPIView(APIView):
    """This view allows for deleting candidate personal details, education, skills, and experience."""
    permission_classes = [AllowAny]

    @transaction.atomic
    def delete(self, request):
        return self.delete_candidate_data(request)

    def delete_candidate_data(self, request):
        data = request.data

        candidate_id = data.get('candidate_id')
        education_ids = data.get('education_ids', [])
        skill_ids = data.get('skill_ids', [])
        experience_ids = data.get('experience_ids', [])

        if not candidate_id:
            return Response({"error": "Candidate ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            candidate = CandidateDetails.objects.get(id=candidate_id)
        except CandidateDetails.DoesNotExist:
            return Response({"error": "Candidate not found."}, status=status.HTTP_404_NOT_FOUND)

        # Handle deletion of personal details
        personal_data_mapping = {
            'candidate_name': 'name',
            'candidate_current_designation': 'current_designation',
            'candidate_current_organization': 'current_organization',
            'candidate_email': 'email',
            'candidate_phone': 'phone',
            'candidate_desc': 'desc',
            'candidate_address': 'address',
            'candidate_portfolio': 'portfolio',
            'candidate_languages': 'languages',
            'candidate_country': 'country',
            'candidate_city_state': 'city_state',
            'candidate_city_area': 'city_area',
            'candidate_street_address': 'street_address',
            'candidate_pincode': 'pincode'
        }

        for json_field, model_field in personal_data_mapping.items():
            if json_field in data:
                # Clear the field value
                setattr(candidate, model_field, None)
        
        candidate.save()

        # Handle deletion of education entries
        if education_ids:
            for edu_id in education_ids:
                self.delete_candidate_education(candidate, edu_id)

        # Handle deletion of skills entries
        if skill_ids:
            for skill_id in skill_ids:
                self.delete_candidate_skill(candidate, skill_id)

        # Handle deletion of experience entries
        if experience_ids:
            for exp_id in experience_ids:
                self.delete_candidate_experience(candidate, exp_id)

        return Response({"message": "Candidate data deleted successfully", "candidate_id": candidate_id}, status=status.HTTP_200_OK)

    def delete_candidate_education(self, candidate, edu_id):
        try:
            education_entry = CandidateEducation.objects.get(id=edu_id, candidate=candidate)
            education_entry.delete()
        except CandidateEducation.DoesNotExist:
            return Response({"error": f"Education entry with ID {edu_id} not found."}, status=status.HTTP_404_NOT_FOUND)

    def delete_candidate_skill(self, candidate, skill_id):
        try:
            skill_entry = CandidateSkills.objects.get(id=skill_id, candidate=candidate)
            skill_entry.delete()
        except CandidateSkills.DoesNotExist:
            return Response({"error": f"Skill entry with ID {skill_id} not found."}, status=status.HTTP_404_NOT_FOUND)

    def delete_candidate_experience(self, candidate, exp_id):
        try:
            experience_entry = CandidateExperience.objects.get(id=exp_id, candidate=candidate)
            experience_entry.delete()
        except CandidateExperience.DoesNotExist:
            return Response({"error": f"Experience entry with ID {exp_id} not found."}, status=status.HTTP_404_NOT_FOUND)
