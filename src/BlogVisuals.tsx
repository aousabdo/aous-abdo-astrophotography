import { useId } from 'react'
import './blog.css'
const DARK_SKY_PATH = '/blog/how-far-for-dark-skies/'

export function SkyDome({ compact = false }: { compact?: boolean }) {
  const id = useId().replaceAll(':','')
  return <svg className={`blog-dome ${compact?'compact':''}`} viewBox="0 0 1000 520" role="img" aria-label="Conceptual illustration of a small nearby town and a large distant city contributing light to an observing sky. Not a geographic map or brightness simulation.">
    <defs><radialGradient id={`glow-${id}`}><stop stopColor="#e9b179" stopOpacity=".6"/><stop offset="1" stopColor="#e9b179" stopOpacity="0"/></radialGradient><linearGradient id={`sky-${id}`} x2="0" y2="1"><stop stopColor="#0b1c2b"/><stop offset="1" stopColor="#0b151c"/></linearGradient></defs>
    <rect width="1000" height="520" fill={`url(#sky-${id})`}/>
    {[ [80,80],[130,190],[220,64],[290,140],[351,50],[420,105],[490,42],[565,90],[610,150],[690,52],[775,135],[832,64],[920,182],[90,305],[355,224],[748,245],[850,320],[950,60] ].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i%4===0?1.9:1.1} fill="#e8eee7" opacity={i%3===0?.8:.4}/>)}
    <ellipse cx="240" cy="385" rx="215" ry="205" fill={`url(#glow-${id})`}/><ellipse cx="845" cy="400" rx="190" ry="138" fill={`url(#glow-${id})`}/>
    <path d="M0 432Q160 402 340 428T680 425T1000 430V520H0Z" fill="#081013"/>
    <path d="M218 408V392H229V402H239V386H251V408M799 410V375H814V389H826V358H843V379H855V365H869V400H881V382H896V412" fill="#d5aa7e" opacity=".8"/>
    <path d="M251 393Q365 160 509 250M835 368Q700 105 510 249" fill="none" stroke="#e4b27f" strokeWidth="1.4" strokeDasharray="5 8" opacity=".55"/>
    <circle cx="510" cy="250" r="6" fill="#d8e8df"/><path d="M511 425v-22m-8 22 8-14 8 14m-13-23 17-12" stroke="#d7e4dc" strokeWidth="3" fill="none"/>
    <text x="181" y="472">NEARBY TOWN</text><text x="752" y="472">DISTANT CITY</text><text x="422" y="300">ONE OBSERVING SKY</text>
    {!compact&&<text className="dome-note" x="42" y="34">CONCEPTUAL ILLUSTRATION / NOT A SKY BRIGHTNESS MAP</text>}
  </svg>
}

export function BlogSpotlight() {
  return <section className="blog-spotlight" aria-labelledby="blog-spotlight-title"><a className="blog-spotlight-art" href={DARK_SKY_PATH} tabIndex={-1} aria-hidden="true"><SkyDome compact/></a><div><p className="blog-eyebrow">FROM THE BLOG / DARK SKIES</p><h2 id="blog-spotlight-title">How far must you travel<br/><em>for a dark sky?</em></h2><p>A nearby town. A distant city. Why the whole sky matters—and what a simple model can actually tell us.</p><a className="blog-text-link" href={DARK_SKY_PATH}>Read & explore the experiment ↗</a><a className="blog-small-link" href="/blog/">All field notes →</a></div></section>
}

