import {mkdir,readFile,writeFile} from 'node:fs/promises'
import path from 'node:path'
const root=new URL('..',import.meta.url).pathname
const output=path.join(root,'dist/client'), site='https://onemorephoton.com'
const template=await readFile(path.join(output,'index.html'),'utf8')
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')
const posts=[
 {path:'/blog/how-far-for-dark-skies/',title:'How far must you travel for a dark sky?',description:'Why nearby towns can matter more than distant cities. Explore an illustrative skyglow experiment, the difference between SQM and Bortle, and the limits of population-distance estimates.',date:'2026-11-15',image:'/stories/seahorse/after.webp'},
 {path:'/stories/seahorse/',title:'A blue lantern. Two November nights.',description:'Two observing locations, a changing forecast, 63 exposures, and a glow that was not part of the nebula.',image:'/stories/seahorse/after.webp'},
]
for(const page of [{path:'/blog/',title:'Blog — Notes from Under the Sky',description:'The science behind the light and the choices behind a photograph. Dark-sky experiments and observing stories by Aous Abdo.',image:'/og.png'},posts[0]]) {
 const canonical=site+page.path, title=page.title+' — One More Photon'
 let html=template.replace(/<title>.*?<\/title>/,`<title>${esc(title)}</title>`).replace(/<meta name="description" content="[^"]*"\s*\/?>/,`<meta name="description" content="${esc(page.description)}"/>`)
 for(const pattern of [/<link rel="canonical"[^>]*>/g,/<meta property="og:[^"]+"[^>]*>/g,/<meta name="twitter:[^"]+"[^>]*>/g])html=html.replace(pattern,'')
 const article=page.path!='/blog/'
 const schema=article?{'@context':'https://schema.org','@type':'BlogPosting',headline:page.title,description:page.description,datePublished:posts[0].date,author:{'@type':'Person',name:'Aous Abdo',url:site+'/about/'},image:site+page.image,mainEntityOfPage:canonical,isPartOf:{'@type':'Blog',name:'One More Photon Blog',url:site+'/blog/'}}:{'@context':'https://schema.org','@type':'Blog',name:'One More Photon Blog',url:canonical,description:page.description,blogPost:posts.map(p=>({'@type':'BlogPosting',headline:p.title,url:site+p.path}))}
 const meta=`<link rel="canonical" href="${canonical}"/><link rel="alternate" type="application/rss+xml" title="One More Photon Blog" href="${site}/blog/feed.xml"/><meta property="og:title" content="${esc(title)}"/><meta property="og:description" content="${esc(page.description)}"/><meta property="og:type" content="${article?'article':'website'}"/><meta property="og:url" content="${canonical}"/><meta property="og:image" content="${site+page.image}"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${esc(title)}"/><meta name="twitter:description" content="${esc(page.description)}"/><meta name="twitter:image" content="${site+page.image}"/>${article?'<meta property="article:published_time" content="2026-11-15T00:00:00-05:00"/>':''}<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script>`
 html=html.replace('</head>',meta+'</head>')
 const directory=path.join(output,page.path);await mkdir(directory,{recursive:true});await writeFile(path.join(directory,'index.html'),html)
}
const feed=`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>One More Photon — Notes from Under the Sky</title><link>${site}/blog/</link><description>Science, dark skies, and the work behind the photographs. By Aous Abdo.</description><language>en</language><atom:link href="${site}/blog/feed.xml" rel="self" type="application/rss+xml"/>${posts.map(p=>`<item><title>${esc(p.title)}</title><link>${site+p.path}</link><guid isPermaLink="true">${site+p.path}</guid><description>${esc(p.description)}</description>${p.date?`<pubDate>${new Date(p.date+'T00:00:00-05:00').toUTCString()}</pubDate>`:''}</item>`).join('')}</channel></rss>`
await writeFile(path.join(output,'blog/feed.xml'),feed)
console.log('Generated blog index, article metadata, structured data and RSS feed.')
