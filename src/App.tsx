import { useEffect, useMemo, useState } from 'react'

type Photograph = {
  slug: string
  title: string
  note: string
  src: string
  shape: 'wide' | 'tall' | 'standard'
  group: 'Nebulae' | 'Galaxies' | 'Star fields'
}

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

const photographs: Photograph[] = [
  { slug: 'm51-whirlpool-galaxy', title: 'The Whirlpool Galaxy', note: 'M51 and its companion, caught in a luminous gravitational embrace.', src: asset('astro/m51-whirlpool-galaxy.jpg'), shape: 'wide', group: 'Galaxies' },
  { slug: 'dark-river', title: 'Dark River', note: 'Dust, light, and a ridiculous number of stars.', src: asset('astro/dark-river.jpg'), shape: 'wide', group: 'Star fields' },
  { slug: 'lagoon', title: 'Lagoon Light', note: 'A red sky quietly building new stars.', src: asset('astro/lagoon.jpg'), shape: 'standard', group: 'Nebulae' },
  { slug: 'cyan-rift', title: 'The Cyan Rift', note: 'A bright edge through the summer Milky Way.', src: asset('astro/cyan-rift.jpg'), shape: 'standard', group: 'Nebulae' },
  { slug: 'spiral', title: "Bode's Galaxy", note: 'A grand spiral turning quietly in the dark.', src: asset('astro/spiral.jpg'), shape: 'tall', group: 'Galaxies' },
  { slug: 'sombrero-galaxy-origin', title: 'The Sombrero Galaxy — Origin', note: 'M104 suspended in black, its bright core divided by a razor-thin dust lane—captured with my Celestron Origin.', src: asset('astro/sombrero-galaxy-origin.jpg'), shape: 'wide', group: 'Galaxies' },
  { slug: 'crescent', title: 'Crescent', note: 'Faint oxygen wrapped around a stellar storm.', src: asset('astro/crescent.jpg'), shape: 'standard', group: 'Nebulae' },
  { slug: 'crescent-origin', title: 'The Crescent Nebula — Origin', note: 'A wide-field view of NGC 6888, captured with my Celestron Origin.', src: asset('astro/crescent-origin.jpg'), shape: 'standard', group: 'Nebulae' },
  { slug: 'stellar-dust', title: 'Rho Ophiuchi', note: 'Blue reflection, golden dust, and young stars tangled together.', src: asset('astro/stellar-dust.jpg'), shape: 'wide', group: 'Nebulae' },
  { slug: 'veil', title: 'The Veil', note: 'The beautiful remains of an exploded star.', src: asset('astro/veil.jpg'), shape: 'standard', group: 'Nebulae' },
  { slug: 'cosmic-garden', title: 'The Crescent Nebula', note: 'A stellar wind carving light into a cosmic shell.', src: asset('astro/cosmic-garden.jpg'), shape: 'standard', group: 'Nebulae' },
  { slug: 'silver-island', title: 'The Cigar Galaxy', note: 'A restless starburst galaxy glowing through its own dust.', src: asset('astro/silver-island.jpg'), shape: 'wide', group: 'Galaxies' },
  { slug: 'north-america', title: 'Hydrogen Coast', note: 'A familiar coastline, thousands of light-years away.', src: asset('astro/north-america.jpg'), shape: 'standard', group: 'Nebulae' },
  { slug: 'blue-hour', title: 'The Iris Nebula', note: 'Blue starlight reflected through a field of cold dust.', src: asset('astro/blue-hour.jpg'), shape: 'wide', group: 'Nebulae' },
  { slug: 'red-emission', title: 'The Lagoon Nebula Region', note: 'Hydrogen, dust, and newborn stars across the wider Lagoon.', src: asset('astro/red-emission.jpg'), shape: 'standard', group: 'Nebulae' },
  { slug: 'starfield', title: 'Uncounted', note: 'A small window. An unreasonable number of suns.', src: asset('astro/starfield.jpg'), shape: 'standard', group: 'Star fields' },
  { slug: 'loch-ness-nebula', title: 'The Loch Ness Nebula', note: 'The LDN 772 dark-nebula complex winding through a dense river of Milky Way stars in Vulpecula.', src: asset('astro/loch-ness-nebula.jpg'), shape: 'wide', group: 'Nebulae' },
  { slug: 'ic-4756', title: 'IC 4756', note: 'Twenty-three subframes, one immense sweep of starlight.', src: asset('astro/ic-4756.jpg'), shape: 'wide', group: 'Star fields' },
  { slug: 'sagittarius-star-cloud-origin', title: 'The Sagittarius Star Cloud — Origin', note: 'A river of stars and dark dust across Sagittarius, captured with my Celestron Origin.', src: asset('astro/sagittarius-star-cloud-origin.jpg'), shape: 'wide', group: 'Star fields' },
  { slug: 'lagoon-wide', title: 'Lagoon, Wide', note: 'The full neighborhood around the Lagoon Nebula.', src: asset('astro/lagoon-wide.jpg'), shape: 'standard', group: 'Nebulae' },
  { slug: 'dark-dust', title: 'The Seahorse Nebula', note: 'A dark nebula drifting in silhouette across a crowded field of stars.', src: asset('astro/dark-dust.jpg'), shape: 'wide', group: 'Nebulae' },
  { slug: 'lagoon-origin', title: 'The Lagoon Nebula — Origin', note: 'A wide field of the Lagoon Nebula, captured with my Celestron Origin.', src: asset('astro/lagoon-origin.jpg'), shape: 'wide', group: 'Nebulae' },
  { slug: 'trifid-nebula', title: 'The Trifid Nebula', note: 'Emission, reflection, and dark dust sharing one remarkable frame.', src: asset('astro/trifid-nebula.jpg'), shape: 'standard', group: 'Nebulae' },
  { slug: 'pillars-of-creation', title: 'The Pillars of Creation', note: 'The great stellar nursery rising through the Eagle Nebula, captured with my C11 EdgeHD.', src: asset('astro/pillars-of-creation.jpg'), shape: 'standard', group: 'Nebulae' },
  { slug: 'pillars-of-creation-askar-103apo', title: 'The Pillars of Creation — Askar 103APO', note: 'A wider view of the Eagle Nebula and its famous pillars, captured with my Askar 103APO.', src: asset('astro/pillars-of-creation-askar-103apo.jpg'), shape: 'wide', group: 'Nebulae' },
  { slug: 'rosette-nebula', title: 'The Rosette Nebula', note: 'A vast stellar nursery opening like a flower, captured with my Celestron Origin.', src: asset('astro/rosette-nebula.jpg'), shape: 'wide', group: 'Nebulae' },
]

