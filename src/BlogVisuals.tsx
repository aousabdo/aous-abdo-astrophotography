import lagoonFieldNote from './lagoon-field-note.json'
import './blog.css'

export const DARK_SKY_ARTWORK = '/stories/dark-skies/dark-skies-photoreal-v3'

export function DarkSkyArtwork({ compact = false }: { compact?: boolean }) {
  return <div className={`dark-sky-artwork ${compact?'compact':''}`}><img src={`${DARK_SKY_ARTWORK}.webp`} width="3072" height="2560" loading={compact?'lazy':'eager'} decoding="async" alt="The city ends. Its light doesn’t. A conceptual mountain landscape shows upward light from a nearby town and a distant city scattering through molecules and aerosols into a telescope. Natural sky brightness, nearby skyglow and distant skyglow add to the observing background. Paths and colors are illustrative, not to scale."/></div>
}

export function BlogSpotlight() {
  return (
    <section className="blog-spotlight" aria-labelledby="blog-spotlight-title">
      <a className="blog-spotlight-art" href={lagoonFieldNote.path} tabIndex={-1} aria-hidden="true">
        <img className="ifn-spotlight-image" src="/stories/lagoon-trifid/field-1000.webp" width="1000" height="652" loading="lazy" alt="" />
      </a>
      <div>
        <p className="blog-eyebrow">New from the blog / Sagittarius</p>
        <h2 id="blog-spotlight-title">Four telescopes,<br /><em>one field.</em></h2>
        <p>See where each telescope contributed to 116 hours of the Lagoon and Trifid.</p>
        <a className="blog-text-link" href={lagoonFieldNote.path}>Read the field note</a>
        <a className="blog-small-link" href="/blog/">All field notes</a>
      </div>
    </section>
  )
}
