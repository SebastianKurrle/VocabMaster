from django.urls import path
from . import views

urlpatterns = [
    path('vocabulary/', views.VocabularyView.as_view())
]
