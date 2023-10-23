from django.db import models
from uuid import uuid4
from language_practice_room.models import LanguagePracticeRoom


class VocabularySet(models.Model):

    id = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    name = models.CharField(max_length=255)
    description = models.TextField(null=True)
    room = models.ForeignKey(LanguagePracticeRoom, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
