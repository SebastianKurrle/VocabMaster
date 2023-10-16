from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.shortcuts import get_object_or_404
from .forms import SignupForm
from .models import User
from .serializers import UserSerializer


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def signup(request):
    data = request.data
    message = 'success'
    status = 200

    form = SignupForm({
        'email': data.get('email'),
        'name': data.get('name'),
        'password1': data.get('password1'),
        'password2': data.get('password2')
    })

    if form.is_valid():
        form.save()
    else:
        message = form.errors
        status = 400

    return JsonResponse({'status': message}, status=status)


@api_view(['GET'])
def check_token(request):
    return Response({'status': 'Token is valid'}, status=200)


@api_view(['GET'])
def get_user(request):
    return JsonResponse({
        'id': request.user.id,
        'email': request.user.email,
        'name': request.user.name
    })


@api_view(['PUT'])
def update_user(request):
    user = request.user
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.update(user, serializer.validated_data)

    return Response(status=200)


@api_view(['PUT'])
def update_password(request):
    user = request.user
    old_password = request.data.get('oldPassword')
    new_password = request.data.get('newPassword')

    if old_password != '' and new_password != '' and not user.check_password(old_password):
        return Response({'Error': 'Invalid Password'}, status=400)

    user.set_password(new_password)
    user.save()

    return Response(status=200)


@api_view(['GET'])
def get_user_by_id(request, id):
    user = get_object_or_404(User, id=id)
    serializer = UserSerializer(user)
    return Response(serializer.data)
