from django.contrib import admin
from job.models import JobDetails

@admin.register(JobDetails)
class JobDetailsAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "user", "company", "job_type", "required_experience_years", "created_at"]
    search_fields = ["name", "company", "city", "state", "country"]
    ordering = ['created_at']
