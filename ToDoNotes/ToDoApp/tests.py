from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APITestCase
from mixer.backend.django import mixer

from .views import ProjectModelViewSet, ToDoNoteModelViewSet
from .models import Project, ToDoNote

import datetime


class TestToDoNotesViewSet(TestCase):

    def test_todo_notes_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/todonotes/')
        view = ToDoNoteModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_todo_note(self):
        note = mixer.blend(ToDoNote)
        client = APIClient()
        test_user = User.objects.create_superuser('admin', 'admin@admin.com', 'admin')
        client.force_authenticate(test_user)
        response = client.put(f'/api/todonotes/{note.id}/', {
            'project': 1,
            'text': 'New text',
            'created_on': datetime.datetime.now(),
            'updated_on': datetime.datetime.now(),
            'created_by': 1,
            'is_active': True,
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        note = ToDoNote.objects.get(id=note.id)
        self.assertEqual(note.text, 'New text')
        client.logout()


class TestProjectViewSetAPI(APITestCase):
    def test_projects_get_list(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
