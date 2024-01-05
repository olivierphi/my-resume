from typing import Literal

# MyPy gives us "error: PEP 695 type aliases are not yet supported" atm for this one:
type Lang = Literal["en", "fr"]  # type: ignore
