import './scope-spotlight.css'

const rho = '/astro/scope-and-sky/rho-ophiuchi-background'

export function ScopeSpotlight({ href = '/about/#scope-and-sky' }: { href?: string }) {
  return (
    <section className="scope-spotlight" aria-labelledby="scope-spotlight-title">
      <a href={href} className="scope-spotlight-link">
        <img
          src={rho + '-1200.webp'}
          srcSet={`${rho}-1200.webp 1200w, ${rho}-2400.webp 2400w`}
          sizes="100vw"
          width="2400"
          height="1603"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className="scope-spotlight-copy">
          <p>Scope &amp; Sky</p>
          <h2 id="scope-spotlight-title">Six telescopes.<br /><em>Six photographs.</em></h2>
          <span>Explore the pairings</span>
        </div>
      </a>
    </section>
  )
}
