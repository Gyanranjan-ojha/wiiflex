"""
Django settings for core project.
"""

from pathlib import Path
from .config import env_settings
from os import path
from django.utils import timezone

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Setting up environment files for current environment, secret_key and allowed_hosts
django_settings = env_settings.django_env()

CURRENT_ENVIRONMENT = django_settings["CURRENT_ENVIRONMENT"]
SECRET_KEY = django_settings["SECRET_KEY"]
DEBUG = django_settings["DEBUG"]
ALLOWED_HOSTS = django_settings["DJANGO_ALLOWED_HOSTS"].split(",")

# Django administration custom name 
ADMIN_SITE_HEADER = "WIIFLEX Administration"


# Application definition

DEFAULT_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
PACKAGE_APPS = [
    'corsheaders', # For CORS-HEADERS ISSUE
    'rest_framework',  # DRF Package
    'rest_framework_json_api',
    'django_extensions', #Package to access abstarct models
    'django_filters', # Used with DRF
]
CUSTOM_APPS = [
    'accounts.apps.AccountsConfig', # accounts app
    'company.apps.CompanyConfig', # company app
    'job.apps.JobConfig', # job app
]
INSTALLED_APPS = DEFAULT_APPS + PACKAGE_APPS + CUSTOM_APPS

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

# Django Auth User Model Setup
AUTH_USER_MODEL = 'accounts.User'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

mysql_settings = env_settings.mysql_env()

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': mysql_settings["MYSQL_DB"],
        'HOST': mysql_settings["MYSQL_HOST"],
        'USER': mysql_settings["MYSQL_USER"],
        'PASSWORD': mysql_settings["MYSQL_PASSWORD"],
        'PORT': mysql_settings["MYSQL_PORT"],
        'OPTIONS':{
            'charset': 'utf8mb4',
            'use_unicode':True,
            'init_command': f'ALTER DATABASE {mysql_settings["MYSQL_DB"]} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci',
        },
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    # {
    #     'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    # },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = '/api/static/'
STATIC_ROOT = path.join(BASE_DIR, 'static')

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Rest Framework all credentials
REST_FRAMEWORK = {
    'EXCEPTION_HANDLER': 'rest_framework_json_api.exceptions.exception_handler',
    
    'DEFAULT_AUTHENTICATION_CLASSES': [],
    
    'DEFAULT_PERMISSION_CLASSES': [],
}

if CURRENT_ENVIRONMENT in ("test", "production"):
    # Django SSL certificate access
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')


FE_DOMAIN = env_settings.FE_DOMAIN

# CORS MIDDLEWARE settings
CORS_ALLOWED_ORIGINS = [
    FE_DOMAIN,
]

CORS_ALLOW_METHODS = [
    'GET',
    'POST',
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
    'XMLHttpRequest',
    'Access-Control-Request-Headers',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin',
    'X-Api-Key',
    'sessionid',
]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = True
CORS_ORIGIN_ALLOW_ALL = True

# CSRF MIDDLEWARE settings
CSRF_TRUSTED_ORIGINS = [
    FE_DOMAIN,
]

CSRF_COOKIE_HTTPONLY = True #False
CSRF_COOKIE_SECURE = True
CSRF_COOKIE_SAMESITE = 'None'

# Session MIDDLEWARE settings
SESSION_ENGINE = 'django.contrib.sessions.backends.db'
SESSION_COOKIE_NAME = 'sessionid'
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SECURE = True
# SESSION_COOKIE_AGE = 1800
SESSION_COOKIE_SAMESITE = 'None'
SESSION_EXPIRE_AT_BROWSER_CLOSE = True
SESSION_SAVE_EVERY_REQUEST = True

SECURE_SSL_REDIRECT = False #True

# Save HubSpot uploaded files in media folder
MEDIA_ROOT = path.join(BASE_DIR, 'media')

# Logging
LOG_DIR = path.join(BASE_DIR, 'logs/')

# Get the current UTC date
current_date = timezone.now().strftime('%Y-%m-%d')

LOG_FILE = f'api_{current_date}.log'
LOG_PATH = path.join(LOG_DIR, LOG_FILE)

LOGGER_LEVEL = 'INFO'

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'custom_verbose': {
            'format': '[%(levelname)s] %(asctime)s %(name)s: %(message)s',
            'datefmt': '%d/%b/%Y %H:%M:%S UTC',
        },
    }, 
    'handlers': {
        'file': {
            'level': LOGGER_LEVEL,
            'class': 'logging.handlers.TimedRotatingFileHandler',
            'filename': LOG_PATH,
            'when': 'midnight',  # 'midnight' for daily rotation
            'interval': 1,  # Interval set to 1 day
            'backupCount': 30,  # Keep 30 days' worth of logs
            'formatter': 'custom_verbose',
            'encoding': 'utf8',
        },
    },
    'loggers': {
        'WIIFLEX_API': {
            'handlers': ['file'],
            'level': LOGGER_LEVEL,
            'propagate': True,
        },
    },
}