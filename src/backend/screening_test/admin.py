from django.contrib import admin
from screening_test.models import ScreeningTestDetails, ScreeningTestQuestions, GlobalScreeningTestQuestions

@admin.register(ScreeningTestDetails)
class ScreeningTestDetailsAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "job", "created_at", "updated_at"]
    search_fields = ["name", "job"]
    ordering = ['created_at']

@admin.register(ScreeningTestQuestions)
class ScreeningTestQuestionsAdmin(admin.ModelAdmin):
    list_display = ["id", "screening_test", "question_type", "created_at", "updated_at"]
    search_fields = ["screening_test", "question_type"]
    ordering = ['created_at']

@admin.register(GlobalScreeningTestQuestions)
class GlobalScreeningTestQuestionsAdmin(admin.ModelAdmin):
    list_display = ["id", "question", "created_at", "updated_at"]
    search_fields = ["question"]
    ordering = ['created_at']