from rest_framework import serializers

from accounts.serializers import UserEmailSerializer
from company.serializers import CompanySerializer
from job.models import JobDetails


class JobSerializer(serializers.ModelSerializer):
    user = UserEmailSerializer()
    company = CompanySerializer()

    class Meta:
        model = JobDetails
        fields = ['name', 'user', 'company']