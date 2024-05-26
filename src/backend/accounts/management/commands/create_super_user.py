from accounts.models import User
from django.core.management.base import BaseCommand
from core.config import env_settings
from os import environ

class Command(BaseCommand):
    '''
    Creates a superuser if one does not exist
    '''
    
    def handle(self, *args, **options):
        if not User.objects.filter(is_superuser=True).exists():
            # No superuser exists, create one
            self.stdout.write(self.style.SUCCESS('Creating superuser...'))
            from django.core.management import call_command
            environ['DJANGO_SUPERUSER_PASSWORD'] = env_settings.DJANGO_SUPERUSER_PASSWORD.get_secret_value()
            call_command('createsuperuser', '--email', env_settings.DJANGO_SUPERUSER_EMAIL, '--noinput')
            self.stdout.write(self.style.SUCCESS('Done'))
        else:
            self.stdout.write(self.style.WARNING('Superuser already exists'))