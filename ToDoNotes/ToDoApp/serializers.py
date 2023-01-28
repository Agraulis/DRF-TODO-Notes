from rest_framework.serializers import \
    HyperlinkedModelSerializer, StringRelatedField, ModelSerializer
from .models import ToDoNote, Project
from users.serializers import UserModelSerializer


class ProjectSerializer(HyperlinkedModelSerializer):
    users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoNoteSerializer(HyperlinkedModelSerializer):
    project = ProjectSerializer()
    created_by = UserModelSerializer()

    class Meta:
        model = ToDoNote
        fields = '__all__'


class ProjectSerializerBase(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoNoteSerializerBase(ModelSerializer):
    class Meta:
        model = ToDoNote
        fields = '__all__'
