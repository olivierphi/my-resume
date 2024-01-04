from typing import TYPE_CHECKING

from django import template
from django.templatetags.static import static
from django.utils.safestring import mark_safe

if TYPE_CHECKING:
    from myresume.db import MainTechnologyData, OtherTechnologyData

register = template.Library()


@register.simple_tag
def about_section_icon(icon: str):
    return mark_safe(f'<img src="{static(icon)}" alt="">')


@register.simple_tag
def about_section_title(title: str):
    return mark_safe(f'<h4 class="text-lg mt-1 mb-2">{title}</h4>')


@register.simple_tag
def main_section_title(title: str, *, icon: str):
    return mark_safe(
        '<h3 class="flex text-4xl my-3 text-red-900 text-bold">'
        f'<img src="{static(icon)}" alt="" />'
        f"{title}"
        "</h3>"
    )


@register.inclusion_tag("myresume/main/molecules/_main_tech.html")
def main_section_main_tech(tech: "MainTechnologyData") -> dict:
    return tech | {
        "icon_url": static(f"img/icons/techs/{tech['icon']}.png"),
    }


@register.inclusion_tag("myresume/main/molecules/_other_tech.html")
def main_section_other_tech(tech: "OtherTechnologyData") -> dict:
    return tech | {
        "icon_url": static(f"img/icons/techs/{tech['icon']}.png"),
    }
