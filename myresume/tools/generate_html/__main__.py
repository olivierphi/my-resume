from ...components.layout import page
from ...settings import DIST_DIR

if __name__ == "__main__":
    with (DIST_DIR / "index.html").open("w") as file:
        file.write(page())
    print("HTML page generated.")
