from html.parser import HTMLParser
from pathlib import Path
from collections import Counter
import json,xml.etree.ElementTree as E
class Page(HTMLParser):
 def __init__(self):super().__init__();self.title='';self.intitle=False;self.meta={};self.canon=[];self.h1=0;self.img=[];self.links=[];self.text=[];self.skip=0;self.hreflang={};self.schemas=[];self.schema=None;self.sources=[]
 def handle_starttag(self,t,a):
  d=dict(a)
  if t=='title':self.intitle=True
  if t in ['script','style']:self.skip+=1
  if t=='script' and d.get('type')=='application/ld+json':self.schema=''
  if t=='link' and d.get('rel')=='alternate' and d.get('hreflang'):self.hreflang[d['hreflang']]=d.get('href')
  if t=='meta':self.meta[d.get('name',d.get('property',''))]=d.get('content','')
  if t=='link' and d.get('rel')=='canonical':self.canon.append(d.get('href'))
  if t=='h1':self.h1+=1
  if t=='img':self.img.append(d)
  if t=='source':self.sources.append(d)
  if t=='a':self.links.append(d.get('href',''))
 def handle_endtag(self,t):
  if t=='title':self.intitle=False
  if t=='script' and self.schema is not None:
   self.schemas.append(json.loads(self.schema));self.schema=None
  if t in ['script','style']:self.skip=max(0,self.skip-1)
 def handle_data(self,d):
  if self.intitle:self.title+=d
  if self.schema is not None:self.schema+=d
  if not self.skip:self.text.append(d)
root=Path('out');pages={}; errors=[]
for p in root.rglob('*.html'):
 q=Page();q.feed(p.read_text());pages['/'+str(p.relative_to(root)).replace('index.html','')]=q
sitemap=E.parse(root/'sitemap.xml');ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'};urls=[x.text.replace('https://wpmtest.app','') for x in sitemap.findall('.//s:loc',ns)]
print('PAGES',len(pages),'SITEMAP',len(urls))
for path,p in pages.items():
 if path.startswith(('/404','/_not-found')):continue
 problems=[]
 if not p.title:problems.append('missing title')
 if p.h1!=1:problems.append('h1='+str(p.h1))
 if len(p.canon)!=1:problems.append('canonical count='+str(len(p.canon)))
 if not p.meta.get('description'):problems.append('missing description')
 if path not in urls and path != '/typing-test/' and 'noindex' not in p.meta.get('robots',''):problems.append('missing sitemap')
 for img in p.img:
  if 'alt' not in img:problems.append('missing image alt '+str(img))
  if img.get('src','').startswith('/') and not (Path('public')/img['src'].lstrip('/')).is_file():problems.append('missing image '+img['src'])
 for source in p.img + p.sources:
  for candidate in source.get('srcset', '').split(','):
   if candidate and not (root / candidate.split()[0].lstrip('/')).is_file():
    problems.append('missing responsive image '+candidate.strip())
 if problems: errors.extend((path, problem) for problem in problems); print(path,problems)
for key in ['title','description','canonical']:
 counts=Counter((p.title if key=='title' else p.meta.get(key,'') if key=='description' else str(p.canon)) for path,p in pages.items() if not path.startswith(('/404','/_not-found')) and (key != 'canonical' or path != '/typing-test/'))
 print('DUPLICATE',key,[(k,v) for k,v in counts.items() if v>1])
print('SITEMAP missing files',[u for u in urls if u not in pages])
print('BROKEN INTERNAL LINKS',sorted(set((path,h) for path,p in pages.items() for h in p.links if h.startswith('/') and h.split('#')[0].split('?')[0] not in pages and not (root/h.split('#')[0].split('?')[0].lstrip('/')).is_file() and h.split('#')[0].split('?')[0]!=''))[:60])

if pages['/typing-test/'].canon != pages['/'].canon or '/typing-test/' in urls:
 errors.append(('/typing-test/', 'expected a canonical alias of the homepage outside the sitemap'))
