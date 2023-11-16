from rest_framework.views import APIView
from rest_framework.response import Response
from .forms import VocabularySetCreateForm
from rest_framework.permissions import IsAuthenticated
from language_practice_room.permissons.is_practice_room_owner import IsPracticeRoomOwner
from .models import VocabularySet
from language_practice_room.models import LanguagePracticeRoom
from django.shortcuts import get_object_or_404


class VocabularySetView(APIView):
    permission_classes = [IsAuthenticated, IsPracticeRoomOwner]

    # API Methods
    def post(self, request):
        # Security
        data = request.data
        room = get_object_or_404(LanguagePracticeRoom, id=data['room'])  # room in data is the room id
        self.check_object_permissions(request, room)

        # Create VocabularySet
        return self.create_vocabulary_set(data)

    # Helper Methods
    @staticmethod
    # Create a VocabularySet and returns an error response or a success response
    def create_vocabulary_set(sent_data):
        create_form = VocabularySetCreateForm(data=sent_data)

        if not create_form.is_valid():
            return Response({'status': create_form.errors}, status=400)

        create_form.save()

        return Response({'status': 'success'}, status=201)
