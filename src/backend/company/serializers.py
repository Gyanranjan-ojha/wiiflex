from rest_framework import serializers

from company.models import CompanyDetails

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyDetails
        fields = ['name']