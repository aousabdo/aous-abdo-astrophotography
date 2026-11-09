import { useState } from 'react'
import { transmission, stromgrenRadiusPc, expansionYears, solarPeriodDays, lunarFraction } from './physics'
import { sources } from './science'
const fmt=(n:number,d=1)=>n.toLocaleString('en-US',{maximumFractionDigits:d})
export function PhysicsLab({id}:{id:string}) {
 const [value,setValue]=useState(id==='iris'?1:id==='orion'?2:id==='helix'?1.5:id==='sun'?30:90)
 const [speed,setSpeed]=useState(20)
 const slider=(label:string,min:number,max:number,step:number,unit:string)=> <label className="lab-slider"><span>{label}<b>{fmt(value,2)}{unit}</b></span><input type="range" min={min} max={max} step={step} value={value} onChange={e=>setValue(Number(e.target.value))}/></label>
 let title='',body='',equation='',assumptions='',source=sources.extinction
 let controls,visual,result
 if(id==='iris') {
  title='Turn up the dust';body='How much background light survives a dusty line of sight? Increase optical depth and compare three illustrative bands.'
  equation='Iλ / Iλ,0 = exp(−τλ);  τB = 1.3τV,  τR = 0.75τV';assumptions='A simple foreground screen with chosen band ratios. It models extinction out of the beam, not scattered light entering it. No grain sizes or dust column are measured from this photograph.'
  controls=slider('Visual optical depth τV',0,4,.1,'')
  const bands=[{name:'Blue',factor:1.3,color:'#8fbaff'},{name:'Green',factor:1,color:'#a5d3ba'},{name:'Red',factor:.75,color:'#ebaa9b'}]
  visual=<div className="transmission-bars">{bands.map(b=><div key={b.name}><span>{b.name}</span><i><b style={{width:`${transmission(value,b.factor)*100}%`,background:b.color}}/></i><strong>{fmt(transmission(value,b.factor)*100)}%</strong></div>)}</div>
  result=<><strong>{fmt(transmission(value)*100)}%</strong><span>of the initial green-band light transmitted</span></>
 } else if(id==='orion') {
  title='Build an ionized bubble';body='Keep a star’s ionizing output fixed. What happens to the equilibrium ionized radius when the surrounding gas gets denser?'
  source=sources.ionization;equation='RS = [3Q / (4παB nH²)]⅓';assumptions='Uniform pure hydrogen, steady ionization balance, Q = 10⁴⁹ photons/s, αB = 2.6 × 10⁻¹³ cm³/s at about 10,000 K. No dust, winds, leakage or clumping. This is not a size measurement of Orion.'
  const density=10**value,radius=stromgrenRadiusPc(density)
  controls=<label className="lab-slider"><span>Hydrogen density <b>{fmt(density,0)} cm⁻³</b></span><input aria-label="Hydrogen density, logarithmic scale" type="range" min="1" max="4" step=".05" value={value} onChange={e=>setValue(Number(e.target.value))}/></label>
  visual=<svg viewBox="0 0 320 250" role="img" aria-label={`Model ionized radius ${fmt(radius,2)} parsecs at density ${fmt(density,0)} per cubic centimeter`}><circle cx="160" cy="125" r="112" fill="none" stroke="#304654" strokeDasharray="3 6"/><circle cx="160" cy="125" r={Math.max(3,112*radius/stromgrenRadiusPc(10))} fill="#6ea4ad55" stroke="#a3d5db"/><text x="160" y="133" textAnchor="middle" fill="#fff" fontSize="25">✦</text><text x="160" y="246" textAnchor="middle" fill="#91a9b7" fontSize="10">Fixed scale · dashed boundary = radius at 10 cm⁻³</text></svg>
  result=<><strong>{fmt(radius,2)} pc</strong><span>model ionized radius · denser gas recombines faster</span></>
 } else if(id==='helix') {
  title='Put a clock on an expanding shell';body='A radius and a speed give a dynamical timescale. Change either assumption and watch the inferred timescale move.'
  source=sources.helix;equation='tdyn = R / v';assumptions='Constant expansion speed and a known physical radius. Real shells have geometry, multiple components and changing speeds. The result is an illustrative timescale, not a measured age of the Helix or its star.'
  controls=<>{slider('Shell radius',.2,2,.05,' ly')}<label className="lab-slider"><span>Expansion speed<b>{speed} km/s</b></span><input type="range" min="10" max="50" step="1" value={speed} onChange={e=>setSpeed(Number(e.target.value))}/></label></>
  visual=<svg viewBox="0 0 320 250" role="img" aria-label={`Shell radius ${fmt(value,2)} light-years`}><circle cx="160" cy="120" r={value*52} fill="none" stroke="#94bcb5" strokeWidth="12"/><circle cx="160" cy="120" r="3" fill="white"/><path d={`M160 120h${value*52}`} stroke="#e8c3a4" strokeDasharray="4 4"/><text x="160" y="246" textAnchor="middle" fill="#91a9b7" fontSize="10">Schematic cross section · not a reconstruction of the Helix</text></svg>
  result=<><strong>{fmt(expansionYears(value,speed),0)} years</strong><span>R / v · an assumption-dependent expansion timescale</span></>
 } else if(id==='sun') {
  title='Give the Sun more than one rotation rate';body='Choose a latitude and compare it with the equator. A plasma surface can rotate at different rates in different places.'
  source=sources.rotation;equation='P(φ) = 25 + 11 sin²φ days;  Δθ per day = 360° / P';assumptions='An illustrative sidereal-period interpolation between 25 and 36 days, not an observational fit or the rotation law used in the video. Apparent periods from orbiting Earth are longer. Features also evolve.'
  controls=slider('Solar latitude',0,90,1,'°')
  const period=solarPeriodDays(value)
  visual=<div className="transmission-bars solar-bars">{[{label:'Equator',period:25},{label:`${value}° latitude`,period}].map(b=><div key={b.label}><span>{b.label}</span><i><b style={{width:`${25/b.period*100}%`,background:'#dfb574'}}/></i><strong>{fmt(360/b.period)}°/day</strong></div>)}</div>
  result=<><strong>{fmt(period)} days</strong><span>model period relative to the stars at this latitude</span></>
 } else {
  title='Move the sunlight';body='Change the Sun–Moon–observer angle. How much of the visible lunar disk is illuminated?'
  source=sources.phases;equation='k = (1 + cos α) / 2';assumptions='A spherical Moon with ideal geometric illumination; α is the angle at the Moon. Illuminated area is not the same as observed brightness. No crater relief, surface scattering or opposition effect is modeled. This does not alter the photograph.'
  controls=slider('Phase angle α (0° = full)',0,180,1,'°')
  const c=Math.cos(value*Math.PI/180),points:string[]=[]
  for(let i=0;i<=60;i++){const y=-1+2*i/60;points.push(`${160+100*Math.sqrt(Math.max(0,1-y*y))},${120+100*y}`)}
  for(let i=60;i>=0;i--){const y=-1+2*i/60;points.push(`${160-100*c*Math.sqrt(Math.max(0,1-y*y))},${120+100*y}`)}
  visual=<svg viewBox="0 0 320 250" role="img" aria-label={`Geometric illuminated fraction ${fmt(lunarFraction(value)*100)} percent`}><circle cx="160" cy="120" r="100" fill="#1b252c" stroke="#46535c"/><polygon points={points.join(' ')} fill="#dad8cd"/><text x="160" y="246" textAnchor="middle" fill="#91a9b7" fontSize="10">Ideal illumination · Sun toward the right</text></svg>
  result=<><strong>{fmt(lunarFraction(value)*100)}%</strong><span>of the apparent disk illuminated</span></>
 }
 return <section className="physics-lab"><p className="science-eyebrow">A SMALL PHYSICS EXPERIMENT</p><h4>{title}</h4><p>{body}</p><div className="lab-layout"><div className="lab-visual">{visual}</div><div className="lab-controls">{controls}<output className="lab-result" aria-live="polite">{result}</output><button className="lab-reset" onClick={()=>{setValue(id==='iris'?1:id==='orion'?2:id==='helix'?1.5:id==='sun'?30:90);setSpeed(20)}}>Reset experiment ↺</button></div></div><details className="model-details"><summary>Go deeper · equation & assumptions</summary><code>{equation}</code><p>{assumptions}</p><a href={source.url} target="_blank" rel="noreferrer">Physical background: {source.title} ↗</a></details><p className="model-label">Educational model · controls change the diagram, not the observed image.</p></section>
}
