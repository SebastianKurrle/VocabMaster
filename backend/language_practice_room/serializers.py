from rest_framework import serializers
from .models import LanguagePracticeRoom


class LanguagePracticeRoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = LanguagePracticeRoom
        fields = (
            'id',
            'name',
            'language',
            'description',
            'owner',
            'get_absolute_url'
        )

