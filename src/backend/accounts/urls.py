"""
URL configuration for dqh_admin_app.
"""

from django.urls import path
from accounts.views import *

urlpatterns = [
    #___________________________GET URL paths______________________________

    #____________________________POST URL paths______________________________
    path('register/', UserRegister.as_view(), name='register'),
    path('login/', UserLogin.as_view(), name='login'),
    path('logout/', UserLogout.as_view(), name='logout'),
]

