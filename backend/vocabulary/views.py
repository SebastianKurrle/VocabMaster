from rest_framework.views import APIView
from rest_framework.response import Response
from .forms import VocabularyCreateForm
from .serializers import VocabularySerializer
from vocabulary_set.models import VocabularySet
from rest_framework.permissions import IsAuthenticated
from vocabulary_set.permissons.is_vocabulary_set_owner import IsVocabularySetOwner
from django.shortcuts import get_object_or_404
from .models import Vocabulary


class VocabularyView(APIView):
    permission_classes = [IsAuthenticated, IsVocabularySetOwner]

    def post(self, request):
        # Security
        data = request.data
        vocab_set_id = data.get('vocabSet', None)

        if vocab_set_id is None:
            return Response({'error': 'Parameter vocab_set_id is missing'}, status=400)

        self.post_security(request, vocab_set_id)

        return self.create_vocabulary(data)

    def get(self, request):
        vocab_set_id = request.query_params.get('setId', None)

        if vocab_set_id is None:
            return Response({'error': 'Parameter setId is missing'}, status=400)

        vocab_set = get_object_or_404(VocabularySet, id=vocab_set_id)
        self.check_object_permissions(request, vocab_set)

        return self.get_all_vocabulary_from_set(vocab_set)

    def post_security(self, request, vocab_set_id):
        vocab_set = get_object_or_404(VocabularySet, id=vocab_set_id)
        self.check_object_permissions(request, vocab_set)

    @staticmethod
    def get_all_vocabulary_from_set(vocab_set: VocabularySet):
        vocabulary = Vocabulary.objects.filter(vocabSet=vocab_set)
        serializer = VocabularySerializer(vocabulary, many=True)

        return Response(serializer.data)

    @staticmethod
    def create_vocabulary(sent_data):
        create_form = VocabularyCreateForm(data=sent_data)

        if not create_form.is_valid():
            return Response({'status': create_form.errors}, status=400)

        create_form.save()

        return Response({'status': 'success'}, status=201)
