from rest_framework import serializers

from candidates.models import (
    CandidateDetails,
    CandidateExperience,
    CandidateEducation,
    CandidateSkills,
)

class CandidateExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateExperience
        fields = [
            'id', 'designation', 'job_title', 'company_name', 'work_type', 'joined_at', 'resigned_at', 
            'is_currently_working', 'notice_period_days', 'work_desc', 'work_address', 'country', 'city_state'
        ]

class CandidateEducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateEducation
        fields = [
            'id', 'level', 'level_others', 'board', 'degree', 'study_field', 'degree_specialization', 'name', 'subject', 
            'study_type', 'is_pursuing', 'percentage_cgpa', 'started_at', 'end_at', 'study_desc', 'study_address',
            'country', 'city_state', 'school_college_name', 'university_name', 'achievements_awards'
        ]

class CandidateSkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateSkills
        fields = ['id', 'name']

class CandidateDetailsSerializer(serializers.ModelSerializer):
    experiences_data = serializers.SerializerMethodField()
    educations_data = serializers.SerializerMethodField()
    skills_data = serializers.SerializerMethodField()

    class Meta:
        model = CandidateDetails
        fields = [
            'id', 'name', 'current_designation', 'current_organization', 'email', 'phone', 'languages', 'desc', 
            'address', 'country', 'street_address', 'city_state', 'city_area', 'pincode', 'portfolio', 
            'experiences_data', 'educations_data', 'skills_data'
        ]

    def get_experiences_data(self, obj):
        experiences = obj.experience.order_by('-updated_at')
        return CandidateExperienceSerializer(experiences, many=True).data

    def get_educations_data(self, obj):
        educations = obj.education.order_by('-updated_at')
        return CandidateEducationSerializer(educations, many=True).data

    def get_skills_data(self, obj):
        skills = obj.skills.order_by('-updated_at')
        return CandidateSkillsSerializer(skills, many=True).data

class CandidateDetailSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateDetails
        fields = ['id', 'name', 'current_designation', 'current_organization', 'email', 'phone', 'portfolio']