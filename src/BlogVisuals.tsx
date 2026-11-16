import './blog.css'
const DARK_SKY_PATH = '/blog/how-far-for-dark-skies/'

export const DARK_SKY_ARTWORK = '/stories/dark-skies/dark-skies-photoreal-v3'

export function DarkSkyArtwork({ compact = false }: { compact?: boolean }) {
  return <div className={`dark-sky-artwork ${compact?'compact':''}`}><img src={`${DARK_SKY_ARTWORK}.webp`} width="3072" height="2560" loading={compact?'lazy':'eager'} decoding="async" alt="The city ends. Its light doesn’t. A conceptual mountain landscape shows upward light from a nearby town and a distant city scattering through molecules and aerosols into a telescope. Natural sky brightness, nearby skyglow and distant skyglow add to the observing background. Paths and colors are illustrative, not to scale."/></div>
}

export function BlogSpotlight() {
  return <section className="blog-spotlight" aria-labelledby="blog-spotlight-title"><a className="blog-spotlight-art" href={DARK_SKY_PATH} tabIndex={-1} aria-hidden="true"><DarkSkyArtwork compact/></a><div><p className="blog-eyebrow">FROM THE BLOG / DARK SKIES</p><h2 id="blog-spotlight-title">How far must you travel<br/><em>for a dark sky?</em></h2><p>A nearby town. A distant city. Why the whole sky matters—and what a simple model can actually tell us.</p><a className="blog-text-link" href={DARK_SKY_PATH}>Read & explore the experiment ↗</a><a className="blog-small-link" href="/blog/">All field notes →</a></div></section>
}

