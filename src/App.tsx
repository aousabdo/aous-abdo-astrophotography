import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import { homeProjects, photographs, projectFamilies, type Photograph, type Project } from './content'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
const archiveUrl = 'https://photos.app.goo.gl/6wq4MaV3zakDoaQB6'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/gallery/', label: 'Gallery' },
  { href: '/about/', label: 'About' },
  { href: '/work/', label: 'Work' },
]

const cleanPath = (path: string) => {
  const cleaned = path.replace(/\/+$/, '')
  return cleaned || '/'
}

const photoHref = (photo: Photograph) => `/photographs/${photo.slug}/`

const responsiveSources = (photo: Photograph) => ({
  small: asset(`astro/responsive/${photo.slug}-800.webp`),
  large: asset(`astro/responsive/${photo.slug}-1400.webp`),
})

function sharePage(title: string, text: string, url = window.location.href) {
  const shareData = { title, text, url }
  if (navigator.share) return navigator.share(shareData).catch((error: Error) => {
    if (error.name !== 'AbortError') throw error
  })
  return navigator.clipboard.writeText(url)
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const current = cleanPath(window.location.pathname)

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  return (
    <header className={`site-header ${menuOpen ? 'menu-active' : ''}`}>
      <a className="wordmark" href="/" aria-label="One More Photon home">
        <span className="orbit-dot" />
        <span>One More Photon</span>
        <small>Astrophotography by Aous Abdo</small>
      </a>
      <nav className={menuOpen ? 'open' : ''} id="site-navigation" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} aria-current={current === cleanPath(item.href) ? 'page' : undefined}>{item.label}</a>
        ))}
        <button onClick={() => void sharePage('One More Photon', 'Deep-sky astrophotography by Aous Abdo.')}>Share ↗</button>
      </nav>
      <button
        className="menu-toggle"
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        onClick={() => setMenuOpen((value) => !value)}
      >
        <span>{menuOpen ? 'Close' : 'Menu'}</span>
        <i aria-hidden="true" />
      </button>
    </header>
  )
}

function Footer() {
  return (
    <footer>
      <a className="footer-mark" href="/">AA</a>
      <p>Astrophotography by Aous Abdo<br /><span>Made on Earth from ancient light.</span></p>
      <div>
        <a href="/gallery/">Explore the gallery ↗</a>
        <button onClick={() => void sharePage('One More Photon', 'Deep-sky astrophotography by Aous Abdo.')}>Share the collection ↗</button>
      </div>
      <p className="footer-right">© {new Date().getFullYear()} Aous Abdo<br /><span>All photographs reserved.</span></p>
    </footer>
  )
}

