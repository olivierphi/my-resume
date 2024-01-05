from django.apps import AppConfig


class MyResumeConfig(AppConfig):
    name = "myresume"

    def ready(self) -> None:
        from . import db

        db.clear_cache()
