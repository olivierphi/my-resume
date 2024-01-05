import re
from typing import TYPE_CHECKING

from django import template
from django.templatetags.static import static
from django.utils.safestring import mark_safe

if TYPE_CHECKING:
    from myresume.db import MainTechnologyData, OtherTechnologyData

register = template.Library()


_CONTENT_LINK_PATTERN = re.compile(r"""<a +(?P<href>href="https://[^"]+") *>""")
_JOB_CONTENT_COMPANY_NAME_PATTERN = re.compile(r"<b>")
_PROJECT_CONTENT_TECH_PATTERN = re.compile(
    r"""<span +class="tech +tech-with-icon +(?P<tech>\w+)" *>"""
)


@register.simple_tag
def about_section_icon(icon: str):
    return mark_safe(f'<img src="{static(icon)}" alt="">')


@register.simple_tag
def about_section_title(title: str):
    return mark_safe(
        f'<h4 class="text-lg mt-1 mb-2 print:text-base print:mt-0 print:mb-1">{title}</h4>'
    )


@register.simple_tag
def main_section_title(title: str, *, icon: str, print_suffix: str | None = None):
    print_suffix_html = (
        ""
        if print_suffix is None
        else f""" <span class="hidden text-xl italic print:inline print:text-base">{print_suffix}</span>"""
    )
    title_parts = (
        '<h3 class="-ml-2 flex items-center text-4xl my-3 text-red-900 text-bold print:text-xl print:!mt-2 print:!mb-1">',
        f'<img src="{static(icon)}" alt="" />',
        f"{title}",
        print_suffix_html,
        "</h3>",
    )
    return mark_safe("".join(title_parts))


@register.inclusion_tag("myresume/main/tags/main_tech.html")
def main_section_main_tech(tech: "MainTechnologyData") -> dict:
    return tech | {
        "icon_url": static(f"img/icons/techs/{tech['icon']}.png"),
    }


@register.inclusion_tag("myresume/main/tags/other_tech.html")
def main_section_other_tech(tech: "OtherTechnologyData") -> dict:
    return tech | {
        "icon_url": static(f"img/icons/techs/{tech['icon']}.png"),
    }


@register.filter
def processed_job_content(content: str) -> str:
    content = _CONTENT_LINK_PATTERN.sub(
        r"""<a \g<href> class="underline" target="_blank" rel="noopener">""",
        content,
    )
    content = _JOB_CONTENT_COMPANY_NAME_PATTERN.sub(
        r"""<b class="font-medium text-red-900">""",
        content,
    )
    return content


@register.filter
def processed_project_content(content: str) -> str:
    content = _CONTENT_LINK_PATTERN.sub(
        r"""<a \g<href> class="underline" target="_blank" rel="noopener">""",
        content,
    )
    content = _PROJECT_CONTENT_TECH_PATTERN.sub(
        _process_project_tech_pattern,
        content,
    )
    return content


def _process_project_tech_pattern(match: re.Match) -> str:
    return (
        """<span class="font-medium text-red-900">"""
        f"""<img src="{static(f"img/icons/techs/{match['tech']}.png")}" """
        """class="size-4 inline-block" width="16" height="16" alt=""> """
    )
