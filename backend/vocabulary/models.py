from django.db import models
from uuid import uuid4
from vocabulary_set.models import VocabularySet


class Vocabulary(models.Model):

    id = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    native_word = models.CharField(max_length=255)
    foreign_word = models.CharField(max_length=255)
    vocab_set = models.ForeignKey(VocabularySet, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id)
