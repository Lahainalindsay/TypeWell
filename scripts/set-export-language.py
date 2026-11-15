"""Finalize document languages and fallback titles after static export."""
from html.parser import HTMLParser
from pathlib import Path
import re


class PageLocale(HTMLParser):
    language = None

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag == "meta" and attributes.get("property") == "og:locale":
            self.language = attributes["content"].replace("_", "-")


root = Path("out")
for page in root.rglob("index.html"):
    html = page.read_text(encoding="utf-8")
    header = html.split("</head>", 1)[0]
    parser = PageLocale()
    parser.feed(header)
    route_prefix = page.relative_to(root).parts[0]
    if parser.language and route_prefix == parser.language.split("-", 1)[0]:
        html, replacements = re.subn(r'(<html\b[^>]*\blang=")en(")', rf"\g<1>{parser.language}\2", html, count=1)
        if replacements != 1:
            raise ValueError(f"Expected an English document language in {page}")
        page.write_text(html, encoding="utf-8")


# The fallback component renders its own title. Next's static renderer also
# includes the layout metadata title, so remove that fallback from error exports.
for page in (root / "404.html", root / "404/index.html", root / "_not-found/index.html"):
    if page.is_file():
        html = page.read_text(encoding="utf-8")
        titles = re.findall(r"<title>.*?</title>", html.split("</head>", 1)[0])
        if titles == ["<title>WPMTest — Typing Tests and Practice</title>", "<title>Page Not Found | WPMTest</title>"]:
            page.write_text(html.replace(titles[0], "", 1), encoding="utf-8")
