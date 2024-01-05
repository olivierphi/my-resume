from django.conf import settings
from django.urls import include, path, register_converter

from . import path_converters, views

register_converter(path_converters.LanguageCodeConverter, "lang_code")

urlpatterns = [
    path("", views.index, name="index"),
    path("<lang_code:lang>/", views.index, name="index_lang"),
]

if settings.DEBUG:
    urlpatterns += [
        path("__reload__/", include("django_browser_reload.urls")),
    ]
