import functools
import tomllib
from typing import TYPE_CHECKING, Literal, NotRequired

from . import settings

if TYPE_CHECKING:
    from datetime import date
    from typing import TypedDict


if TYPE_CHECKING:

    class DocumentData(TypedDict):
        subtitle: str
        meta: "DocumentMetaData"

    class DocumentMetaData(TypedDict):
        lang: Literal["en", "fr"]
        title: str
        description: str
        keywords: list[str]

    class BioData(TypedDict):
        name: str
        birth: "date"
        job_title: str
        nationality: str
        email: str
        url: str
        mastodon: str
        github_id: str

    class TechnologiesData(TypedDict):
        main: list["MainTechnologyData"]
        others: list["OtherTechnologyData"]

    class MainTechnologyData(TypedDict):
        title: str
        icon: str
        url: NotRequired[str]

    class OtherTechnologyData(TypedDict):
        title: str
        icon: str
        url: NotRequired[str]
        contributor_url: NotRequired[str]


@functools.cache
def i18n() -> dict[str, dict[dict, str | list]]:
    return _parse_data_file("i18n.toml")  # type: ignore


@functools.cache
def document() -> "DocumentData":
    return _parse_data_file("document.toml") | {"lang": settings.LANG}  # type: ignore


@functools.cache
def bio() -> "BioData":
    return _parse_data_file("bio.toml")  # type: ignore


@functools.cache
def tech() -> "TechnologiesData":
    return _parse_data_file("technologies.toml")  # type: ignore


def _parse_data_file(file_name: str) -> dict:
    file_path = settings.DATA_DIR / settings.LANG / file_name
    with file_path.open("rb") as file:
        return tomllib.load(file)
