import { useEffect, useState } from 'react'
import { BlogHeader, BlogFooter } from './BlogChrome'
import footprints from './lagoon-footprints.json'
import fieldNote from './lagoon-field-note.json'
import './blog.css'
import './lagoon-field-note.css'

const media = '/stories/lagoon-trifid/'
const astrobin = 'https://app.astrobin.com/i/6j7oul'

const scopes = [
  {
    id: 'sqa55',
    name: 'Askar SQA55',
    color: '#9ddbcf',
    time: '21 h 15 m',
    detail: 'Its 264 mm focal length covered the full field. The dual-band exposures supplied the wide view of hydrogen and oxygen, and a separate June set helped establish star colours.',
  },
  {
    id: 'askar103',
    name: 'Askar 103APO',
    color: '#efd499',
    time: '19 h 30 m',
    detail: 'The Askar 103APO added sharper narrowband structure across the central field, using a filter that isolates hydrogen and oxygen emission.',
  },
  {
    id: 'flt120',
    name: 'William Optics FLT120',
    color: '#a9bcff',
    time: '5 h 30 m',
    detail: 'The FLT120 overlapped much of the Askar 103APO field. Its longer focal length provided another set of finer-scale measurements of the gas.',
  },
  {
    id: 'origin',
    name: 'Celestron Origin',
    color: '#ffad9d',
    time: '70 h 12 m 30 s',
    detail: 'Three pointings went deeper on the Lagoon, the Trifid, and the IC 1274 region. Unfiltered exposures from two of those fields recorded the blue light of stars reflected by dust.',
  },
] as const

type ScopeId = typeof scopes[number]['id']

export function LagoonFieldNote() {
  const [activeScope, setActiveScope] = useState<ScopeId | null>(null)
  const selected = scopes.find(scope => scope.id === activeScope)

  useEffect(() => { document.title = fieldNote.title + ' — One More Photon' }, [])

  return (
    <div className="blog-root lagoon-note">
      <a className="skip-link" href="#lagoon-article">Skip to field note</a>
      <BlogHeader article />
      <main id="lagoon-article">
        <header className="lagoon-heading">
          <a className="blog-back" href="/blog/">The blog</a>
          <p className="blog-eyebrow">Sagittarius / Deep-sky field note</p>
          <h1>Four telescopes,<br /><em>one field.</em></h1>
          <p className="lagoon-deck">The Lagoon and Trifid, built from 116 hours of exposure.</p>
          <p className="lagoon-byline">{fieldNote.author} · <time dateTime={fieldNote.date}>November 26, 2026</time></p>
        </header>

        <figure className="lagoon-field">
          <div className="lagoon-image-stage" data-scope={selected?.id ?? 'full'}>
            <img
              src={media + 'field-1000.webp'}
              srcSet={`${media}field-1000.webp 1000w, ${media}field-2200.webp 2200w`}
              sizes="(max-width: 760px) 100vw, 90vw"
              alt={fieldNote.imageAlt}
              width="2200"
              height="1434"
              fetchPriority="high"
            />
            {selected?.id === 'sqa55' && <span className="lagoon-full-outline" aria-hidden="true" />}
            {selected && selected.id !== 'sqa55' && (
              <svg viewBox={`0 0 1000 ${footprints.height}`} preserveAspectRatio="none" className="lagoon-coverage" aria-hidden="true">
                {footprints.regions[selected.id].map(points => (
                  <polygon key={points} points={points} fill={selected.color} fillOpacity=".16" stroke={selected.color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
                ))}
              </svg>
            )}
          </div>
          <div className="lagoon-scope-controls" role="group" aria-label="Show telescope coverage">
            <button type="button" aria-pressed={!selected} onClick={() => setActiveScope(null)}>Full image</button>
            {scopes.map(scope => (
              <button key={scope.id} type="button" aria-pressed={selected?.id === scope.id} onClick={() => setActiveScope(scope.id)}>
                <span className="lagoon-scope-swatch" style={{ backgroundColor: scope.color }} aria-hidden="true" />{scope.name}
              </button>
            ))}
          </div>
          <figcaption className="lagoon-field-caption" aria-live="polite">
            {selected ? (
              <>
                <strong>{selected.name} · {selected.time}</strong>
                <span>{selected.detail}</span>
              </>
            ) : (
              <>
                <strong>4.7° × 3.1° in Sagittarius</strong>
                <span>Select a telescope to see its coverage. The outlines follow the input frames, and the blend varies within them.</span>
              </>
            )}
          </figcaption>
        </figure>

        <section className="lagoon-text" aria-labelledby="lagoon-assembly">
          <h2 id="lagoon-assembly">What each telescope added</h2>
          <p>I collected this field from a balcony near Washington, DC, between May and September 2026. The Lagoon never rose higher than 27° from there. With four setups, I could cover the wider sky and still spend time on its smaller details.</p>
          <p>I stacked each telescope separately, aligned the finished stacks against Gaia stars, and combined them on one grid. Outside the narrower footprints, the SQA55 carries the view. In the center, overlapping data reveal finer structure. The total exposure was 116 hours, 27 minutes, and 30 seconds across the field.</p>
        </section>

        <section className="lagoon-detail" aria-labelledby="lagoon-hydrogen">
          <figure>
            <img src={media + 'hydrogen-between.webp'} width="1600" height="1525" loading="lazy" decoding="async" alt="Detail with the Lagoon at upper left, the smaller Trifid below and to the right, and faint red emission crossed by dark dust between them" />
            <figcaption>A crop of the finished image, with M8 at upper left and M20 at lower right.</figcaption>
          </figure>
          <div className="lagoon-text">
            <h2 id="lagoon-hydrogen">The red light between them</h2>
            <p>The Lagoon is the bright cloud at upper left. The Trifid is lower right, where blue reflected starlight meets red gas. Between them, look for the much fainter red emission running through the dark dust lanes.</p>
            <p>The faintest broad hydrogen structure was constrained by the <a href="https://doi.org/10.1086/323969">Southern H-Alpha Sky Survey Atlas</a>, scaled to my exposures where the two agree. <a href="https://www.cosmos.esa.int/web/gaia/dr3">Gaia DR3</a> supplied stellar photometry for the unresolved Sagittarius Star Cloud and helped calibrate the colours of the stars.</p>
            <a className="lagoon-link" href={astrobin}>View the full-resolution image on AstroBin</a>
          </div>
        </section>
      </main>
      <BlogFooter />
    </div>
  )
}
