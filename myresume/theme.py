# Here are the colours used by our pages
from typing import NamedTuple


class ColorClasses(NamedTuple):
    base: str
    dark: str | None = None
    print: str | None = None

    def __str__(self) -> str:
        return " ".join(filter(None, self))


META_THEME_COLOR = "#4a044e"  # Tailwind's "fuchsia-950"

BODY = ColorClasses(
    "bg-slate-50 text-slate-800",
    dark="dark:bg-slate-950 dark:text-slate-200",
    print="print:bg-white",
)

TITLE = ColorClasses(
    "text-slate-800",
    dark="dark:text-slate-200",
)

SUBTITLE = ColorClasses(
    "text-fuchsia-900",
    dark="dark:text-fuchsia-700",
)

BLOCK_ABOUT = ColorClasses(
    "bg-fuchsia-950 text-slate-50",
    dark="dark:bg-fuchsia-800 dark:text-slate-100",
)

MAIN_SECTION_TITLE = SUBTITLE

MAIN_SECTION_TITLE_ICON = ColorClasses(
    "bg-fuchsia-900 text-slate-50",
    dark="dark:bg-fuchsia-900 text-slate-50",
)

HIGHLIGHT = ColorClasses(
    "text-fuchsia-800",
    dark="dark:text-fuchsia-500",
)
