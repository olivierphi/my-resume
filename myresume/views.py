from typing import TYPE_CHECKING

from django.http import HttpResponse
from django.shortcuts import render

from . import db

if TYPE_CHECKING:
    from django.http import HttpRequest

    from .domain import Lang


def index(request: "HttpRequest", *, lang: "Lang" = "en") -> HttpResponse:
    setattr(request, "LANG", lang)

    return render(
        request,
        "myresume/index.html",
        {
            "i18n_data": db.i18n(lang),
            "document_data": db.document(lang),
            "bio_data": db.bio(lang),
            "tech_data": db.tech(),
            "jobs_data": db.job_experience(lang),
            "projects_data": db.projects(lang),
        },
    )
