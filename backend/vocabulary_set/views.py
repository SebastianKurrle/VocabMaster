from rest_framework.views import APIView
from rest_framework.response import Response
from .forms import VocabularySetCreateForm
from .serializers import VocabularySetSerializer
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

    def get(self, request):
        # Security
        room_id = request.query_params.get('roomId', None)

        if room_id is None:
            return Response({'error': 'Parameter roomId is missing'}, status=400)

        room = get_object_or_404(LanguagePracticeRoom, id=room_id)  # id is in the body of the request data
        self.check_object_permissions(request, room)

        # Filter the Vocabulary Sets
        return self.get_all_vocabulary_sets_from_room(room)

    # Helper Methods
    @staticmethod
    # Create a VocabularySet and returns an error response or a success response
    def create_vocabulary_set(sent_data):
        create_form = VocabularySetCreateForm(data=sent_data)

        if not create_form.is_valid():
            return Response({'status': create_form.errors}, status=400)

        create_form.save()

        return Response({'status': 'success'}, status=201)

    @staticmethod
    # Gets all VocabularySets serialized and returns a response with the data
    def get_all_vocabulary_sets_from_room(room):
        vocab_sets = VocabularySet.objects.filter(room=room)
        serializer = VocabularySetSerializer(vocab_sets, many=True)

        return Response(serializer.data, status=200)


class VocabularySetDetailView(APIView):
    permission_classes = [IsAuthenticated, IsPracticeRoomOwner]

    def get(self, request, set_id):
        # Security
        room_id = request.query_params.get('roomId', None)

        if room_id is None:
            return Response({'error': 'Parameter roomId is missing'}, status=400)

        room = get_object_or_404(LanguagePracticeRoom, id=room_id)
        self.check_object_permissions(request, room)

        if not self.check_vocab_set_is_from_room(room_id, set_id):
            return Response({'error': 'Vocabulary set is not from the given practice room'}, status=400)

        return self.get_vocabulary_set_by_id(set_id)

    @staticmethod
    def get_vocabulary_set_by_id(set_id):
        vocabulary_set = get_object_or_404(VocabularySet, id=set_id)
        serializer = VocabularySetSerializer(vocabulary_set)

        return Response(serializer.data, status=200)

    @staticmethod
    def check_vocab_set_is_from_room(room_id, set_id):
        return len(VocabularySet.objects.filter(id=set_id, room=room_id)) > 0
