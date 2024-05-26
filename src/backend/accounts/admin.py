from django.contrib.auth.admin import UserAdmin
from django.contrib import admin
from accounts.models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User
    ordering = ['created_at']
    add_fieldsets = (
        (None, {
        'classes': ('wide',),
        'fields': ('email', 'password1', 'password2'),
        }),
    )
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('Groups', {'fields': ('groups',)}), 
    )
    list_display = ('email', 'is_active', 'is_staff','is_superuser', 'created_at',)
    search_fields = ('email',)
    ordering = ('created_at',)