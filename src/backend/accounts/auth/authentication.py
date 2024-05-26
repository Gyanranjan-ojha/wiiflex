from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from core.config import env_settings

class APITokenAuthentication(BaseAuthentication):
    """Custom authentication class for API token-based authentication.

    This class extends the BaseAuthentication class provided by Django Rest Framework (DRF).
    It validates incoming requests based on the presence and correctness of an API token
    provided in the 'Authorization' header.
    """
    def authenticate(self, request):
        api_token = env_settings.AUTH_TOKEN.get_secret_value()

        auth_header = request.headers.get("Authorization")

        if not auth_header:
            raise AuthenticationFailed("Invalid or missing Authorization header")

        elif api_token != auth_header:
            raise AuthenticationFailed("Invalid AUTH_TOKEN in Authorization header")

        # Authentication successful
        return None

class NoAuthentication(BaseAuthentication):
    """
    Custom authentication class that performs no authentication.
    """

    def authenticate(self, request):
        return None
