import { useEffect, useMemo, useRef, useState } from 'react'
import { photographs, groups, type Photograph, type View } from './gallery'
import { Films, FilmPlayer } from './Films'
import { ScienceSummary, ScienceReader, ScienceStories } from './SciencePanel'
import { archiveUrl, relatedProjects, widerProjects } from './atlas-projects'

const imageSrcSet = (v: View) => [900, 2600].map(n => `${n === 900 ? v.thumb : v.src} ${Math.round(v.width * Math.min(1, n / Math.max(v.width, v.height)))}w`).join(', ')
const dateLabel = (date: string) => new Date(date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
const hoursLabel = (hours?: number | null) => hours ? `${Number(hours.toFixed(2))} h integration` : null
const updatedInNovember = (photo: Photograph) => photo.views.some(v => v.date.startsWith('2026-11'))
const groupName = (id: string) => groups.find(g => g.id === id)?.title || id

function Atlas() {
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('curated')
  const [active, setActive] = useState<Photograph | null>(null)
  const [viewIndex, setViewIndex] = useState(0)
  const [shareLabel, setShareLabel] = useState('Share collection ↗')
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [zoom, setZoom] = useState(false)
  const [watching, setWatching] = useState(false)
  const [science, setScience] = useState(false)
  const dialog = useRef<HTMLDivElement>(null)
  const opener = useRef<HTMLElement | null>(null)
  const latestCount = photographs.filter(updatedInNovember).length
  const viewCount = photographs.reduce((n, p) => n + p.views.length, 0)
  const hero = photographs.find(p => p.id === 'iris') || photographs[0]
  const heroView = hero.views[0]
  const visible = useMemo(() => {
    const search = query.trim().toLowerCase()
    const result = photographs.filter(p => (filter === 'all' || (filter === 'november' ? updatedInNovember(p) : p.group === filter)) && (!search || `${p.title} ${p.catalog} ${p.description} ${p.views.map(v => v.rig).join(' ')} ${p.tags.join(' ')}`.toLowerCase().includes(search)))
    if (sort === 'title') result.sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'latest') result.sort((a, b) => Math.max(...b.views.map(v => Date.parse(v.date))) - Math.max(...a.views.map(v => Date.parse(v.date))))
    return result
  }, [filter, query, sort])
  const currentView: View | undefined = active?.views[viewIndex]
  const photoUrl = (photo?: Photograph | null, index = 0, video = false, explore = false) => {
    const url = new URL(window.location.href)
    if (photo) { url.searchParams.set('photo', photo.id); if (index) url.searchParams.set('view', photo.views[index].id); else url.searchParams.delete('view') }
    else { url.searchParams.delete('photo'); url.searchParams.delete('view') }
    if (photo && explore) url.searchParams.set('media', 'science')
    else if (photo && video) url.searchParams.set('media', 'video')
    else url.searchParams.delete('media')
    return url.toString()
  }
  const openPhoto = (photo: Photograph, index = 0, video = false, explore = false) => {
    opener.current = document.activeElement as HTMLElement
    setActive(photo); setViewIndex(index); setZoom(false); setWatching(video); setScience(explore)
    window.history.pushState({}, '', photoUrl(photo, index, video, explore))
  }
  const closePhoto = () => { setActive(null); setZoom(false); setWatching(false); setScience(false); window.history.replaceState({}, '', photoUrl()); opener.current?.focus() }
  const changeView = (index: number) => { setWatching(false); setScience(false); setViewIndex(index); setZoom(false); if (active) window.history.replaceState({}, '', photoUrl(active, index)) }
  const stepPhoto = (direction: number) => {
    if (!active) return
    const pool = visible.some(p => p.id === active.id) ? visible : photographs
    const next = pool[(pool.findIndex(p => p.id === active.id) + direction + pool.length) % pool.length]
    setActive(next); setViewIndex(0); setZoom(false); setWatching(false); setScience(false); window.history.replaceState({}, '', photoUrl(next))
  }
  useEffect(() => {
    const restore = () => {
      const params = new URLSearchParams(window.location.search)
      const aliases: Record<string, string> = { 'blue-hour': 'iris', 'lagoon': 'lagoon', 'crescent': 'crescent', 'spiral': 'm81', 'dark-river': 'elephant-trunk', 'dark-dust': 'elephant-trunk', 'cosmic-garden': 'bubble', 'stellar-dust': 'rho-ophiuchi', 'red-emission': 'eagle', 'lagoon-wide': 'lagoon-trifid', 'north-america': 'north-america', 'cyan-rift': 'north-america', 'silver-island': 'm82', 'starfield': 'starfield', 'veil': 'veil' }
      const id = params.get('photo') || ''
      const photo = photographs.find(p => p.id === id || p.id === aliases[id]) || null
      setActive(photo); setViewIndex(photo ? Math.max(0, photo.views.findIndex(v => v.id === params.get('view'))) : 0); setZoom(false)
      setWatching(Boolean(photo && ['sun','moon'].includes(photo.id) && params.get('media') === 'video'))
      setScience(Boolean(photo && params.get('media') === 'science'))
      if (!photo && window.location.hash) requestAnimationFrame(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView())
      else if (!photo && window.location.pathname.startsWith('/gallery')) requestAnimationFrame(() => document.getElementById('collection')?.scrollIntoView())
    }
    restore(); window.addEventListener('popstate', restore)
    return () => window.removeEventListener('popstate', restore)
  }, [])
  useEffect(() => { setImageLoaded(false); setImageError(false) }, [currentView?.src])
  useEffect(() => {
    document.body.classList.toggle('lightbox-open', Boolean(active))
    if (active) { document.querySelectorAll('video').forEach(v=>v.pause()); dialog.current?.focus() }
    return () => document.body.classList.remove('lightbox-open')
  }, [Boolean(active)])
  useEffect(() => {
    if (!active) return
    const keydown = (e: KeyboardEvent) => {
      const isSelect = ['SELECT','VIDEO','INPUT','TEXTAREA'].includes((e.target as HTMLElement).tagName) || Boolean((e.target as HTMLElement).closest('.science-reader'))
      if (e.key === 'Escape') { e.preventDefault(); if (zoom) setZoom(false); else closePhoto() }
      if (!isSelect && e.key === 'ArrowRight') { e.preventDefault(); stepPhoto(1) }
      if (!isSelect && e.key === 'ArrowLeft') { e.preventDefault(); stepPhoto(-1) }
      if (e.key === 'Tab') {
        const candidates = dialog.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), summary, select, video[controls], [tabindex="0"]')
        const elements = Array.from(candidates || []).filter(el => el.getClientRects().length > 0)
        if (!elements.length) return
        const first = elements[0], last = elements[elements.length - 1]
        if (e.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', keydown); return () => window.removeEventListener('keydown', keydown)
  })
  const share = async (photo?: Photograph | null, index = 0) => {
    const url = photoUrl(photo, index, Boolean(photo && active?.id === photo.id && watching), Boolean(photo && active?.id === photo.id && science))
    try {
      if (navigator.share) await navigator.share({ title: photo ? `${photo.title} — Aous Abdo` : 'Aous Abdo — Astrophotography', url })
      else { await navigator.clipboard.writeText(url); setShareLabel('Link copied ✓'); window.setTimeout(() => setShareLabel('Share collection ↗'), 2200) }
    } catch (error) { if ((error as Error).name !== 'AbortError') { setShareLabel('Could not copy link'); window.setTimeout(() => setShareLabel('Share collection ↗'), 2200) } }
  }
  const selectGroup = (id: string) => { setFilter(id); setQuery(''); document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }) }

  return <div className="site-shell atlas-site">
    <a className="skip-link" href="#collection">Skip to photographs</a>
    <header className="topbar">
      <a className="wordmark" href="#top"><span className="orbit-dot"/><span>One More Photon</span><small>Astrophotography by Aous Abdo</small></a>
      <nav aria-label="Primary navigation"><a href="#collections">Collections</a><a href="#collection">Gallery</a><a href="#science">Science</a><a className="nav-videos" href="#films"><span aria-hidden="true">▶</span> Sun & Moon videos</a><a href="/about/">About</a><a href="/work/">Work</a><button onClick={() => share()}>{shareLabel}</button></nav>
    </header>
    <main id="top">
      <section className="hero">
        <img src={heroView.src} srcSet={imageSrcSet(heroView)} sizes="100vw" alt="The blue Iris Nebula surrounded by intricate brown clouds of interstellar dust" fetchPriority="high"/>
        <div className="hero-vignette"/>
        <div className="hero-edition"><span>Field notes / 2026</span><a href="#collection" onClick={() => { setFilter('november'); setQuery('') }}>The November collection <span>↘</span></a></div>
        <div className="hero-copy"><p className="kicker"><span/> Deep sky, from Earth</p><h1>Light that traveled<br/><em>all this way.</em></h1><p className="intro">Dust that hides the stars. Clouds that make them.<br/>A personal atlas of the sky, one long exposure at a time.</p><div className="hero-actions"><a className="hero-watch" href="#films"><span aria-hidden="true">▶</span> Watch Sun & Moon videos</a><a className="hero-photos" href="#collections">Explore photographs <b>↓</b></a></div></div>
        <button className="hero-caption" onClick={() => openPhoto(hero)}><span>November / new finish</span><strong>The Iris Nebula</strong><small>NGC 7023 · {hoursLabel(heroView.hours) || 'Cepheus'} <b>↗</b></small></button>
        <div className="hero-bottom"><span>Photographs by Aous Abdo</span><span>{photographs.length} subjects · {viewCount} views · 4 films · Six collections</span></div>
      </section>
      <Films/>
      <ScienceStories onOpen={photo=>openPhoto(photo,0,false,true)}/>
      <section className="collections" id="collections">
        <header className="section-intro"><div><p className="section-number">01 / FIND YOUR WAY</p><h2>Different kinds<br/>of <em>infinity.</em></h2></div><p>Follow the dust, the glow, or the galaxies beyond. Each collection brings a different part of the sky into view.</p></header>
        <div className="collection-grid">{groups.map((group, i) => { const cover = photographs.find(p => p.id === group.cover) || photographs.find(p => p.group === group.id)!; return <button key={group.id} className="collection-tile" onClick={() => selectGroup(group.id)} aria-label={`Explore ${group.title}`}><img src={cover.views[0].thumb} alt="" loading="lazy"/><span className="tile-top"><span>0{i + 1}</span><span>{photographs.filter(p => p.group === group.id).length} subjects</span></span><span className="tile-copy"><strong>{group.title}</strong><small>{group.description}</small></span><span className="tile-arrow">↗</span></button> })}</div>
      </section>
      <section className="collection" id="collection">
        <header className="gallery-heading"><div><p className="section-number">02 / THE PHOTOGRAPHS</p><h2>The sky, collected.</h2></div><p>Open a photograph to explore the full frame,<br/>different telescopes, alternate palettes, and the science behind the light.</p></header>
        <div className="gallery-toolbar"><div className="filters" aria-label="Filter photographs">{[{id:'all',title:'All subjects'},{id:'november',title:'November'},...groups].map(g => <button key={g.id} aria-pressed={filter === g.id} className={filter === g.id ? 'active' : ''} onClick={() => setFilter(g.id)}>{g.title}<span>{g.id === 'all' ? photographs.length : g.id === 'november' ? latestCount : photographs.filter(p => p.group === g.id).length}</span></button>)}</div><div className="gallery-tools"><label className="search-box"><span aria-hidden="true">⌕</span><input aria-label="Search photographs" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Find a nebula, galaxy, or telescope…"/></label><label className="sort-box"><span>Order</span><select aria-label="Sort photographs" value={sort} onChange={e => setSort(e.target.value)}><option value="curated">Curated</option><option value="latest">Latest finish</option><option value="title">A–Z</option></select></label><p className="results" role="status" aria-live="polite">{visible.length} {visible.length === 1 ? 'subject' : 'subjects'}{filter === 'november' && ' · added or refinished in November'}</p></div></div>
        <div className="photo-grid">{visible.map((photo, index) => { const view = photo.views[0]; return <article className={`photo-card ${index % 7 === 0 ? 'wide' : ''}`} key={photo.id}>
          <button className="photo-open" onClick={() => openPhoto(photo)} aria-label={`Open ${photo.title}`}><img src={view.thumb} srcSet={imageSrcSet(view)} sizes={index % 7 === 0 ? '(max-width: 700px) 100vw, 66vw' : '(max-width: 700px) 100vw, 33vw'} width={view.width} height={view.height} alt={photo.alt} loading="lazy"/><span className="photo-index">{photo.catalog}</span>{updatedInNovember(photo) ? <span className="new-label">November</span> : view.dateKind ? <span className="archive-label">Earlier work</span> : null}<span className="view-label">View photograph <b>↗</b></span></button>
          <div className="photo-meta"><div><p className="photo-category">{groupName(photo.group)}</p><h3>{photo.title}</h3><p>{photo.caption}</p></div><button className="views-count" onClick={() => openPhoto(photo)} aria-label={`Explore ${photo.views.length} ${photo.views.length === 1 ? 'view' : 'views'} of ${photo.title}`}>{photo.views.length > 1 ? `${photo.views.length} views` : 'Full frame'} ↗</button></div>
          {['sun','moon'].includes(photo.id) && <button className="card-video-button" onClick={() => openPhoto(photo, 0, true)}><span><b aria-hidden="true">▶</b> Watch {photo.id === 'sun' ? 'Sun' : 'Moon'} videos</span><small>2 videos ↗</small></button>}
        </article>})}</div>
        {!visible.length && <div className="empty-state"><h3>No photographs found.</h3><p>Try a catalog number such as M42, a target name, or a telescope.</p><button onClick={() => { setQuery(''); setFilter('all') }}>Show the whole sky ↗</button></div>}
        <div className="gallery-end"><span>Every photograph starts with time under the sky.</span><a href="#collections">Back to collections ↑</a></div>
      </section>
      <section className="manifesto" id="about"><p className="section-number">03 / BEHIND THE LIGHT</p><div><h2>These are<br/><em>old photons.</em></h2><p>Collected from my backyard and under darker skies, then calibrated, stacked, and carefully processed until the invisible starts to show.</p><p>Different telescopes reveal different scales. Different palettes help us see different structures. Here, those views live together, so you can explore each subject beyond a single frame.</p><a className="text-link" href="/about/">Read the story behind One More Photon ↗</a><br/><a className="text-link" href={archiveUrl} target="_blank" rel="noreferrer">Visit the Google Photos archive ↗</a></div><aside><span>Latest update</span><strong>2026</strong><small>Updated in November<br/>{latestCount} subjects added or revisited</small></aside></section>
      <section className="universe" id="universe"><header className="universe-head"><p className="section-number">04 / ELSEWHERE</p><div><h2>Photography is<br/>only one orbit.</h2><p>The wider trail—from nuclear structure to gamma-ray astronomy, stellar evolution, and the places where science meets reflection.</p></div></header><div className="project-grid">{relatedProjects.map((project, index) => <a className={`project-card ${project.className}`} href={project.url} target="_blank" rel="noreferrer" key={project.title}><span className="project-bg" style={{backgroundImage:`url(${project.image})`}} aria-hidden="true"/><span className="project-no">0{index+1}</span><div><small>{project.label}</small><h3>{project.title}</h3><p>{project.description}</p></div><b>Visit project ↗</b></a>)}</div><div className="wider-orbit"><div className="orbit-label"><span className="orbit-dot"/><p>Wider orbit</p></div>{widerProjects.map(p => <a href={p.url} target="_blank" rel="noreferrer" key={p.title}><div><h3>{p.title}</h3><p>{p.note}</p></div><span>↗</span></a>)}</div></section>
    </main>
    <footer><div className="footer-mark"><span className="orbit-dot"/> AA</div><p>Astrophotography by Aous Abdo<br/><span>Made on Earth from ancient light.</span></p><div><button onClick={() => share()} aria-live="polite">{shareLabel}</button><a href="#top">Back to the stars ↑</a></div></footer>
    {active && currentView && <div ref={dialog} tabIndex={-1} className="lightbox" role="dialog" aria-modal="true" aria-labelledby="photo-title">
      <div className="lightbox-bar"><div><span>{active.catalog}</span><h2 id="photo-title">{active.title}</h2></div><div><button onClick={() => share(active, viewIndex)}>{shareLabel.startsWith('Link') ? 'Link copied ✓' : 'Share view ↗'}</button><button className="close" onClick={closePhoto} aria-label="Close photograph">Close ×</button></div></div>
      <div className="lightbox-main">{science ? <ScienceReader key={active.id} photo={active}/> : watching ? <div className="viewer-film"><FilmPlayer key={active.id} subject={active.id} compact/></div> : <div className={`image-stage ${zoom ? 'zoomed' : ''}`}><button className="zoom-image" onClick={() => setZoom(!zoom)} aria-label={zoom ? 'Fit photograph to screen' : 'Zoom into photograph'}><img key={currentView.src} className={imageLoaded ? 'loaded' : ''} src={currentView.src} alt={active.alt} onLoad={() => setImageLoaded(true)} onError={() => {setImageError(true);setImageLoaded(true)}}/>{!imageLoaded && <span className="image-status">Gathering the light…</span>}{imageError && <span className="image-status">The image could not load. Try another view.</span>}</button><span className="zoom-hint">{zoom ? 'Click to fit frame' : 'Click to look closer'}</span></div>}
        <aside className="photo-details">{['sun','moon'].includes(active.id) && <button className="watch-films" onClick={()=>{const next=!watching;setWatching(next);setScience(false);window.history.replaceState({}, '', photoUrl(active, viewIndex, next))}}>{watching?'Return to photograph ↗':'▶ Watch videos · 2'}</button>}<p className="section-number">{groupName(active.group)}</p>{!science&&<p className="photo-description">{active.description}</p>}<ScienceSummary photo={active} view={currentView} expanded={science} onExplore={()=>{const next=!science;setScience(next);setWatching(false);setZoom(false);window.history.replaceState({},'',photoUrl(active,viewIndex,false,next));}}/><p className="science-eyebrow capture-heading">BEHIND THE IMAGE / CAPTURE NOTES</p><dl><div><dt>Telescope</dt><dd>{currentView.rig}</dd></div><div><dt>View</dt><dd>{currentView.label}</dd></div>{currentView.hours && <div><dt>Integration</dt><dd>{Number(currentView.hours.toFixed(2))} hours</dd></div>}{currentView.integrationNote && <div><dt>Contributing data</dt><dd>{currentView.integrationNote}</dd></div>}{currentView.acquisition && <div><dt>Acquired</dt><dd>{currentView.acquisition}</dd></div>}<div><dt>{currentView.dateKind || 'Finished'}</dt><dd>{currentView.legacy ? 'Earlier collection' : dateLabel(currentView.date)}</dd></div><div><dt>Source size</dt><dd>{currentView.width.toLocaleString()} × {currentView.height.toLocaleString()} px</dd></div></dl>
          {active.views.length > 1 && <div className="alternate-views"><h3>Explore this subject <span>{active.views.length} views</span></h3><div className="view-options">{active.views.map((v, i) => <button key={v.id} className={i === viewIndex ? 'selected' : ''} aria-pressed={i === viewIndex} onClick={() => changeView(i)}><img src={v.thumb} alt="" loading="lazy"/><span><strong>{v.label}</strong><small>{v.rig}</small></span></button>)}</div></div>}
          <a className="download-link" href={currentView.src} download={`${active.id}-${currentView.id}.jpg`}>Download display image ↓</a>{currentView.astrobin && <a className="astrobin-link" href={currentView.astrobin} target="_blank" rel="noreferrer">View on AstroBin ↗</a>}
        </aside></div>
      <div className="lightbox-controls"><button onClick={() => stepPhoto(-1)} aria-label="Previous photograph">← <span>Previous</span></button><p>{(visible.some(p=>p.id===active.id) ? visible : photographs).findIndex(p=>p.id===active.id)+1} / {(visible.some(p=>p.id===active.id) ? visible : photographs).length} <span>· Arrow keys to explore · Esc to close</span></p><button onClick={() => stepPhoto(1)} aria-label="Next photograph"><span>Next</span> →</button></div>
    </div>}
  </div>
}
export default Atlas
