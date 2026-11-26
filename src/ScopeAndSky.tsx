import { useEffect } from 'react'
import { BlogHeader, BlogFooter } from './BlogChrome'
import './blog.css'
import './scope-and-sky.css'

const asset = (path: string) => import.meta.env.BASE_URL + path

const equipment = [
  { name: 'Celestron Origin', use: 'A portable wide-field setup for nebulae and star clouds.', subject: 'Lagoon Nebula', image: 'lagoon', astrobin: 'tv3uqt' },
  { name: 'William Optics FLT120', use: '120 mm of aperture for fine dust, narrow structures, and long integrations.', subject: 'Pleiades', image: 'pleiades', astrobin: 'g5zenp' },
  { name: 'Celestron EdgeHD 11', use: 'Long focal length for close studies of small structures.', subject: 'Pillars of Creation', image: 'pillars', astrobin: '3hid93' },
  { name: 'Askar 103APO', use: 'Detailed views of nebulae and, with a solar filter, the Sun.', subject: 'The Sun in white light', image: 'sun', astrobin: 'e1mwc7' },
  { name: 'Askar SQA55', use: 'A wide, flat 264 mm field for dust and reflection nebulae.', subject: 'Rho Ophiuchi', image: 'rho-ophiuchi', astrobin: 'uoxhof' },
  { name: 'Askar SQA85', use: 'A 408 mm field that can take in a nebular complex and still resolve detail.', subject: 'Horsehead & Flame', image: 'horsehead-flame', astrobin: 'efpqdp' },
]

export function ScopeAndSkySection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className="equipment-section" id="scope-and-sky" aria-labelledby="equipment-title">
      <div className="equipment-backdrop" aria-hidden="true">
        <img
          src={asset('astro/scope-and-sky/rho-ophiuchi-background-1200.webp')}
          srcSet={`${asset('astro/scope-and-sky/rho-ophiuchi-background-1200.webp')} 1200w, ${asset('astro/scope-and-sky/rho-ophiuchi-background-2400.webp')} 2400w`}
          sizes="100vw"
          width="2400"
          height="1603"
          alt=""
          loading={standalone ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      <header className="equipment-heading">
        <div>
          {standalone ? <h1 id="equipment-title">Scope &amp; Sky</h1> : <h2 id="equipment-title">Different glass.<br />The same sky.</h2>}
          <p>Six telescopes, each paired with a photograph I made through it.</p>
        </div>
        <a className="equipment-credit" href="https://app.astrobin.com/i/uoxhof" target="_blank" rel="noreferrer">Rho Ophiuchi · Askar SQA55 <span aria-hidden="true">↗</span></a>
      </header>
      <div className="equipment-grid">
        {equipment.map((item) => (
          <article key={item.name}>
            <a className="equipment-photo" href={`https://app.astrobin.com/i/${item.astrobin}`} target="_blank" rel="noreferrer" aria-label={`${item.subject} on AstroBin`}>
              <img src={asset(`astro/scope-and-sky/${item.image}.webp`)} alt="" width="1000" height="625" loading="lazy" decoding="async" />
              <span>{item.subject} <span aria-hidden="true">↗</span></span>
            </a>
            <div className="equipment-copy">
              <h3>{item.name}</h3>
              <p>{item.use}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function ScopeAndSkyPage() {
  useEffect(() => { document.title = 'Scope & Sky — One More Photon' }, [])

  return (
    <div className="blog-root scope-page">
      <a className="skip-link" href="#scope-and-sky">Skip to telescope pairings</a>
      <BlogHeader article />
      <main><ScopeAndSkySection standalone /></main>
      <BlogFooter />
    </div>
  )
}
