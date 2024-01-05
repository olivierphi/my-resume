import argparse
import logging
import subprocess
import sys
import time
from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand
from playwright.sync_api import Browser, sync_playwright

from ... import db

_logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Build resume's PDF files from static HTML files"

    def add_arguments(self, parser: argparse.ArgumentParser) -> None:
        parser.add_argument(
            "--address",
            type=str,
            help="address to use to start the web server",
            default="127.0.0.1",
        )
        parser.add_argument(
            "--port", type=int, help="port to use to start the web server", default=3001
        )

    def handle(self, *args, address: str, port: int, **options):
        if not settings.DIST_DIR.exists():
            self.stdout.write(
                self.style.ERROR(
                    f"Directory '{settings.DIST_DIR}' does not exist. "
                    "Please run 'python manage.py build_resume' first."
                )
            )
            return

        # Yes, all this code could be extracted to smaller functions... But it's just
        # quick and dirty code to generate an over-engineered resume anyway ^_^
        with self._start_webserver(address=address, port=port) as static_dir_webserver:
            time.sleep(1)  # let the web server start

            try:
                retcode = static_dir_webserver.poll()
                if retcode is not None:
                    _logger.error(
                        "Web server failed to start: %s",
                        (
                            static_dir_webserver.stderr.read()
                            if static_dir_webserver.stderr
                            else "[can't retrieve error]"
                        ),
                    )
                    exit(retcode)
                self.stdout.write("Web server started.")
                self.stdout.write("")

                with sync_playwright() as playwright:
                    chromium = playwright.chromium
                    browser = chromium.launch()
                    for page in db.pages():
                        pdf_path = page.get("target_static_pdf")
                        if not pdf_path:
                            continue

                        self.stdout.write(
                            f"Building '{self.style.SUCCESS(pdf_path)}' file from "
                            f"HTML page '{self.style.SUCCESS(page['url_path'])}'..."
                        )

                        self._convert_to_pdf(
                            browser=browser,
                            address=address,
                            port=port,
                            url_path=page["url_path"],
                            pdf_path=settings.DIST_DIR / pdf_path,
                        )
                        self.stdout.write("PDF file built.")
                        self.stdout.write("")

                    browser.close()
            finally:
                self.stdout.write("Stopping Web server...")
                static_dir_webserver.kill()
                self.stdout.write("Web server stopped.")

    def _start_webserver(self, *, address: str, port: int) -> subprocess.Popen:
        self.stdout.write(f"Starting web server on http://{address}:{port}")

        cmd = [
            sys.executable,
            "-m",
            "http.server",
            "--directory",
            "dist/",
            "--bind",
            address,
            str(port),
        ]

        return subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )

    def _convert_to_pdf(
        self,
        *,
        browser: Browser,
        address: str,
        port: int,
        url_path: str,
        pdf_path: Path,
        protocol: str = "http",
    ) -> None:
        url_path = f"/{url_path.lstrip('/')}"  # normalise path, so that it always starts with a "/"
        target_url = f"{protocol}://{address}:{port}{url_path}"

        page = browser.new_page()

        self.stdout.write(f"Visiting '{target_url}' via Playwright")
        page.goto(target_url)

        self.stdout.write(f"Printing page to PDF '{pdf_path}' via Playwright")
        page.pdf(
            path=pdf_path,
            format="A4",
            page_ranges="1",
            print_background=True,
        )
        self.stdout.write("Page printed to PDF")
