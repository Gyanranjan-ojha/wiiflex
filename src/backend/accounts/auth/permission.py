from rest_framework.exceptions import PermissionDenied, AuthenticationFailed
from rest_framework.permissions import BasePermission
from accounts.models import User

class SuperAdminPermission(BasePermission):
    """
    Permission class to restrict access to super admin users only.

    This permission class allows access only to users who have super admin privileges.
    If the user does not have super admin privileges, a PermissionDenied exception is raised.
    """

    def has_permission(self, request, view):
        # Retrieve the email from the request header
        auth_user_email = request.headers.get("Email")
        
        if not auth_user_email:
            raise AuthenticationFailed("User Email not provided in request header.")

        try:
            # Retrieve the user based on the email
            user = User.objects.get(email=auth_user_email)
        except User.DoesNotExist:
            raise AuthenticationFailed("User with provided Email does not exist.")

        if not user.is_superuser:
            raise PermissionDenied("You do not have permission to perform this action.")

        return True
