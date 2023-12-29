from os import environ as env
from pathlib import Path
from typing import Literal

PROJECT_ROOT = Path(__file__).parent.parent

DATA_DIR = PROJECT_ROOT / "myresume" / "data"
DIST_DIR = PROJECT_ROOT / "dist"

LANG: Literal["en", "fr"] = env.get("RESUME_LANG", "en")
assert LANG in ("en", "fr")

DEBUG: bool = env.get("RESUME_DEBUG", "0").lower() in ("1", "true", "yes")
