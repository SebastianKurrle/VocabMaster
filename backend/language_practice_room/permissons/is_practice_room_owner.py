from rest_framework import permissions


class IsPracticeRoomOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, room):
        return room.owner == request.user