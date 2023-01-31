from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserModelSerializerShort(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name')
