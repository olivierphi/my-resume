from django.conf import settings
from django.urls import include, path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
]

if settings.DEBUG:
    urlpatterns += [
        path("__reload__/", include("django_browser_reload.urls")),
    ]
