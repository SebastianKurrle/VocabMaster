from rest_framework import permissions
from language_practice_room.models import LanguagePracticeRoom


class IsVocabularySetOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, vocab_set):
        # Checks if a room exists with the VocabualrySet room foreignkey and the current user
        # Example Room with foreignkey from vocab_set exists but not with this user functions returns False
        return len(LanguagePracticeRoom.objects.filter(id=vocab_set.room.id, owner=request.user)) > 0
