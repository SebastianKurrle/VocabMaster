from django.forms import ModelForm
from .models import VocabularySet


class VocabularySetCreateForm(ModelForm):

    class Meta:
        model = VocabularySet
        fields = '__all__'
