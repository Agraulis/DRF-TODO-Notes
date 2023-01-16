from django.db import models
from users.models import User


class Project(models.Model):
    name = models.CharField(max_length=64)
    link = models.URLField()
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class ToDoNote(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    created_on = models.DateTimeField()
    updated_on = models.DateTimeField()
    created_by = models.ForeignKey(User, models.PROTECT)
    is_active = models.BooleanField(default=True)
