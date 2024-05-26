from django.contrib import admin
from job.models import JobDetails

@admin.register(JobDetails)
class JobDetailsAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "user", "company", "job_type", "experience_years", "skills_required", "created_at"]
    search_fields = ["name", "company", "city", "state", "country"]
    ordering = ['created_at']
