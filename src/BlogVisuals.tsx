import { useId } from 'react'
import './blog.css'
const DARK_SKY_PATH = '/blog/how-far-for-dark-skies/'

export function SkyDome({ compact = false }: { compact?: boolean }) {
  const id = useId().replaceAll(':','')
  return <div className={`blog-sky-scene ${compact?'compact':''}`}>
    {!compact&&<div className="sky-scene-heading"><p>THE JOURNEY OF STRAY LIGHT</p><h2>Different places.<br/><em>One background.</em></h2><span>The atmosphere connects them.</span></div>}
    <svg className="blog-dome" viewBox="0 0 1000 410" role="img" aria-label="Schematic light paths: upward light from a nearby town and a distant city scatters from molecules and aerosols in the atmosphere toward the same observing site. Starlight also reaches the telescope. Geometry and brightness are illustrative, not to scale.">
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#102635"/><stop offset="1" stopColor="#09161d"/></linearGradient>
        <radialGradient id={`town-${id}`}><stop stopColor="#dca967" stopOpacity=".28"/><stop offset="1" stopColor="#dca967" stopOpacity="0"/></radialGradient>
        <radialGradient id={`city-${id}`}><stop stopColor="#90bdb6" stopOpacity=".22"/><stop offset="1" stopColor="#90bdb6" stopOpacity="0"/></radialGradient>
        <linearGradient id={`air-${id}`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#85aab4" stopOpacity="0"/><stop offset=".5" stopColor="#85aab4" stopOpacity=".075"/><stop offset="1" stopColor="#85aab4" stopOpacity="0"/></linearGradient>
        <marker id={`arrow-town-${id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="m1 1 8 4-8 4" fill="none" stroke="#e4b77d" strokeWidth="1.4"/></marker>
        <marker id={`arrow-city-${id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="m1 1 8 4-8 4" fill="none" stroke="#9accc0" strokeWidth="1.4"/></marker>
      </defs>
      <rect width="1000" height="410" fill={`url(#sky-${id})`}/>
      {Array.from({length:65},(_,i)=><circle key={i} cx={25+(i*137)%950} cy={18+(i*67)%250} r={i%11===0?1.7:.8} fill="#e5ece7" opacity={.17+(i%5)*.1}/>)}
      <path d="M0 90Q500 10 1000 90V210Q500 115 0 210Z" fill={`url(#air-${id})`}/>
      <ellipse cx="180" cy="320" rx="230" ry="190" fill={`url(#town-${id})`}/><ellipse cx="865" cy="330" rx="260" ry="170" fill={`url(#city-${id})`}/>
      <g fill="#bdd9d5" opacity=".2">{Array.from({length:37},(_,i)=><circle key={i} cx={50+(i*83)%900} cy={85+(i*29)%110} r={i%3===0?2:1}/>)}</g>
      <path d="M180 318 424 151" fill="none" stroke="#e4b77d" strokeWidth="1.6" markerEnd={`url(#arrow-town-${id})`}/><path d="M424 151 500 328" fill="none" stroke="#e4b77d" strokeWidth="1.6" strokeDasharray="5 5" markerEnd={`url(#arrow-town-${id})`}/>
      <path d="M860 318 566 121" fill="none" stroke="#9accc0" strokeWidth="1.6" markerEnd={`url(#arrow-city-${id})`}/><path d="M566 121 500 328" fill="none" stroke="#9accc0" strokeWidth="1.6" strokeDasharray="5 5" markerEnd={`url(#arrow-city-${id})`}/>
      <g fill="none">{[[424,151,'#e4b77d'],[566,121,'#9accc0']].map(([x,y,color],i)=><g key={i}><circle cx={x} cy={y} r="16" stroke={String(color)} opacity=".22"/><circle cx={x} cy={y} r="5" fill={String(color)}/></g>)}</g>
      <path d="M505 38 500 326" stroke="#e7e9dc" strokeWidth="1" strokeDasharray="2 8" opacity=".6"/>
      <path d="m505 27 2.6 8.2 8.4 2.6-8.4 2.7-2.6 8.1-2.6-8.1-8.4-2.7 8.4-2.6Z" fill="#f2ebd6"/>
      <path d="M0 347Q150 302 295 344T610 345T1000 336V410H0Z" fill="#091116"/><path d="M0 347Q150 302 295 344T610 345T1000 336" fill="none" stroke="#31454b" strokeWidth="1"/>
      <g fill="#bd9567"><path d="M145 325v-22h18v22h7v-31h18v31h8v-18h18v18Z"/><g fill="#f2cf8e"><rect x="150" y="308" width="4" height="6"/><rect x="177" y="300" width="4" height="6"/><rect x="200" y="313" width="4" height="6"/></g></g>
      <g fill="#6d9995"><path d="M810 324v-36h17v36h8v-52h21v52h7v-69h22v69h7v-44h22v44h9v-26h17v26Z"/><g fill="#bee1cb">{[842,870,899].map((x,i)=><g key={x}><rect x={x} y={285-i*5} width="4" height="5"/><rect x={x} y={300-i*5} width="4" height="5"/></g>)}</g></g>
      <ellipse cx="500" cy="358" rx="46" ry="5" fill="#a6c4bc" opacity=".08"/><g stroke="#deebe0" fill="none" strokeWidth="2.3"><path d="m486 326 25-15 6 9-25 15Z" fill="#829c99"/><path d="M500 331v12m0-4-15 21m15-21 15 21m-15-21v23"/><path d="m514 316 5-3"/></g>
      {!compact&&<><text className="sky-air-label" x="690" y="58">MOLECULES + AEROSOLS</text><path d="M691 67 606 110" fill="none" stroke="#7faaa9" strokeWidth=".8" opacity=".6"/><text className="sky-star-label" x="527" y="35">STARLIGHT</text></>}
      <text className="sky-path-label" x="245" y="223" transform="rotate(-34 245 223)">UPWARD LIGHT</text><text className="sky-path-label city" x="690" y="195" transform="rotate(34 690 195)">UPWARD LIGHT</text>
    </svg>
    <div className="sky-scene-key"><div><i className="sky-key-dot town"/><strong>Nearby town</strong><span>Less light.<br/>A shorter journey.</span></div><div><i className="sky-key-dot observer"/><strong>Your observing sky</strong><span>Scattered light adds<br/>to the background.</span></div><div><i className="sky-key-dot city"/><strong>Distant city</strong><span>More light.<br/>A longer journey.</span></div></div>
    {!compact&&<div className="sky-scene-footnote"><span><i/> Upward light</span><span><i/> Scattered toward observer</span><small>SCHEMATIC · NOT TO SCALE</small></div>}
  </div>
}

export function BlogSpotlight() {
  return <section className="blog-spotlight" aria-labelledby="blog-spotlight-title"><a className="blog-spotlight-art" href={DARK_SKY_PATH} tabIndex={-1} aria-hidden="true"><SkyDome compact/></a><div><p className="blog-eyebrow">FROM THE BLOG / DARK SKIES</p><h2 id="blog-spotlight-title">How far must you travel<br/><em>for a dark sky?</em></h2><p>A nearby town. A distant city. Why the whole sky matters—and what a simple model can actually tell us.</p><a className="blog-text-link" href={DARK_SKY_PATH}>Read & explore the experiment ↗</a><a className="blog-small-link" href="/blog/">All field notes →</a></div></section>
}