const archiveUrl = 'https://photos.app.goo.gl/6wq4MaV3zakDoaQB6'

const relatedProjects = [
  {
    title: 'From the Nucleus to the Cosmos',
    label: 'Research & career',
    description: 'My doctoral work in astrophysics, the Milagro discoveries, and the road into the Fermi-LAT era at NASA.',
    url: 'https://aousabdo.pages.dev/',
    className: 'project-personal',
    image: asset('projects/cosmos.png'),
  },
  {
    title: 'Najm',
    label: 'Interactive astronomy',
    description: 'A bilingual visual journey through how stars are born, live, die, and reshape the universe.',
    url: 'https://najm.analyticadss.com/',
    className: 'project-najm',
    image: asset('projects/najm.jpg'),
  },
  {
    title: 'Stellar Death',
    label: 'Stellar simulator',
    description: 'Watch a star evolve toward a white dwarf, neutron star, black hole—or something stranger.',
    url: 'https://aousabdo.github.io/stellar-death/',
    className: 'project-related',
    image: asset('astro/crescent.jpg'),
  },
  {
    title: 'Al-Tariq',
    label: 'Pulsars & the Quran',
    description: 'A rigorous bilingual look at pulsars, neutron stars, and the “knocking star” of Surah At-Tariq.',
    url: 'https://aousabdo.github.io/al-tariq/',
    className: 'project-related',
    image: asset('projects/al-tariq.png'),
  },
  {
    title: 'Moon Splitting',
    label: 'Faith, tafsir & astronomy',
    description: 'A first-person reflection on the moon, belief, observation, and the question of timing.',
    url: 'https://aousabdo.github.io/moon-splitting/',
    className: 'project-related',
    image: asset('projects/moon.png'),
  },
]

