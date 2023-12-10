from django.urls import path
from . import views

urlpatterns = [
    path('vocabulary/', views.VocabularyView.as_view()),
    path('vocabulary/<str:vocab_id>/', views.VocabularyDetailView.as_view())
]
