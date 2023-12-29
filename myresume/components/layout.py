from typing import TYPE_CHECKING

from dominate.tags import (
    body,
    footer as base_footer,
    h1,
    h2,
    head as base_head,
    header as base_header,
    html,
    link,
    meta,
    title as base_title,
)

from .. import db, settings

if TYPE_CHECKING:
    from dominate.tags import dom_tag


def page(*children: "dom_tag") -> str:
    return f"<!DOCTYPE html>{document(*children)}"


def document(*children: "dom_tag") -> "dom_tag":
    return html(
        head(),
        body(
            header(),
            *children,
            footer(),
            cls="bg-slate-900",
        ),
        __pretty=settings.DEBUG,
    )


def static(path: str) -> str:
    return f"/assets/{path}"


def head() -> "dom_tag":
    document_data = db.document()

    return base_head(
        meta(charset="utf-8"),
        base_title(document_data["meta"]["title"]),
        meta(name="viewport", content="width=device-width, initial-scale=1"),
        meta(name="description", content=document_data["meta"]["description"]),
        # style(_FONTS_CSS),
        link(rel="stylesheet", href=static("main.css")),
    )


def header() -> "dom_tag":
    document_data = db.document()

    return base_header(
        h1(
            document_data["meta"]["title"],
            cls="text-slate-50 text-2xl leading-none font-pixel",
        ),
        h2(
            document_data["subtitle"],
            cls="text-slate-50 text-xl leading-none font-pixel",
        ),
        cls="text-center md:mx-auto md:max-w-2xl",
    )


def footer() -> "dom_tag":
    return base_footer("[footer]")
