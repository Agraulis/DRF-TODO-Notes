from rest_framework.viewsets import ModelViewSet
from .models import Project, ToDoNote
from .serializers import ProjectSerializer, ToDoNoteSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ToDoNoteModelViewSet(ModelViewSet):
    queryset = ToDoNote.objects.all()
    serializer_class = ToDoNoteSerializer
