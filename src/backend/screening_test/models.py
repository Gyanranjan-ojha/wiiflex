from django.db import models
from job.models import JobDetails

class ScreeningTestDetails(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=False, null=True, blank=True)
    job = models.ForeignKey(JobDetails, on_delete=models.CASCADE, db_column="job_id")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        app_label = 'screening_test'
        verbose_name_plural = 'screening Test Details'
        db_table = 'screening_test_details'

class ScreeningTestQuestions(models.Model):
    id = models.AutoField(primary_key=True)
    screening_test = models.ForeignKey(ScreeningTestDetails, on_delete=models.CASCADE, db_column="screening_test_id")
    question_type = models.CharField(max_length=255, null=True, blank=True)
    question = models.TextField(null=True, blank=True)
    options = models.TextField(null=True, blank=True)
    answer = models.SmallIntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.screening_test)

    class Meta:
        app_label = 'screening_test'
        verbose_name_plural = 'screening Test Questions'
        db_table = 'screening_test_questions'

class GlobalScreeningTestQuestions(models.Model):
    id = models.AutoField(primary_key=True)
    question = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.question

    class Meta:
        app_label = 'screening_test'
        verbose_name_plural = 'Global Screening Test Questions'
        db_table = 'global_screening_test_questions'