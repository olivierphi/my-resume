from django.conf import settings
from django.core import management
from django.core.management.base import BaseCommand
from django.test import Client

try:
    from djlint import reformat as djlint_reformat
except ImportError:
    djlint_reformat = None


class Command(BaseCommand):
    help = "Build resume's static files for deployment"
    #
    # def add_arguments(self, parser):
    #     parser.add_argument("poll_ids", nargs="+", type=int)

    def handle(self, *args, **options):
        settings.DIST_DIR.mkdir(exist_ok=True)

        self.stdout.write("Building Tailwind CSS file...")
        management.call_command("tailwind", "build", verbosity=1)
        self.stdout.write("Collecting static files...")
        management.call_command(
            "collectstatic", verbosity=1, interactive=False, clear=True
        )

        client = Client()

        self.stdout.write("Building 'index.html' file...")
        response = client.get("/")
        with open(settings.DIST_DIR / "index.html", "wt") as f:
            html = response.content.decode()
            if djlint_reformat:
                self.stdout.write("Reformatting 'index.html' with djLint...")
                html = djlint_reformat.formatter(djlint_reformat.Config("-"), html)
            f.write(html)

        self.stdout.write(self.style.SUCCESS("Successfully built."))
