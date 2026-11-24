import './blog.css'

export const DARK_SKY_ARTWORK = '/stories/dark-skies/dark-skies-photoreal-v3'

export function DarkSkyArtwork({ compact = false }: { compact?: boolean }) {
  return <div className={`dark-sky-artwork ${compact?'compact':''}`}><img src={`${DARK_SKY_ARTWORK}.webp`} width="3072" height="2560" loading={compact?'lazy':'eager'} decoding="async" alt="The city ends. Its light doesn’t. A conceptual mountain landscape shows upward light from a nearby town and a distant city scattering through molecules and aerosols into a telescope. Natural sky brightness, nearby skyglow and distant skyglow add to the observing background. Paths and colors are illustrative, not to scale."/></div>
}

export function BlogSpotlight() {
  return <section className="blog-spotlight" aria-labelledby="blog-spotlight-title"><a className="blog-spotlight-art" href="/blog/the-dust-between-us-and-m81/" tabIndex={-1} aria-hidden="true"><img className="ifn-spotlight-image" src="/stories/m81-ifn/blog_07_full_frame.jpg" width="2400" height="1570" loading="lazy" alt="" style={{display:'block',width:'100%',height:'auto'}}/></a><div><p className="blog-eyebrow">NEW FROM THE BLOG / DEEP SKY</p><h2 id="blog-spotlight-title">The dust between us<br/><em>and M81.</em></h2><p>Fifteen hours, a 120 mm telescope, and a match with Planck that survives tests on every night, quarter and scale.</p><p className="blog-byline">A field note by Dr. Aous A. Abdo</p><a className="blog-text-link" href="/blog/the-dust-between-us-and-m81/">Read the field note</a><a className="blog-small-link" href="/blog/">All field notes</a></div></section>
}
