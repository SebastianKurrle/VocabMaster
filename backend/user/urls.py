from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import api

urlpatterns = [
    path('user/signup/', api.signup, name='signup'),
    path('user/login/', TokenObtainPairView.as_view(), name='token_obtain'),
    path('user/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/user/', api.get_user, name='get_user'),
    path('user/update/', api.update_user, name='update_user'),
    path('user/update/password/', api.update_password, name='update_user_password'),
    path('user/id/<str:id>/', api.get_user_by_id, name='get_user_by_id'),
    path('user/check-token/', api.check_token, name='check_token')
]
