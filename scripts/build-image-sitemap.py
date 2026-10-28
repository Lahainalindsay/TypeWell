"""Discover images from exported, canonical sitemap pages. No hand-maintained URL list."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET

ROOT = Path('out')
NS = 'http://www.sitemaps.org/schemas/sitemap/0.9'
IMAGE = 'http://www.google.com/schemas/sitemap-image/1.1'
ET.register_namespace('', NS)
ET.register_namespace('image', IMAGE)

class Images(HTMLParser):
    def __init__(self):
        super().__init__()
        self.sources = set()
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'img' and attrs.get('src', '').startswith('/'):
            self.sources.add(attrs['src'])

tree = ET.parse(ROOT / 'sitemap.xml')
count = 0
for entry in tree.getroot().findall(f'{{{NS}}}url'):
    url = entry.find(f'{{{NS}}}loc').text
    path = urlsplit(url).path
    page = ROOT / path.lstrip('/') / 'index.html'
    parser = Images()
    parser.feed(page.read_text())
    for src in sorted(parser.sources):
        if not (ROOT / src.lstrip('/')).is_file():
            raise ValueError(f'Missing image: {src} on {url}')
        image = ET.SubElement(entry, f'{{{IMAGE}}}image')
        ET.SubElement(image, f'{{{IMAGE}}}loc').text = 'https://wpmtest.app' + src
        count += 1
tree.write(ROOT / 'sitemap.xml', encoding='utf-8', xml_declaration=True)
print(f'Sitemap enriched with {count} page/image associations')
