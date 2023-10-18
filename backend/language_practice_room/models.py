from django.db import models
from uuid import uuid4
from user.models import User
from backend.settings import DEBUG


class LanguagePracticeRoom(models.Model):

    id = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    name = models.CharField(max_length=255, null=False)
    language = models.CharField(max_length=255, null=False)
    description = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        if DEBUG:
            return f'http://localhost:5173/room/{self.id}'
