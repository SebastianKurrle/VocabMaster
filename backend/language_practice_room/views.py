from rest_framework.response import Response
from .serializers import LanguagePracticeRoomSerializer
from rest_framework.views import APIView
from .models import LanguagePracticeRoom


class LanguagePracticeRoomView(APIView):

    def post(self, request):
        serializer = LanguagePracticeRoomSerializer(data=request.data)

        if not serializer.is_valid(raise_exception=True):
            return Response(serializer.errors, status=400)

        serializer.save()

        return Response(serializer.data, status=200)

    def get(self, request):
        practice_rooms = LanguagePracticeRoom.objects.filter(owner=request.user)

        serializer = LanguagePracticeRoomSerializer(practice_rooms, many=True)

        return Response(serializer.data)

