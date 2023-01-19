from django_filters import rest_framework as filters
from .models import Project, ToDoNote

class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class ToDoNoteFilter(filters.FilterSet):
    class Meta:
        model = ToDoNote
        fields = {
            'project': ['exact'],
            'created_on': ['range'],
        }
