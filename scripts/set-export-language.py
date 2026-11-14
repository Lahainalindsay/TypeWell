"""Set the document language from localized route metadata after static export."""
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
