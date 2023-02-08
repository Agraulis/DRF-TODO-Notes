import graphene
from graphene_django import DjangoObjectType
from ToDoApp.models import Project, ToDoNote
from users.models import User


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class NoteType(DjangoObjectType):
    class Meta:
        model = ToDoNote
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)
    all_notes = graphene.List(NoteType)
    all_users = graphene.List(UserType)

    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))

    def resolve_project_by_id(self, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_notes(root, info):
        return ToDoNote.objects.all()

    def resolve_all_users(root, info):
        return User.objects.all()


class NoteMutation(graphene.Mutation):
    class Arguments:
        is_active = graphene.Boolean(required=True)
        id = graphene.ID()

    note = graphene.Field(NoteType)

    @classmethod
    def mutate(cls, root, info, is_active, id):
        note = ToDoNote.objects.get(pk=id)
        note.is_active = is_active
        note.save()
        return NoteMutation(note=note)


class Mutation(graphene.ObjectType):
    update_note = NoteMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
