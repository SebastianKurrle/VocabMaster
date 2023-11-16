from rest_framework import serializers
from .models import VocabularySet


class VocabularySetSerializer(serializers.ModelSerializer):

    class Meta:
        model = VocabularySet
        fields = '__all__'
