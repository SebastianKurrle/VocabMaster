from django.db import models
from uuid import uuid4
from vocabulary_set.models import VocabularySet


class Vocabulary(models.Model):

    id = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    nativeWord = models.CharField(max_length=255)
    foreignWord = models.CharField(max_length=255)
    vocabSet = models.ForeignKey(VocabularySet, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.nativeWord} - {self.foreignWord}'
