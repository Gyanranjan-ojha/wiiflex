from django.contrib.auth import login, logout
from django.contrib.auth.hashers import check_password, make_password
from django.core.exceptions import ObjectDoesNotExist
# from django.core.mail import EmailMessage
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import EmailVerificationToken, User
from company.models import CompanyDetails, UserCompanyAssociation
# from core.config import env_settings
# from core.settings import EMAIL_HOST_USER


class UserRegister(APIView):
    """This view allows users to create their account."""
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            email = request.data.get('email')
            password = request.data.get('password')
            confirm_password = request.data.get('confirm_password')
            first_name = request.data.get('first_name')
            last_name = request.data.get('last_name')
            company_name = request.data.get('company_name')
            agree_terms = request.data.get('agree_terms')
            
            # Validate input data
            if not all([email, password, confirm_password]):
                return Response({'error': 'Please provide email, password, and confirm password.'}, status=status.HTTP_400_BAD_REQUEST)
            if password != confirm_password:
                return Response({'error': 'Passwords do not match.'}, status=status.HTTP_400_BAD_REQUEST)
            # if User.objects.filter(email=email, is_active=0).exists():
            #     return Response({'error': 'User with this email not verified still.'}, status=status.HTTP_400_BAD_REQUEST)
            if User.objects.filter(email=email, is_active=1).exists():
                return Response({'error': 'User with this email already exists. Please sign in.'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Create or get the company
            company = None
            if company_name:
                company, company_created = CompanyDetails.objects.get_or_create(name=company_name)
                if company_created:
                    company.save()

            # Create the user
            hashed_password = make_password(password)
            user, user_created = User.objects.get_or_create(
                email=email,
                password=hashed_password,
                first_name=first_name or '',
                last_name=last_name or '',
                agree_terms=agree_terms
            )
            if user_created:
                # user.is_active = False  # Deactivate account until it is verified
                user.is_active = True
                user.save()

                # # Create email verification token
                # token = EmailVerificationToken.objects.create(user=user)
                # verification_url = f"{env_settings.FE_DOMAIN}/welcome/{token.token}/"
                # email_subject = 'Verify your email address'
                # email_body = f'Please click <a href="{verification_url}">here</a> to verify your email.'
                
                # email = EmailMessage(
                #     email_subject,
                #     email_body,
                #     EMAIL_HOST_USER,
                #     [user.email],
                # )
                # email.content_subtype = "html"  # Set the email content to HTML
                # email.send()
            
            # associate the user and company
            if company and user:
                try:
                    UserCompanyAssociation.objects.create(user=user, company=company)
                except IntegrityError:
                    pass

            return Response({"message": "User created successfully. Please check your email to verify your account."}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response({"error": "Internal server error."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, token, format=None):
        token = get_object_or_404(EmailVerificationToken, token=token)
        user = token.user
        user.is_active = True
        user.save()
        token.delete()
        return Response({'message': 'Email verified successfully.'}, status=status.HTTP_200_OK)

class UserLogin(APIView):
    """
    This view allows users to authenticate by providing their email and password.
    """
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Please provide both email and password'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email, is_active=1)
        except User.DoesNotExist:
            return Response({'error': 'User not found, please signup'}, status=status.HTTP_404_NOT_FOUND)

        if not check_password(password, user.password):
            return Response({'error': 'Invalid password'}, status=status.HTTP_401_UNAUTHORIZED)

        # if not user.is_active:
        #     return Response({'error': 'User account is not active'}, status=status.HTTP_403_FORBIDDEN)

        login(request, user)

        return Response({"message": "User successfully logged in."},status=status.HTTP_200_OK)

class UserLogout(APIView):
    """
    This view allows authenticated users to log out.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        logout(request)
        return Response({"message": "User logged out."},status=status.HTTP_200_OK)

class AllUsersAPIView(APIView):
    """
    This view fetch all the saved users
    """
    permission_classes = [AllowAny]
    
    def get(self, request):
        try:
            users = User.objects.values(
                    'id',
                    'first_name',
                    'last_name',
                    'email',
                    'created_at',
                )
            if users:
                return Response(users, status=status.HTTP_200_OK)
            else:
                return Response({"message": "No User available"}, status=status.HTTP_204_NO_CONTENT)
            
        except ObjectDoesNotExist as e:
            print(f"No User exists: {e}")
            return Response({"error": "No User exists."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response({"error": "Internal server error."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
