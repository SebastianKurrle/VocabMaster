from django.urls import path
from . import views

urlpatterns = [
    path('room/', views.LanguagePracticeRoomView.as_view())
]
