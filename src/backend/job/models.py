from django.db import models
from accounts.models import User
from company.models import CompanyDetails

class JobDetails(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=False, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_column="user_id")
    company = models.ForeignKey(CompanyDetails, on_delete=models.CASCADE, db_column="company_id")
    city = models.CharField(max_length=255, null=True, blank=True)
    state = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    job_type = models.CharField(max_length=200, null=True, blank=True)
    experience_years = models.CharField(max_length=10, null=True, blank=True)
    pay_from = models.CharField(max_length=10, null=True, blank=True)
    pay_to = models.CharField(max_length=10, null=True, blank=True)
    pay_contract_type = models.CharField(max_length=200, null=True, blank=True)
    compensation_offers = models.CharField(max_length=200, null=True, blank=True) # csv
    benefit_offers = models.CharField(max_length=200, null=True, blank=True) # csv
    no_of_candidates = models.CharField(max_length=10, null=True, blank=True)
    joining_time = models.CharField(max_length=200, null=True, blank=True)
    is_fully_remote = models.BooleanField(default=False)
    allows_video_interviews = models.BooleanField(default=False)
    allows_video_calling = models.BooleanField(default=False)
    allows_email_communication = models.BooleanField(default=False)
    available_shifts = models.TextField(null=True, blank=True) # csv
    skills_required = models.TextField(null=True, blank=True) # csv
    is_open = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    closed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        app_label = 'job'
        verbose_name_plural = 'job Details'
        db_table = 'job_details'