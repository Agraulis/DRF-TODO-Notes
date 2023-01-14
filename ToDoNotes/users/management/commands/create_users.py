from users.models import User
from django.contrib.auth.models import User as super_user
from django.core.management.base import BaseCommand
from django.utils.crypto import get_random_string


class Command(BaseCommand):
    help = 'Create superuser and random users'

    def add_arguments(self, parser):
        parser.add_argument(
            'total',
            type=int,
            help='Indicates the number of users to be created'
        )

    def handle(self, *args, **kwargs):
        total = kwargs['total']
        try:
            super_user.objects.get(username="Zaxas", is_superuser=True).delete()
        except Exception as e:
            self.stdout.write(self.style.WARNING(e))
        super_user.objects.create_superuser(
            username='Zaxas',
            email=get_random_string(length=7),
            password='Zaxas'
        )
        for _ in range(total):
            new_user = User(
                username=get_random_string(length=7),
                first_name=get_random_string(length=7),
                last_name=get_random_string(length=7),
                email=get_random_string(length=7),
            )
            new_user.save()
        self.stdout.write(self.style.SUCCESS(f'{total} users was created'))