function Layout({ children, pageClass = '' }: { children: ReactNode, pageClass?: string }) {
  return (
    <div className={`site-shell ${pageClass}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  )
}

function ResponsivePhoto({ photo, eager = false, sizes = '(max-width: 700px) 100vw, 70vw' }: { photo: Photograph, eager?: boolean, sizes?: string }) {
  const sources = responsiveSources(photo)
  return (
    <picture>
      <source type="image/webp" srcSet={`${sources.small} 800w, ${sources.large} 1400w`} sizes={sizes} />
      <img src={asset(photo.src)} alt={photo.note} loading={eager ? 'eager' : 'lazy'} decoding="async" />
    </picture>
  )
}

function SectionHeading({ number, eyebrow, title, description, action }: { number: string, eyebrow: string, title: ReactNode, description?: string, action?: ReactNode }) {
  return (
    <header className="section-heading">
      <p className="section-number">{number} / {eyebrow}</p>
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action && <div className="section-action">{action}</div>}
    </header>
  )
}

function PhotoCard({ photo, index, eager = false, className = '' }: { photo: Photograph, index: number, eager?: boolean, className?: string }) {
  return (
    <article className={`photo-card ${photo.shape} ${className}`}>
      <a className="photo-open" href={photoHref(photo)} aria-label={`View ${photo.title}`}>
        <ResponsivePhoto photo={photo} eager={eager} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 66vw" />
        <span className="photo-index">{String(index + 1).padStart(2, '0')}</span>
        <span className="view-label">Enter the frame ↗</span>
      </a>
      <div className="photo-meta">
        <div>
          <p className="photo-kind">{photo.catalog || photo.group}{photo.equipment ? ` · ${photo.equipment}` : ''}</p>
          <h3><a href={photoHref(photo)}>{photo.title}</a></h3>
          <p>{photo.note}</p>
        </div>
        <button onClick={() => void sharePage(`${photo.title} — One More Photon`, photo.note, new URL(photoHref(photo), window.location.origin).toString())}>Share ↗</button>
      </div>
    </article>
  )
}

function HomePage() {
  const hero = photographs[0]
  const featured = photographs.filter((photo) => photo.featured && photo.slug !== hero.slug)

  return (
    <Layout pageClass="home-page">
      <section className="hero">
        <img src={asset(hero.src)} alt="The Whirlpool Galaxy M51 and its interacting companion surrounded by a field of stars" />
        <div className="hero-vignette" />
        <div className="hero-copy">
          <p className="kicker"><span /> Deep sky, from Earth</p>
          <h1>Light that traveled<br /><em>all this way.</em></h1>
          <p className="intro">I point a camera into the dark, wait a long time, and bring back whatever the sky is willing to give me.</p>
          <div className="hero-actions">
            <a href="/gallery/">Enter the gallery <b>→</b></a>
            <a className="ghost" href={photoHref(hero)}>Open M51 <span>↗</span></a>
          </div>
        </div>
        <a className="hero-caption" href={photoHref(hero)}>
          <span>Featured exposure</span>
          <strong>Whirlpool Galaxy</strong>
          <small>M51 · Canes Venatici</small>
        </a>
        <div className="scroll-cue">Scroll into the light <span>↓</span></div>
      </section>

      <section className="featured-section">
        <SectionHeading
          number="01"
          eyebrow="CROWN JEWELS"
          title={<>A few photons<br />worth waiting for.</>}
          description="Seven frames from a much larger night sky—selected for the light, dust, distance, and stories they carry."
          action={<a href="/gallery/">View all {photographs.length} photographs ↗</a>}
        />
        <div className="featured-flow">
          {featured.map((photo, index) => <PhotoCard photo={photo} index={index} eager={index < 2} className={`feature-${index + 1}`} key={photo.slug} />)}
        </div>
      </section>

      <section className="story-bridge">
        <p className="section-number">02 / THE BEGINNING</p>
        <div>
          <h2>It began with<br />one borrowed eye.</h2>
          <p>As a kid in Amman, Jordan, I borrowed my cousin’s Russian monocular to see what was out there. Then my uncle, Mazen Qaisi, returned from England with a Newtonian telescope. It was the early 1990s. I was hooked.</p>
          <a href="/about/">Read the full story <span>↗</span></a>
        </div>
        <aside><span>Since the early</span><strong>1990s</strong><small>Amman, Jordan · still looking up</small></aside>
      </section>

      <section className="home-work">
        <SectionHeading
          number="03"
          eyebrow="BEYOND THE CAMERA"
          title={<>Photography is<br />only one orbit.</>}
          description="Astronomy, revelation, scientific visualization, and signal work—all different ways of looking for structure in the faint."
          action={<a href="/work/">Explore all work ↗</a>}
        />
        <div className="home-project-grid">
          {homeProjects.map((project, index) => <ProjectCard project={project} index={index} key={project.title} compact />)}
        </div>
      </section>

      <section className="closing-cta">
        <p>A small planet. A patient camera.</p>
        <h2>There is always<br /><em>one more photon.</em></h2>
        <div><a href="/gallery/">Explore the complete gallery <span>→</span></a><a href={archiveUrl} target="_blank" rel="noreferrer">Open Google Photos archive ↗</a></div>
      </section>
    </Layout>
  )
}

const series = [
  { name: 'Lagoon studies', catalog: 'M8' },
  { name: 'Crescent studies', catalog: 'NGC 6888' },
  { name: 'Pillars studies', catalog: 'M16' },
]

function GalleryPage() {
  const query = new URLSearchParams(window.location.search)
  const [group, setGroup] = useState<'All' | Photograph['group']>((query.get('group') as Photograph['group']) || 'All')
  const [equipment, setEquipment] = useState(query.get('equipment') || 'All equipment')
  const [selectedSeries, setSelectedSeries] = useState(query.get('series') || '')
  const [visibleCount, setVisibleCount] = useState(12)
  const equipmentOptions = useMemo(() => ['All equipment', ...Array.from(new Set(photographs.map((photo) => photo.equipment).filter(Boolean) as string[]))], [])

  const filtered = useMemo(() => photographs.filter((photo) => {
    const groupMatch = group === 'All' || photo.group === group
    const equipmentMatch = equipment === 'All equipment' || photo.equipment === equipment
    const seriesMatch = !selectedSeries || photo.catalog === selectedSeries
    return groupMatch && equipmentMatch && seriesMatch
  }), [equipment, group, selectedSeries])

  useEffect(() => {
    setVisibleCount(12)
    const params = new URLSearchParams()
    if (group !== 'All') params.set('group', group)
    if (equipment !== 'All equipment') params.set('equipment', equipment)
    if (selectedSeries) params.set('series', selectedSeries)
    window.history.replaceState({}, '', `${window.location.pathname}${params.size ? `?${params}` : ''}`)
  }, [equipment, group, selectedSeries])

  const reset = () => {
    setGroup('All')
    setEquipment('All equipment')
    setSelectedSeries('')
  }

  return (
    <Layout pageClass="gallery-page">
      <section className="page-hero gallery-hero">
        <p className="kicker"><span /> The complete archive</p>
        <h1>Twenty-six windows.<br /><em>One universe.</em></h1>
        <p>Browse nebulae, galaxies, and crowded fields of stars—then open any frame to see it without the noise around it.</p>
      </section>

      <section className="series-strip" aria-label="Photograph series">
        <p>Browse a series</p>
        {series.map((item) => {
          const count = photographs.filter((photo) => photo.catalog === item.catalog).length
          return <button className={selectedSeries === item.catalog ? 'active' : ''} onClick={() => setSelectedSeries(selectedSeries === item.catalog ? '' : item.catalog)} key={item.catalog}>{item.name}<span>{count} frames</span></button>
        })}
      </section>

      <section className="gallery-archive">
        <header className="gallery-toolbar">
          <div>
            <p className="section-number">01 / GALLERY</p>
            <h2>The archive</h2>
          </div>
          <div className="filter-stack">
            <div className="filters" aria-label="Filter by subject">
              {(['All', 'Nebulae', 'Galaxies', 'Star fields'] as const).map((item) => (
                <button key={item} className={group === item ? 'active' : ''} onClick={() => { setGroup(item); setSelectedSeries('') }} aria-pressed={group === item}>{item}</button>
              ))}
            </div>
            <label className="equipment-filter">Telescope
              <select value={equipment} onChange={(event) => { setEquipment(event.target.value); setSelectedSeries('') }}>
                {equipmentOptions.map((item) => <option value={item} key={item}>{item}</option>)}
              </select>
            </label>
          </div>
        </header>

        <div className="gallery-status">
          <p>{filtered.length} photograph{filtered.length === 1 ? '' : 's'}{selectedSeries ? ` in ${selectedSeries}` : ''}</p>
          {(group !== 'All' || equipment !== 'All equipment' || selectedSeries) && <button onClick={reset}>Clear filters ×</button>}
        </div>

        <div className="photo-grid">
          {filtered.slice(0, visibleCount).map((photo, index) => <PhotoCard photo={photo} index={index} eager={index < 3} key={photo.slug} />)}
        </div>

        {visibleCount < filtered.length && (
          <div className="reveal-more"><button onClick={() => setVisibleCount((value) => Math.min(value + 8, filtered.length))}>Reveal more light <span>{visibleCount} / {filtered.length}</span></button></div>
        )}
      </section>

      <section className="archive-callout" style={{ '--archive-image': `url(${asset('astro/blue-hour.jpg')})` } as CSSProperties}>
        <p>There is still more light in the archive.</p>
        <h2>Years of looking up.<br />One growing collection.</h2>
        <a href={archiveUrl} target="_blank" rel="noreferrer">Open the complete Google Photos archive <span>↗</span></a>
      </section>
    </Layout>
  )
}

function AboutPage() {
  const timeline = [
    { year: 'Early 1990s', place: 'Amman, Jordan', title: 'One borrowed eye', text: 'A Russian monocular borrowed from my cousin opened the first small window into the night sky.' },
    { year: 'Early 1990s', place: 'Amman, Jordan', title: 'Uncle Mazen’s telescope', text: 'My uncle, Mazen Qaisi, returned from England with a PhD in engineering and a new Newtonian telescope. I was hooked.' },
    { year: '2003', place: 'New Mexico & Michigan', title: 'The serious work begins', text: 'Astronomy and astrophysics became the work at Los Alamos National Laboratory and Michigan State University.' },
    { year: '2007', place: 'NASA', title: 'The gamma-ray universe', text: 'The path continued into NASA and the Fermi era, studying a universe that reveals itself far beyond visible light.' },
    { year: '2013 — now', place: 'Under the night sky', title: 'The universe never left', text: 'I stepped away from academia, but not from astronomy. Nebulae, galaxies, and the patience of long exposure still pull me into the dark.' },
  ]
  const equipment = [
    { name: 'Celestron Origin', use: 'Wide-field nebulae, star clouds, and an observatory that can travel.' },
    { name: 'C11 EdgeHD', use: 'Long focal length and close studies of structures such as the Pillars of Creation.' },
    { name: 'Askar 103APO', use: 'A wider, detailed view of nebulae and stellar nurseries.' },
    { name: 'Askar SQA 55', use: 'Portable wide-field imaging beneath darker skies, including Green Bank.' },
  ]

  return (
    <Layout pageClass="about-page">
      <section className="page-hero about-hero">
        <p className="kicker"><span /> The story behind the camera</p>
        <h1>Still looking up.</h1>
        <p>A childhood in Amman, a borrowed monocular, a Newtonian telescope, Los Alamos, Michigan State, NASA—and a passion for the universe that never learned how to leave.</p>
      </section>

      <section className="timeline-section">
        <SectionHeading number="01" eyebrow="TRAJECTORY" title={<>From one eye<br />to the cosmos.</>} />
        <div className="timeline">
          {timeline.map((item, index) => (
            <article key={`${item.year}-${item.title}`}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><p>{item.year} · {item.place}</p><h3>{item.title}</h3></div>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="equipment-section">
        <SectionHeading number="02" eyebrow="INSTRUMENTS" title={<>Different glass.<br />The same sky.</>} description="Each telescope changes the scale of the conversation—from an entire star cloud to the face of a stellar nursery." />
        <div className="equipment-grid">
          {equipment.map((item, index) => <article key={item.name}><span>0{index + 1}</span><h3>{item.name}</h3><p>{item.use}</p></article>)}
        </div>
      </section>

      <section className="process-section">
        <SectionHeading number="03" eyebrow="PROCESS" title={<>Patience,<br />made visible.</>} />
        <div className="process-grid">
          <article><span>01</span><h3>Find the darkness</h3><p>Choose the target, the field, the glass, and—when possible—a sky with less human light in it.</p></article>
          <article><span>02</span><h3>Collect the photons</h3><p>Expose, guide, repeat. One frame is rarely the photograph; patience is part of the instrument.</p></article>
          <article><span>03</span><h3>Reveal, do not invent</h3><p>Stack and process the data until the faint structure becomes visible while the sky still feels like itself.</p></article>
        </div>
      </section>

      <section className="about-quote"><blockquote>“I left academia in 2013, but never the universe.”</blockquote><a href="/gallery/">See what came back from the dark ↗</a></section>
    </Layout>
  )
}

function ProjectCard({ project, index, compact = false }: { project: Project, index: number, compact?: boolean }) {
  return (
    <a className={`project-card tone-${project.tone} ${compact ? 'compact' : ''} ${project.featured ? 'featured' : ''}`} href={project.url} target="_blank" rel="noreferrer">
      {project.image && <span className="project-bg" style={{ backgroundImage: `url(${asset(project.image)})` }} aria-hidden="true" />}
      <span className="project-no">{String(index + 1).padStart(2, '0')}</span>
      <div><small>{project.label}</small><h3>{project.title}</h3><p>{project.description}</p></div>
      <b>Open project ↗</b>
    </a>
  )
}

function WorkPage() {
  return (
    <Layout pageClass="work-page">
      <section className="page-hero work-hero">
        <p className="kicker"><span /> The wider orbit</p>
        <h1>Different signals.<br /><em>The same instinct.</em></h1>
        <p>The camera is only one way I search for faint structure. These projects move through astronomy, revelation, public knowledge, and noisy systems.</p>
      </section>

      <nav className="family-index" aria-label="Project families">
        {projectFamilies.map((family) => <a href={`#${family.id}`} key={family.id}><span>{family.number}</span>{family.title}</a>)}
      </nav>

      {projectFamilies.map((family) => (
        <section className={`work-family family-${family.id}`} id={family.id} key={family.id}>
          <SectionHeading number={family.number} eyebrow="WORK" title={family.title} description={family.intro} />
          <div className="work-grid">
            {family.projects.map((project, index) => <ProjectCard project={project} index={index} key={project.title} />)}
          </div>
        </section>
      ))}
    </Layout>
  )
}

function PhotographPage({ photo }: { photo: Photograph }) {
  const currentIndex = photographs.findIndex((item) => item.slug === photo.slug)
  const previous = photographs[(currentIndex - 1 + photographs.length) % photographs.length]
  const next = photographs[(currentIndex + 1) % photographs.length]
  const related = photographs.filter((item) => item.slug !== photo.slug && ((photo.catalog && item.catalog === photo.catalog) || item.group === photo.group)).slice(0, 3)
  const facts = [
    photo.catalog && { label: 'Object', value: photo.catalog },
    { label: 'Class', value: photo.group },
    photo.equipment && { label: 'Telescope', value: photo.equipment },
    photo.location && { label: 'Location', value: photo.location },
  ].filter(Boolean) as { label: string, value: string }[]

  return (
    <Layout pageClass="photograph-page">
      <article className="photo-story">
        <header className="photo-story-head">
          <a href="/gallery/">← Back to gallery</a>
          <p>{String(currentIndex + 1).padStart(2, '0')} / {String(photographs.length).padStart(2, '0')}</p>
          <button onClick={() => void sharePage(`${photo.title} — One More Photon`, photo.note)}>Share this photograph ↗</button>
        </header>

        <figure className="photo-stage">
          <img src={asset(photo.src)} alt={photo.note} />
          <figcaption>Ancient light · collected from Earth</figcaption>
        </figure>

        <section className="photo-narrative">
          <div><p className="section-number">THE PHOTOGRAPH</p><h1>{photo.title}</h1></div>
          <div><p className="photo-note">{photo.note}</p>{facts.length > 0 && <dl>{facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>}</div>
        </section>

        <nav className="photo-pagination" aria-label="Photograph navigation">
          <a href={photoHref(previous)}><span>← Previous</span><strong>{previous.title}</strong></a>
          <a href={photoHref(next)}><span>Next →</span><strong>{next.title}</strong></a>
        </nav>
      </article>

      <section className="related-photos">
        <SectionHeading number="+" eyebrow="KEEP LOOKING" title="Related light" action={<a href="/gallery/">Return to archive ↗</a>} />
        <div className="related-grid">{related.map((item, index) => <PhotoCard photo={item} index={index} key={item.slug} />)}</div>
      </section>
    </Layout>
  )
}

function NotFoundPage() {
  return (
    <Layout pageClass="not-found-page">
      <section className="not-found"><p>404 · No signal</p><h1>This light<br />never arrived.</h1><a href="/">Return to One More Photon →</a></section>
    </Layout>
  )
}

function App() {
  const path = cleanPath(window.location.pathname)
  const photographMatch = path.match(/^\/photographs\/([^/]+)$/)
  const photo = photographMatch ? photographs.find((item) => item.slug === photographMatch[1]) : undefined

  if (path === '/') return <HomePage />
  if (path === '/gallery') return <GalleryPage />
  if (path === '/about') return <AboutPage />
  if (path === '/work') return <WorkPage />
  if (photo) return <PhotographPage photo={photo} />
  return <NotFoundPage />
}

export default App
