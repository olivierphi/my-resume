import functools
import tomllib
from typing import TYPE_CHECKING, Literal

from . import settings

if TYPE_CHECKING:
    from datetime import date
    from typing import TypedDict


if TYPE_CHECKING:

    class BioData(TypedDict):
        name: str
        birth: "date"
        job_title: str
        nationality: str
        email: str
        url: str
        mastodon: str
        github_id: str

    class DocumentMetaData(TypedDict):
        lang: Literal["en", "fr"]
        title: str
        description: str
        keywords: list[str]

    class DocumentData(TypedDict):
        subtitle: str
        meta: DocumentMetaData


@functools.cache
def bio() -> "BioData":
    return _parse_data_file("bio.toml")  # type: ignore


@functools.cache
def document() -> "DocumentData":
    return _parse_data_file("document.toml") | {"lang": settings.LANG}  # type: ignore


def _parse_data_file(file_name: str) -> dict:
    file_path = settings.DATA_DIR / settings.LANG / file_name
    with file_path.open("rb") as file:
        return tomllib.load(file)
