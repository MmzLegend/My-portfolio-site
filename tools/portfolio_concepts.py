"""Add the reviewed independent concepts after the legacy portfolio build.
Reads portable project data and tracked images; never deploys or fetches assets.
"""
from pathlib import Path
import html,json,re
CONCEPT_SLUGS = {p['slug'] for p in json.loads(Path(__file__).with_name('portfolio_concepts.json').read_text())}
def apply_concepts(output):
    root=Path(output);origin='https://mmzlegend.github.io/My-portfolio-site/'
    projects=json.loads(Path(__file__).with_name('portfolio_concepts.json').read_text())
    # Reuse existing navigation and footer without changing the established portfolio identity.
    ref=(root/'portfolio/eon-immersive.html').read_text();prefix=ref.split('<main id="main">')[0];suffix='</main>'+ref.split('</main>',1)[1]
    assets=root/'images/concepts';assets.mkdir(exist_ok=True)
    for p in projects:
     title=html.escape(p['name']);slug=p['slug'];desc=html.escape(p['desc']);discipline=html.escape(p['discipline'])
     head=prefix.replace('EON Immersive — website',p['name']).replace('An immersive studio concept that brings imagined places to life through cinematic design and interactive browser-based 3D.',p['desc']).replace('portfolio/eon-immersive.html','portfolio/'+slug+'.html')
     back='3d-design.html' if p['category']=='3D & VR' else 'web-development.html'
     demo='Explore the rotatable model' if p['category']=='3D & VR' else 'Explore the concept demo'
     gallery=''
     if p['category']=='3D & VR':
      gallery='<section class="wrap concept-gallery"><p class="eyebrow">Actual model renders and matching plan</p><h2>Architecture beyond the screen.</h2><div class="concept-gallery-grid">'+''.join(f'<figure><a href="../images/concepts/luma-galleria-{name}.jpg"><img src="../images/concepts/luma-galleria-{name}.jpg" loading="lazy" alt="Luma Galleria {label}"></a><figcaption>{label}</figcaption></figure>' for name,label in [('arrival','Landscaped entrance and canopy'),('interior','Atrium interior and glazed roof'),('cutaway','Cutaway showing room fit-outs'),('top-labelled','Model plan view with labels'),('plan','Matching dimensioned 2D plan')])+'</div></section>'
     main=f'''<main id="main"><section class="site-case-hero concept-hero"><div class="wrap world-topline"><a href="{back}">← {discipline}</a><span>Self-initiated concept / 2026</span></div><div class="wrap"><p class="eyebrow">{discipline}</p><h1>{title}</h1><p class="lead">{desc}</p><div class="actions"><a class="button" href="https://mmzlegend.github.io/{slug}/">{demo} ↗</a><a class="text-link" href="https://github.com/MmzLegend/{slug}">View project source ↗</a></div><div class="site-case-window"><img src="../images/concepts/{p['image']}" alt="{title} {'actual architectural model render' if p['category']=='3D & VR' else 'working concept preview'}"></div></div></section><section class="wrap case-content"><div class="case-story"><div><p class="eyebrow">Independent portfolio project</p><h2>Design and implementation</h2><p>Muhammad Mukhtar Zikirullahi · 2026</p><p>{discipline}</p></div><div><h2>The approach</h2><p>{html.escape(p['approach'])}</p><h2>What was verified</h2><p>{html.escape(p['proof'])}</p><h2>Scope and honest limits</h2><p>{html.escape(p['limit'])}</p><p>No client commission, user-research findings or commercial outcomes are claimed.</p></div></div></section>{gallery}'''
     (root/'portfolio'/f'{slug}.html').write_text(head+main+suffix)
    def card(p,relative=''):
     s=p['slug'];return f'<article class="work-card" data-category="{html.escape(p["category"])}"><a class="work-image" href="{relative}portfolio/{s}.html"><img src="{relative}images/concepts/{p["image"]}" loading="lazy" alt="{p["name"]} concept preview"></a><div class="work-meta"><span>{html.escape(p["discipline"])}</span><span>Self-initiated concept</span></div><h3><a href="{relative}portfolio/{s}.html">{p["name"]}</a></h3><p>{p["desc"]}</p></article>'
    def close_div(s,start):
     depth=0
     for m in re.finditer(r'<div\b[^>]*>|</div>',s[start:]):
      depth+= -1 if m.group().startswith('</') else 1
      if depth==0:return start+m.start()
     raise ValueError('No matching div')
    p=root/'portfolio.html';s=p.read_text();start=s.index('<div class="work-grid">');end=close_div(s,start);s=s[:end]+''.join(card(p) for p in projects)+s[end:];p.write_text(s)
    # Add domain-specific collections without rewriting existing Eon or Fiffy content.
    for filename,chosen,label in [('web-development.html',projects[:5],'Independent digital concepts'),('3d-design.html',projects[5:],'Original architectural design')]:
     p=root/'portfolio'/filename;s=p.read_text();section=f'<section class="section wrap"><div class="section-heading"><div><p class="eyebrow">Self-initiated / 2026</p><h2>{label}</h2></div></div><div class="work-grid">'+''.join(card(x,'../').replace('../portfolio/','') for x in chosen)+'</div></section>';s=s.replace('</main>',section+'</main>',1);p.write_text(s)
    # Give recent work a visible route from the homepage while preserving all existing sections.
    p=root/'index.html';s=p.read_text();section='<section class="section wrap"><div class="section-heading"><div><p class="eyebrow">Independent concepts / 2026</p><h2>Recent explorations.</h2></div><a class="text-link" href="portfolio.html">Explore all work ↗</a></div><div class="work-grid">'+''.join(card(projects[i]) for i in [0,4,5])+'</div></section>';s=s.replace('</main>',section+'</main>',1);p.write_text(s)
    if '/* Independent 2026 concepts:' not in (root/'css/worlds.css').read_text():
     with (root/'css/worlds.css').open('a') as f:f.write('\n/* Independent 2026 concepts: retain the shared portfolio system. */\n.concept-hero{background:#e9e8dd}.concept-hero h1{max-width:100%;}.concept-gallery{padding-top:2rem;padding-bottom:5rem}.concept-gallery-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:2rem;margin-top:2rem}.concept-gallery figure{margin:0}.concept-gallery img{width:100%;display:block}.concept-gallery figcaption{padding-top:.8rem;font-size:.9rem;color:#526054}@media(max-width:700px){.concept-gallery-grid{grid-template-columns:1fr}}\n')
    p=root/'sitemap.xml';s=p.read_text();s=re.sub(r'<url><loc>[^<]*/portfolio/(?:'+ '|'.join(CONCEPT_SLUGS) +r')\.html</loc></url>','',s);s=s.replace('</urlset>',''.join(f'<url><loc>{origin}portfolio/{p["slug"]}.html</loc></url>' for p in projects)+'</urlset>');p.write_text(s)
