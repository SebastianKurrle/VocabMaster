from django.forms import ModelForm
from .models import Vocabulary


class VocabularyCreateForm(ModelForm):

    class Meta:
        model = Vocabulary
        fields = '__all__'
