from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination

from .models import Project, ToDoNote
from .serializers import ProjectSerializer, ToDoNoteSerializer
from .filters import ProjectFilter, ToDoNoteFilter

import datetime
from rest_framework import permissions


class ProjectLimitOffsetPaginationViewSet(LimitOffsetPagination):
    default_limit = 10


class ToDoNoteLimitOffsetPaginationViewSet(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectLimitOffsetPaginationViewSet
    filterset_class = ProjectFilter
    permission_classes = [permissions.IsAuthenticated]


class ToDoNoteModelViewSet(ModelViewSet):
    queryset = ToDoNote.objects.all()
    serializer_class = ToDoNoteSerializer
    pagination_class = ToDoNoteLimitOffsetPaginationViewSet
    filterset_class = ToDoNoteFilter

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance,
                                         data={'is_active': False,
                                               'created_on': datetime.datetime.today(),
                                               'updated_on': datetime.datetime.today()},
                                         partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
