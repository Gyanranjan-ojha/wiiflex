"""
URL configuration for accounts.
"""

from django.urls import path
from accounts.views import (
    UserRegister,
    UserLogin,
    UserLogout,
    VerifyEmailView,
    AllUsersAPIView,
)

urlpatterns = [
    #___________________________GET URL paths______________________________
    path('verify_email/<uuid:token>/', VerifyEmailView.as_view(), name='verify_email'),
    path('users/', AllUsersAPIView.as_view(), name='users'),

    #____________________________POST URL paths______________________________
    path('register/', UserRegister.as_view(), name='register'),
    path('login/', UserLogin.as_view(), name='login'),
    path('logout/', UserLogout.as_view(), name='logout'),
]

