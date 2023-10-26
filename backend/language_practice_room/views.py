from rest_framework.response import Response
from .serializers import LanguagePracticeRoomSerializer
from rest_framework.views import APIView
from .models import LanguagePracticeRoom
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from .permissons.is_practice_room_owner import IsPracticeRoomOwner


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


class LanguagePracticeRoomDetailView(APIView):

    permission_classes = [IsAuthenticated, IsPracticeRoomOwner]

    def get(self, request, room_id):
        room = get_object_or_404(LanguagePracticeRoom, id=room_id)
        self.check_object_permissions(request, room)
        serializer = LanguagePracticeRoomSerializer(room)

        return Response(serializer.data)

    def put(self, request, room_id):
        room = get_object_or_404(LanguagePracticeRoom, id=room_id)
        self.check_object_permissions(request, room)

        serializer = LanguagePracticeRoomSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        serializer.update(room, serializer.validated_data)

        return Response(status=200)

    def delete(self, request, room_id):
        room = get_object_or_404(LanguagePracticeRoom, id=room_id)
        self.check_object_permissions(request, room)

        room.delete()

        return Response(status=200)