const widerProjects = [
  { title: 'SciVizHub', note: 'Interactive visualizations for scientific concepts.', url: 'https://scivizhub.analyticadss.com/' },
  { title: 'Nuclear Explained', note: 'Interactive nuclear physics, blast, fallout, and historical data.', url: 'https://nukes.analyticadss.com/' },
  { title: 'The American Dream, Measured', note: 'A sourced, interactive comparison of American life in 1955 and 2025.', url: 'https://aousabdo.github.io/the-american-dream-measured/' },
  { title: 'Atlas of Muslim Scholars', note: 'Explore scholars across history by field, region, and century.', url: 'https://aousabdo.github.io/muslim-scholars-atlas/' },
  { title: 'Islamic Viz Hub', note: 'Bilingual visualizations of Islamic science, time, qibla, and sky geometry.', url: 'https://islamicviz.analyticadss.com/en/' },
]

const signalProjects = [
  {
    title: 'Skywatch',
    label: 'Counter-UAS incident atlas',
    note: 'A decade of FAA drone sightings mapped against the infrastructure that matters, with forecasting and reproducible public-data analysis.',
    url: 'https://skywatch.analyticadss.com/',
    signal: 'Air / observation',
    tone: 'skywatch',
    featured: true,
  },
  {
    title: 'Constellation',
    label: 'Federal market intelligence',
    note: 'Agencies, primes, and subcontractors mapped as a living network across Counter-UAS, cybersecurity, and AI/ML markets.',
    url: 'https://constellation.analyticadss.com/',
    signal: 'Networks / markets',
    tone: 'constellation',
    featured: true,
  },
  {
    title: 'Drift',
    label: 'Defense cost growth explorer',
    note: 'A transparent view of how major acquisition programs move from their original promise to their current cost and shape.',
    url: 'https://drift.analyticadss.com/',
    signal: 'Time / trajectory',
    tone: 'drift',
    featured: true,
  },
  {
    title: 'Watchstander',
    label: 'Maritime domain awareness',
    note: 'Unusual vessel behavior surfaced from public AIS, satellite radar, sanctions, and critical-infrastructure data.',
    url: 'https://watchstander.analyticadss.com/',
    signal: 'Sea / anomaly',
    tone: 'watchstander',
    featured: false,
  },
  {
    title: 'Chokepoint',
    label: 'Strait of Hormuz consequence engine',
    note: 'Model how disruption strands oil, tests overland bypass capacity, exposes producers, and transmits into an illustrative price shock—all from public data.',
    url: 'https://chokepoint.analyticadss.com/',
    signal: 'Energy / exposure',
    tone: 'chokepoint',
    featured: false,
  },
  {
    title: 'Crucible',
    label: 'Federal SBIR pipeline intelligence',
    note: 'Follow an idea from solicitation topic to awardee, Phase II, and the federal contracts that may come afterward.',
    url: 'https://crucible.analyticadss.com/',
    signal: 'Ideas / outcomes',
    tone: 'crucible',
    featured: false,
  },
]

