from html.parser import HTMLParser
from pathlib import Path
from collections import Counter
import json,xml.etree.ElementTree as E
class Page(HTMLParser):
 def __init__(self):super().__init__();self.title='';self.intitle=False;self.meta={};self.canon=[];self.h1=0;self.img=[];self.links=[];self.text=[];self.skip=0
 def handle_starttag(self,t,a):
  d=dict(a)
  if t=='title':self.intitle=True
  if t in ['script','style']:self.skip+=1
  if t=='meta':self.meta[d.get('name',d.get('property',''))]=d.get('content','')
  if t=='link' and d.get('rel')=='canonical':self.canon.append(d.get('href'))
  if t=='h1':self.h1+=1
  if t=='img':self.img.append(d)
  if t=='a':self.links.append(d.get('href',''))
 def handle_endtag(self,t):
  if t=='title':self.intitle=False
  if t in ['script','style']:self.skip=max(0,self.skip-1)
 def handle_data(self,d):
  if self.intitle:self.title+=d
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
 if path not in urls and 'noindex' not in p.meta.get('robots',''):problems.append('missing sitemap')
 for img in p.img:
  if 'alt' not in img or not img['alt']:problems.append('missing image alt '+str(img))
  if img.get('src','').startswith('/') and not (Path('public')/img['src'].lstrip('/')).is_file():problems.append('missing image '+img['src'])
 if problems: errors.extend((path, problem) for problem in problems); print(path,problems)
for key in ['title','description','canonical']:
 counts=Counter((p.title if key=='title' else p.meta.get(key,'') if key=='description' else str(p.canon)) for path,p in pages.items() if not path.startswith(('/404','/_not-found')))
 print('DUPLICATE',key,[(k,v) for k,v in counts.items() if v>1])
print('SITEMAP missing files',[u for u in urls if u not in pages])
print('BROKEN INTERNAL LINKS',sorted(set((path,h) for path,p in pages.items() for h in p.links if h.startswith('/') and h.split('#')[0].split('?')[0] not in pages and not (Path('public')/h.split('#')[0].split('?')[0].lstrip('/')).is_file() and h.split('#')[0].split('?')[0]!=''))[:60])

# The generated export is the contract crawlers receive. Fail on regressions.
for key in ['title', 'description', 'canonical']:
 values=[p.title if key=='title' else p.meta.get(key,'') if key=='description' else str(p.canon) for path,p in pages.items() if not path.startswith(('/404','/_not-found'))]
 errors.extend(('duplicate '+key, value) for value,count in Counter(values).items() if count>1)
for url in urls:
 if url not in pages: errors.append(('sitemap missing page',url))
 elif 'noindex' in pages[url].meta.get('robots',''): errors.append(('noindex in sitemap',url))
for path,p in pages.items():
 for href in p.links:
  target=href.split('#')[0].split('?')[0]
  if target.startswith('/') and target not in pages and not (Path('public')/target.lstrip('/')).is_file(): errors.append((path,'unresolved internal link '+href))
 for key in ['og:image','twitter:image']:
  image=p.meta.get(key,'')
  if image.startswith('https://wpmtest.app/') and not (Path('public')/image.removeprefix('https://wpmtest.app/')).is_file(): errors.append((path,'missing social image '+image))
print('SEO export audit:',len(errors),'errors')
raise SystemExit(1 if errors else 0)

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