for path, page in pages.items():
 if path.startswith(('/404', '/_not-found')) and not page.title:
  errors.append((path, 'missing 404 title'))

for hub, prefix, count in [
 ('/learn/', '/learn/', 6),
 ('/typing-personality-test/', '/typing-personality-test/profile/', 9)
]:
 targets = {path for path in urls if path.startswith(prefix) and path != hub}
 if len(targets) != count or not targets.issubset(pages[hub].links):
  errors.append((hub, 'missing crawlable links to '+str(sorted(targets.difference(pages[hub].links)))))
alternates = pages['/'].hreflang
if alternates.get('en') != 'https://wpmtest.app/' or alternates.get('x-default') != 'https://wpmtest.app/':
 errors.append(('/', 'missing canonical English hreflang'))
for alternate in set(alternates.values()):
 path = alternate.removeprefix('https://wpmtest.app')
 if path not in pages or pages[path].hreflang != alternates:
  errors.append((path, 'incomplete reciprocal hreflang'))
for path, page in pages.items():
 nodes = [node for schema in page.schemas for node in schema.get('@graph', [schema])]
 kinds = {node.get('@type') for node in nodes}
 if path == '/' and not {'WebSite', 'Organization', 'WebApplication'}.issubset(kinds):
  errors.append((path, 'missing homepage schema entities'))
 if (path.startswith('/blog/') or path == '/privacy/') and 'WebApplication' in kinds:
  errors.append((path, 'WebApplication schema on an editorial or legal page'))
 if path.startswith('/blog/') and path.endswith('-language-revival/'):
  article = next((node for node in nodes if node.get('@type') == 'Article'), {})
  if not {'datePublished', 'publisher', 'author'}.issubset(article) or 'BreadcrumbList' not in kinds:
   errors.append((path, 'incomplete revival article schema'))

# The generated export is the contract crawlers receive. Fail on regressions.
for key in ['title', 'description', 'canonical']:
 values=[p.title if key=='title' else p.meta.get(key,'') if key=='description' else str(p.canon) for path,p in pages.items() if not path.startswith(('/404','/_not-found')) and (key != 'canonical' or path != '/typing-test/')]
 errors.extend(('duplicate '+key, value) for value,count in Counter(values).items() if count>1)
for url in urls:
 if url not in pages: errors.append(('sitemap missing page',url))
 elif 'noindex' in pages[url].meta.get('robots',''): errors.append(('noindex in sitemap',url))
for path,p in pages.items():
 for href in p.links:
  target=href.split('#')[0].split('?')[0]
  if target.startswith('/') and target not in pages and not (root/target.lstrip('/')).is_file(): errors.append((path,'unresolved internal link '+href))
 for key in ['og:image','twitter:image']:
  image=p.meta.get(key,'')
  if image.startswith('https://wpmtest.app/') and not (Path('public')/image.removeprefix('https://wpmtest.app/')).is_file(): errors.append((path,'missing social image '+image))
print('SEO export audit:',len(errors),'errors')
for path, issue in errors:
 print(path, issue)

# Validate every published image sitemap reference against the page and export.
image_ns = {'s':ns['s'], 'image':'http://www.google.com/schemas/sitemap-image/1.1'}
for entry in sitemap.findall('s:url', image_ns):
 path = entry.find('s:loc', image_ns).text.removeprefix('https://wpmtest.app')
 for image in entry.findall('image:image/image:loc', image_ns):
  source = image.text.removeprefix('https://wpmtest.app')
  if source not in {img.get('src') for img in pages[path].img}:
   raise SystemExit(f'Image sitemap references image not on page: {path} {source}')
  if not (root/source.lstrip('/')).is_file():
   raise SystemExit(f'Image sitemap references missing exported asset: {source}')
print('Image sitemap audit passed')

raise SystemExit(1 if errors else 0)