function App() {
  const [filter, setFilter] = useState<'All' | Photograph['group']>('All')
  const [active, setActive] = useState<Photograph | null>(null)
  const [shareLabel, setShareLabel] = useState('Share this sky')

  const visible = useMemo(
    () => filter === 'All' ? photographs : photographs.filter((photo) => photo.group === filter),
    [filter],
  )

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('photo')
    const requested = photographs.find((photo) => photo.slug === slug)
    if (requested) setActive(requested)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('lightbox-open', Boolean(active))
    if (!active) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePhoto()
      if (event.key === 'ArrowRight') stepPhoto(1)
      if (event.key === 'ArrowLeft') stepPhoto(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const urlFor = (photo?: Photograph | null) => {
    const url = new URL(window.location.href)
    if (photo) url.searchParams.set('photo', photo.slug)
    else url.searchParams.delete('photo')
    return url.toString()
  }

  const openPhoto = (photo: Photograph) => {
    setActive(photo)
    window.history.replaceState({}, '', urlFor(photo))
  }

  const closePhoto = () => {
    setActive(null)
    window.history.replaceState({}, '', urlFor())
  }

  const stepPhoto = (direction: number) => {
    if (!active) return
    const current = photographs.findIndex((photo) => photo.slug === active.slug)
    const next = photographs[(current + direction + photographs.length) % photographs.length]
    setActive(next)
    window.history.replaceState({}, '', urlFor(next))
  }

  const share = async (photo?: Photograph | null) => {
    const chosen = photo || null
    const shareData = {
      title: chosen ? `${chosen.title} — One More Photon` : 'One More Photon',
      text: chosen ? chosen.note : 'A collection of deep-sky astrophotography.',
      url: urlFor(chosen),
    }
    try {
      if (navigator.share) await navigator.share(shareData)
      else {
        await navigator.clipboard.writeText(shareData.url)
        setShareLabel('Link copied')
        window.setTimeout(() => setShareLabel('Share this sky'), 1800)
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') setShareLabel('Try again')
    }
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="One More Photon astrophotography home">
          <span className="orbit-dot" />
          <span>One More Photon</span>
          <small>Astrophotography by Aous Abdo</small>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#collection">Collection</a>
          <a href="#about">About</a>
          <a href="#universe">Universe</a>
          <button onClick={() => share()}>{shareLabel}</button>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <img src={asset('astro/m51-whirlpool-galaxy.jpg')} alt="The Whirlpool Galaxy M51 and its interacting companion surrounded by a field of stars" />
          <div className="hero-vignette" />
          <div className="hero-copy">
            <p className="kicker"><span /> Deep sky, from Earth</p>
            <h1>Light that traveled<br /><em>all this way.</em></h1>
            <p className="intro">I point a camera into the dark, wait a long time, and bring back whatever the sky is willing to give me.</p>
            <div className="hero-actions">
              <a href="#collection">Enter the collection <b>↓</b></a>
              <button onClick={() => share()}>Share <span>↗</span></button>
            </div>
          </div>
          <div className="hero-caption">
            <span>Featured exposure</span>
            <strong>Whirlpool Galaxy</strong>
            <small>M51 · Canes Venatici</small>
          </div>
          <div className="scroll-cue">Scroll to drift <span>↓</span></div>
        </section>

        <section className="manifesto" id="about">
          <p className="section-number">01 / ABOUT</p>
          <div>
            <h2>It began with one borrowed eye.</h2>
            <p>As a kid in Amman, Jordan, I borrowed my cousin’s Russian monocular to see what was out there. Then my uncle, Mazen Qaisi, returned from England with a PhD in engineering—and a new Newtonian telescope. It was the early 1990s. I was hooked.</p>
            <p>Serious work in astronomy and astrophysics followed at Los Alamos National Laboratory and Michigan State University in 2003, then NASA in 2007. I left academia in 2013, but never the universe. Nebulae still pull me back to the dark.</p>
          </div>
          <aside><span>Since the early</span><strong>1990s</strong><small>Amman, Jordan · still looking up</small></aside>
        </section>

        <section className="collection" id="collection">
          <header className="collection-head">
            <div><p className="section-number">02 / COLLECTION</p><h2>The archive</h2></div>
            <div className="filters" aria-label="Filter photographs">
              {(['All', 'Nebulae', 'Galaxies', 'Star fields'] as const).map((item) => (
                <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>
              ))}
            </div>
          </header>

          <div className="photo-grid">
            {visible.map((photo, index) => (
              <article className={`photo-card ${photo.shape}`} key={photo.slug} style={{ '--delay': `${(index % 6) * 45}ms` } as React.CSSProperties}>
                <button className="photo-open" onClick={() => openPhoto(photo)} aria-label={`Open ${photo.title}`}>
                  <img src={photo.src} alt={photo.note} loading={index > 3 ? 'lazy' : 'eager'} />
                  <span className="photo-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="view-label">View full frame ↗</span>
                </button>
                <div className="photo-meta">
                  <div><h3>{photo.title}</h3><p>{photo.note}</p></div>
                  <button onClick={() => share(photo)} aria-label={`Share ${photo.title}`}>Share ↗</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="archive-callout" style={{ '--archive-image': `url(${asset('astro/blue-hour.jpg')})` } as React.CSSProperties}>
          <p>There is more light in the archive.</p>
          <h2>Thirty frames.<br />One very patient camera.</h2>
          <a href={archiveUrl} target="_blank" rel="noreferrer">Open the complete Google Photos collection <span>↗</span></a>
        </section>

        <section className="universe" id="universe">
          <header className="universe-head">
            <p className="section-number">03 / ELSEWHERE</p>
            <div>
              <h2>Photography is<br />only one orbit.</h2>
              <p>The wider trail—from nuclear structure to gamma-ray astronomy, stellar evolution, and the places where science meets reflection.</p>
            </div>
          </header>

          <div className="project-grid">
            {relatedProjects.map((project, index) => (
              <a className={`project-card ${project.className}`} href={project.url} target="_blank" rel="noreferrer" key={project.title}>
                <span className="project-bg" style={{ backgroundImage: `url(${project.image})` }} aria-hidden="true" />
                <span className="project-no">{String(index + 1).padStart(2, '0')}</span>
                <div><small>{project.label}</small><h3>{project.title}</h3><p>{project.description}</p></div>
                <b>Visit project ↗</b>
              </a>
            ))}
          </div>

          <div className="wider-orbit">
            <div className="orbit-label"><span className="orbit-dot" /><p>Wider orbit</p></div>
            {widerProjects.map((project) => (
              <a href={project.url} target="_blank" rel="noreferrer" key={project.title}>
                <div><h3>{project.title}</h3><p>{project.note}</p></div><span>↗</span>
              </a>
            ))}
          </div>
        </section>

        <section className="frequencies" id="frequencies">
          <header className="frequencies-head">
            <p className="section-number">04 / OTHER FREQUENCIES</p>
            <div>
              <p className="frequency-kicker"><span className="orbit-dot" /> Signal work</p>
              <h2>Seeing what is<br /><em>difficult to see.</em></h2>
              <p>The camera is not the only way I search for faint signals. These projects find structure in noisy public data—from the sky and sea to science, technology, and federal systems.</p>
            </div>
          </header>

          <div className="frequency-featured">
            {signalProjects.filter((project) => project.featured).map((project, index) => (
              <a className={`frequency-card frequency-${project.tone}`} href={project.url} target="_blank" rel="noreferrer" key={project.title}>
                <div className="frequency-top"><span>{String(index + 1).padStart(2, '0')}</span><small>{project.signal}</small></div>
                <div className="frequency-visual" aria-hidden="true"><i /><i /><i /></div>
                <div className="frequency-copy"><small>{project.label}</small><h3>{project.title}</h3><p>{project.note}</p></div>
                <b>Follow the signal ↗</b>
              </a>
            ))}
          </div>

          <div className="frequency-secondary">
            {signalProjects.filter((project) => !project.featured).map((project, index) => (
              <a className={`frequency-card frequency-compact frequency-${project.tone}`} href={project.url} target="_blank" rel="noreferrer" key={project.title}>
                <div className="frequency-top"><span>{String(index + 4).padStart(2, '0')}</span><small>{project.signal}</small></div>
                <div className="frequency-copy"><small>{project.label}</small><h3>{project.title}</h3><p>{project.note}</p></div>
                <b>Open project ↗</b>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-mark"><span className="orbit-dot" /> AA</div>
        <p>Astrophotography by Aous Abdo<br /><span>Made on Earth from ancient light.</span></p>
        <div><button onClick={() => share()}>Share the collection ↗</button><a href="#top">Back to the stars ↑</a></div>
      </footer>

      {active && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={active.title} onClick={(event) => event.target === event.currentTarget && closePhoto()}>
          <div className="lightbox-bar">
            <div><span>{String(photographs.findIndex((photo) => photo.slug === active.slug) + 1).padStart(2, '0')} / {photographs.length}</span><strong>{active.title}</strong></div>
            <div><button onClick={() => share(active)}>Share ↗</button><button className="close" onClick={closePhoto} aria-label="Close photograph">Close ×</button></div>
          </div>
          <img src={active.src} alt={active.note} />
          <div className="lightbox-controls">
            <button onClick={() => stepPhoto(-1)} aria-label="Previous photograph">←</button>
            <p>{active.note}</p>
            <button onClick={() => stepPhoto(1)} aria-label="Next photograph">→</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
