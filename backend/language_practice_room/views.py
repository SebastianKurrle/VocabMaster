from rest_framework.response import Response
from .serializers import LanguagePracticeRoomSerializer
from rest_framework.views import APIView


class LanguagePracticeRoomView(APIView):

    def post(self, request):
        serializer = LanguagePracticeRoomSerializer(data=request.data)

        if not serializer.is_valid(raise_exception=True):
            return Response(serializer.errors, status=400)

        serializer.save()

        return Response(serializer.data, status=200)

