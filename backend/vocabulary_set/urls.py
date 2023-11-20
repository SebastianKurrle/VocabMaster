from django.urls import path
from . import views

urlpatterns = [
    path('set/', views.VocabularySetView.as_view()),
]
