from typing import TYPE_CHECKING

from django.http import HttpResponse
from django.shortcuts import render

from . import db

if TYPE_CHECKING:
    from django.http import HttpRequest


def index(request: "HttpRequest") -> HttpResponse:
    return render(
        request,
        "myresume/index.html",
        {
            "i18n_data": db.i18n(),
            "document_data": db.document(),
            "bio_data": db.bio(),
            "tech_data": db.tech(),
        },
    )
