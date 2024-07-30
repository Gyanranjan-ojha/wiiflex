from django.db import models
from accounts.models import User
from company.models import CompanyDetails

class CandidateDetails(models.Model):
    id = models.AutoField(primary_key=True)
    company = models.ForeignKey(CompanyDetails, on_delete=models.CASCADE, db_column="company_id", null=True, blank=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    current_designation = models.CharField(max_length=255, null=True, blank=True)
    current_organization = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(max_length=255, unique=False, null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    languages = models.TextField(null=True, blank=True)
    desc = models.TextField(null=True, blank=True)  # about me
    address = models.TextField(null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    street_address = models.TextField(null=True, blank=True)
    city_state = models.CharField(max_length=255, null=True, blank=True)
    city_area = models.CharField(max_length=255, null=True, blank=True)
    pincode = models.IntegerField(null=True, blank=True)
    portfolio = models.URLField(max_length=200, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, db_column="created_by_user_id", related_name='created_candidates')
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, db_column="updated_by_user_id", related_name='updated_candidates')

    def __str__(self):
        return self.name

    class Meta:
        app_label = 'candidates'
        verbose_name_plural = 'candidate Details'
        db_table = 'candidate_details'

class CandidateSkills(models.Model):
    id = models.AutoField(primary_key=True)
    candidate = models.ForeignKey(CandidateDetails, on_delete=models.CASCADE, db_column="candidate_id", related_name='skills')
    name = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        app_label = 'candidates'
        verbose_name_plural = 'candidate Skills'
        db_table = 'candidate_skills'

class CandidateExperience(models.Model):
    id = models.AutoField(primary_key=True)
    candidate = models.ForeignKey(CandidateDetails, on_delete=models.CASCADE, db_column="candidate_id", related_name='experience')
    designation = models.CharField(max_length=255, null=True, blank=True)
    job_title = models.CharField(max_length=255, null=True, blank=True)
    company_name = models.CharField(max_length=255, null=True, blank=True)
    work_type = models.CharField(max_length=255, null=True, blank=True)
    joined_at = models.CharField(max_length=15, null=True, blank=True)
    resigned_at = models.CharField(max_length=15, null=True, blank=True)
    is_currently_working = models.BooleanField(default=False)
    notice_period_days = models.SmallIntegerField(default=0, blank=True, null=True)
    work_desc = models.TextField(null=True, blank=True)
    work_address = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    city_state = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.designation

    class Meta:
        app_label = 'candidates'
        verbose_name_plural = 'candidate Experience'
        db_table = 'candidate_experiences'

class CandidateEducation(models.Model):
    id = models.AutoField(primary_key=True)
    candidate = models.ForeignKey(CandidateDetails, on_delete=models.CASCADE, db_column="candidate_id", related_name='education')
    level = models.CharField(max_length=255, null=True, blank=True)
    level_others = models.CharField(max_length=255, null=True, blank=True)
    board = models.CharField(max_length=255, null=True, blank=True)
    degree = models.CharField(max_length=255, null=True, blank=True)
    study_field = models.CharField(max_length=255, null=True, blank=True)  # field of study
    degree_specialization = models.CharField(max_length=255, null=True, blank=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    subject = models.CharField(max_length=255, null=True, blank=True)
    study_type = models.CharField(max_length=255, null=True, blank=True)
    is_pursuing = models.BooleanField(default=False)
    percentage_cgpa = models.FloatField(null=True, blank=True)
    started_at = models.CharField(max_length=15, null=True, blank=True)
    end_at = models.CharField(max_length=15, null=True, blank=True)
    study_desc = models.TextField(null=True, blank=True)
    study_address = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    city_state = models.CharField(max_length=255, null=True, blank=True)
    school_college_name = models.CharField(max_length=255, null=True, blank=True)
    university_name = models.CharField(max_length=255, null=True, blank=True)
    achievements_awards = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        app_label = 'candidates'
        verbose_name_plural = 'candidate Education'
        db_table = 'candidate_educations'
