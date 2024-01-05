from typing import TYPE_CHECKING

from django.conf import settings

if TYPE_CHECKING:
    from django.http import HttpRequest


def resume_lang(request: "HttpRequest") -> "ResumeLanguageData":
    return {
        "available_langs": ("en", "fr"),
        "current_lang": getattr(request, "LANG", settings.LANG),  # type: ignore
    }


def root_path(request: "HttpRequest") -> dict[str, str]:
    return {
        "ROOT_PATH": settings.ROOT_PATH,
    }


if TYPE_CHECKING:
    from typing import TypedDict

    from .domain import Lang

    class ResumeLanguageData(TypedDict):
        available_langs: tuple[Lang, ...]
        current_lang: Lang
