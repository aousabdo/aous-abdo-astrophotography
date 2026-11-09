import { useState } from 'react'
import { hydrogenIonizes, photonEnergyEv, shellPathLength, shadowLengthKm, planckContrast, transmission } from './physics'
import { sources, type Source } from './science'
const format=(n:number,d=2)=>n.toLocaleString('en-US',{maximumFractionDigits:d})
function Range({label,value,min,max,step=1,unit='',onChange}:{label:string;value:number;min:number;max:number;step?:number;unit?:string;onChange:(v:number)=>void}) {
 return <label className="experiment-range"><span>{label}<b>{format(value)}{unit}</b></span><input aria-label={label} type="range" value={value} min={min} max={max} step={step} onChange={e=>onChange(+e.target.value)}/></label>
}
export function ScienceExperiments({id}:{id:string}) {
 const [a,setA]=useState(id==='iris'?1:id==='orion'?656.3:id==='helix'?.4:id==='sun'?4200:12)
 const [b,setB]=useState(id==='helix'?.25:1)
 const [mode,setMode]=useState(false)
 let title='',intro='',takeaway='',equation='',assumptions='',source:Source=sources.extinction,visual,controls,result
 if(id==='iris') {
  title='The same dust can brighten and darken the sky.'
  intro='The blue Iris and its dark lanes do opposite things to your line of sight. Select a light path, then change how much dust is in the way.'
  visual=<svg className="experiment-svg iris-path-diagram" viewBox="0 0 660 300" role="img" aria-label={mode?'Starlight is scattered sideways by dust toward an observer.':'Dust removes light from a direct star-to-observer beam.'}>
   <defs><marker id="iris-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="#b4d5df"/></marker></defs>
   <ellipse cx="340" cy="140" rx="95" ry="90" fill="#8f775025" stroke="#a49068" strokeDasharray="4 7"/>
   {Array.from({length:32},(_,i)=><circle key={i} cx={270+(i*47%141)} cy={68+(i*61%145)} r={2+a} fill="#b09a70" opacity=".7"/>)}
   <text x="75" y="145" textAnchor="middle" fill="#eee9bd" fontSize="45">✦</text>
   <text x="75" y="191" textAnchor="middle" className="svg-label">STAR</text><text x="340" y="30" textAnchor="middle" className="svg-label">DUST CLOUD</text>
   <path d="M105 135H290" stroke="#edcd8d" strokeWidth="3" markerEnd="url(#iris-arrow)"/>
   {mode?<><path d="M340 140L525 252" stroke="#a3c6f1" strokeWidth="3" markerEnd="url(#iris-arrow)"/><text x="557" y="278" textAnchor="middle" className="svg-label">OBSERVER</text><path d="M340 140L450 82M340 140L354 224M340 140L415 184" stroke="#a3c6f1" opacity=".35" strokeDasharray="5 5"/><text x="495" y="130" className="svg-note">A little light is</text><text x="495" y="150" className="svg-note">redirected toward us.</text></>:<><path d="M370 135H565" stroke="#edcd8d" strokeWidth="3" opacity={Math.max(.05,transmission(a))} markerEnd="url(#iris-arrow)"/><text x="590" y="140" fill="#d9e4e7" fontSize="27">◉</text><text x="585" y="191" textAnchor="middle" className="svg-label">OBSERVER</text><path d="M340 135L402 72M340 135L373 217" stroke="#adc5db" opacity=".5" strokeDasharray="5 5"/></>}
  </svg>
  controls=<><div className="experiment-presets"><button aria-pressed={!mode} onClick={()=>setMode(false)}>Look through the cloud</button><button aria-pressed={mode} onClick={()=>setMode(true)}>See scattered starlight</button></div><Range label="Optical depth along the direct beam" value={a} min={0} max={4} step={.1} onChange={setA}/></>
  result=<><strong>{format(transmission(a)*100,1)}%</strong><span>of the direct beam survives this optical depth</span></>
  takeaway='“Reflection” and “dark” describe how we see the cloud. They do not require two different kinds of material. More dust can hide background stars while nearby dust scatters light into a different sight line.'
  equation='Direct beam: I / I₀ = e⁻τ. Scattered light depends separately on illumination, grain properties and geometry.'
  assumptions='The direct beam uses a foreground-screen extinction model. The sideways path is schematic, not a calculated scattering brightness. The slider does not infer the Iris dust column or predict that scattered brightness rises monotonically with depth.'
 } else if(id==='orion') {
  title='The red light is the aftermath. The power source is ultraviolet.'
  intro='Try the wavelength of a photon. Can one photon of that wavelength remove an electron from a ground-state hydrogen atom?'
  const energy=photonEnergyEv(a),ionizes=hydrogenIonizes(a)
  source=sources.ionization
  visual=<div className="experiment-visual-pair"><svg viewBox="0 0 320 280" role="img" aria-label={ionizes?'The photon has enough energy to ionize ground-state hydrogen.':'The photon has too little energy to ionize ground-state hydrogen.'}>
   <circle cx="160" cy="125" r="65" fill="none" stroke="#4f6f81" strokeDasharray="3 6"/><circle cx="160" cy="125" r="7" fill="#e1d4b4"/>
   <path d="M15 125Q25 102 35 125T55 125T75 125T95 125" fill="none" stroke={ionizes?'#c6a0e4':'#e9aa98'} strokeWidth="3"/>
   <circle cx={ionizes?270:225} cy={ionizes?48:125} r="6" fill="#b3d6e1"/>{ionizes&&<path d="M225 125L265 55" stroke="#b3d6e1" strokeDasharray="4 5"/>}
   <text x="160" y="232" textAnchor="middle" className="svg-label">{ionizes?'ELECTRON CAN ESCAPE':'GROUND-STATE ATOM STAYS BOUND'}</text><text x="160" y="258" textAnchor="middle" className="svg-note">One-photon ionization test</text>
  </svg><div className="energy-scale"><span>Photon energy</span><strong>{format(energy)} <small>eV</small></strong><div className="energy-meter"><i style={{width:`${Math.min(100,energy/30*100)}%`}}/><b style={{left:`${13.5984/30*100}%`}}/></div><p>Hydrogen threshold <b>13.60 eV</b></p><p className={ionizes?'energy-pass':'energy-fail'}>{ionizes?'Enough energy for ionization':'Too little energy for ionization'}</p></div></div>
  controls=<><div className="experiment-presets"><button aria-pressed={a===656.3} onClick={()=>setA(656.3)}>Hα · 656.3 nm</button><button aria-pressed={a===500.7} onClick={()=>setA(500.7)}>[O III] · 500.7 nm</button><button aria-pressed={a===60} onClick={()=>setA(60)}>Ionizing UV · 60 nm</button></div><Range label="Photon wavelength" value={a} min={40} max={750} step={.1} unit=" nm" onChange={setA}/></>
  result=<><strong>{ionizes?'UV can ionize':'This photon cannot ionize ground-state H'}</strong><span>Threshold wavelength ≈ 91.18 nm</span></>
  takeaway='A hot star’s UV photon can be absorbed in ionization. Recombination and atomic cascades later produce new photons, including Hα at 656.3 nm. Orion’s visible glow lets us see energy that has been redistributed; it is not the original ultraviolet beam turned red intact.'
  equation='E = hc / λ ≈ 1239.842 / λ[nm] eV. Ground-state H requires 13.5984 eV (NIST). Hα: n = 3 → 2, about 1.89 eV.'
  assumptions='An isolated ground-state hydrogen atom and single-photon ionization. Excited-state ionization, collisions and other atoms are outside this model. The oxygen-line preset tests that photon against hydrogen; it does not model oxygen ionization.'
 } else if(id==='helix') {
  title='A hollow shell can look brightest around its edge.'
  intro='Slide a sight line through a simple shell. The camera adds up all the emitting gas along that line, even though it records only a flat image.'
  const inner=1-b,path=shellPathLength(a,inner),peak=shellPathLength(inner,inner),outer=Math.sqrt(1-a*a)*96,inside=a<inner?Math.sqrt(inner*inner-a*a)*96:0,y=125-a*96
  source=sources.helix
  visual=<div className="experiment-visual-pair"><svg viewBox="0 0 320 280" role="img" aria-label={`Cross section: sight line at ${format(a)} outer radii crosses ${format(path)} normalized lengths of emitting gas`}>
   <circle cx="160" cy="125" r="96" fill="#789e9e55" stroke="#abc9c7"/><circle cx="160" cy="125" r={96*inner} fill="#0e1d25" stroke="#779d9b"/><circle cx="160" cy="125" r="3" fill="#eee3c3"/>
   <path d={`M12 ${y}H308`} stroke="#8aa3b0" strokeDasharray="3 5"/><path d={`M${160-outer} ${y}H${160-inside}M${160+inside} ${y}H${160+outer}`} stroke="#e6bf85" strokeWidth="5"/>
   <text x="160" y="250" textAnchor="middle" className="svg-label">CROSS SECTION THROUGH THE GAS</text><text x="160" y="273" textAnchor="middle" className="svg-note">Gold segments = emitting path length</text>
  </svg><svg viewBox="0 0 320 280" role="img" aria-label="An ideal shell projected onto the sky shows a brighter rim even with uniform gas emissivity.">
   <defs><radialGradient id="helix-projected-glow">{Array.from({length:129},(_,i)=><stop key={i} offset={`${i/128*100}%`} stopColor="#a5d8ca" stopOpacity={shellPathLength(i/128,inner)/peak}/>)}</radialGradient></defs><circle cx="160" cy="125" r="96" fill="#03090e"/><circle cx="160" cy="125" r="96" fill="url(#helix-projected-glow)"/>
   <path d={`M45 ${y}H275`} stroke="#e6bf85" strokeDasharray="3 4"/><text x="160" y="250" textAnchor="middle" className="svg-label">WHAT AN IDEAL CAMERA SEES</text><text x="160" y="273" textAnchor="middle" className="svg-note">Same emissivity everywhere in the shell</text>
  </svg></div>
  controls=<><Range label="Sight-line offset from the center" value={a} min={0} max={1} step={.01} unit=" R" onChange={setA}/><Range label="Shell thickness" value={b} min={.05} max={.5} step={.01} unit=" R" onChange={setB}/></>
  result=<><strong>{format(path/(2*b))}×</strong><span>the brightness through the center in this ideal model</span></>
  takeaway='The bright rim does not require all the gas to sit in a flat ring. Geometry alone can boost the emission along a longer sight line. The real Helix has multiple tilted structures and knots; this simple shell explains a projection effect, not its complete shape.'
  equation='L(b) = 2√(R² − b²) − 2√(r² − b²) for b < r; otherwise L = 2√(R² − b²). For uniform, optically thin emission: I ∝ L.'
  assumptions='Spherical shell, outer radius R = 1, inner radius r, uniform volume emissivity, no extinction and no optical-depth effects. Brightness is normalized to the central sight line. The projected model is synthetic and is not a fitted reconstruction of the photograph.'
 } else if(id==='sun') {
  title='A dark sunspot is still intensely luminous.'
  intro='Keep the spot at the same temperature and change its surroundings. Darkness in the photograph is a comparison with the hotter photosphere.'
  const ratio=planckContrast(a),gray=Math.round(255*ratio)
  source=sources.sunspots
  visual=<div className="experiment-visual-pair">{[false,true].map(dark=><svg key={String(dark)} viewBox="0 0 320 280" role="img" aria-label={`Model sunspot at ${a} kelvin ${dark?'against dark space':'beside the hotter photosphere'}`}><rect x="15" y="20" width="290" height="205" rx="4" fill={dark?'#020508':'#fff'} stroke="#3e5664"/><circle cx="160" cy="122" r="54" fill={`rgb(${gray},${gray},${gray})`}/><text x="160" y="250" textAnchor="middle" className="svg-label">{dark?'THE SAME RADIANCE AGAINST SPACE':'BESIDE A 5,800 K PHOTOSPHERE'}</text><text x="160" y="273" textAnchor="middle" className="svg-note">Same modeled spot · schematic grayscale</text></svg>)}</div>
  controls=<Range label="Model sunspot temperature" value={a} min={3500} max={5800} step={50} unit=" K" onChange={setA}/>
  result=<><strong>{format(ratio*100,1)}%</strong><span>of the 5,800 K reference radiance at 550 nm</span></>
  takeaway='Concentrated magnetic fields impede convective heat transport. The spot cools and emits less visible light than nearby plasma. It is not a hole: if separated from the dazzling disk, that same material would still shine. Your warm solar rendering is a display choice; the model here isolates brightness contrast.'
  equation='Bλ(T) = 2hc² / {λ⁵[exp(hc / λkT) − 1]}; compare Bλ(Tspot) / Bλ(5800 K) at λ = 550 nm.'
  assumptions='A monochromatic blackbody approximation at a chosen wavelength, not a fit to the filtered camera data or a sunspot temperature measurement. Real atmospheres have spectral lines, different formation heights and structured umbrae/penumbrae. Display tones are illustrative.'
 } else {
  title='A shadow can measure a mountain.'
  intro='Lower the Sun over a one-kilometer feature. The height stays the same, but the shadow changes dramatically—one reason terrain looks flatter near full Moon.'
  const length=shadowLengthKm(b,a),scale=23,x=90,y=125,height=b*scale,end=x+length*scale
  source={title:'NASA · Lunar shadow photogrammetry',url:'https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11Photogrammetry.html'}
  visual=<svg className="experiment-svg" viewBox="0 0 660 195" role="img" aria-label={`A ${format(b)} kilometer vertical feature casts a ${format(length)} kilometer shadow at ${a} degree solar elevation`}>
   <path d="M20 125H640" stroke="#718c9b" strokeWidth="2"/><rect x={x} y={y-height} width="5" height={height} fill="#d6dbce"/><path d={`M${x+5} 126H${Math.min(640,end)}`} stroke="#03070a" strokeWidth="14"/>
   <path d={`M${x} ${y-height}L${Math.min(640,end)} 125`} stroke="#d7bb7b" strokeDasharray="5 6"/>
   <path d={`M${x} ${y-height}l${-85*Math.cos(a*Math.PI/180)} ${-85*Math.sin(a*Math.PI/180)}`} stroke="#e2c88a" strokeWidth="3"/>
   <text x={Math.max(28,x-100*Math.cos(a*Math.PI/180))} y={Math.max(35,y-height-100*Math.sin(a*Math.PI/180))} fill="#f0d393" fontSize="25">☀</text>
   <text x="90" y="161" textAnchor="middle" className="svg-label">FIXED HEIGHT</text><text x={Math.min(510,(x+end)/2)} y="97" textAnchor="middle" className="svg-note">{format(length)} km shadow</text>
   <text x="330" y="187" textAnchor="middle" className="svg-note">Flat-ground model · schematic</text>
  </svg>
  controls=<><Range label="Sun elevation above the local horizon" value={a} min={5} max={80} unit="°" onChange={setA}/><Range label="Feature height" value={b} min={.2} max={2} step={.1} unit=" km" onChange={setB}/></>
  result=<><strong>{format(length)} km</strong><span>shadow length for the chosen geometry</span></>
  takeaway='At low solar elevation, a modest ridge casts a long shadow that exposes its relief. In your 96%-illuminated view, much of the disk is lit from high overhead, so maria, bright ejecta rays and surface reflectance stand out more than long shadows. Lunar phase is lighting geometry, not an ordinary passage through Earth’s shadow.'
  equation='L = h / tan ε, where h is height, L is horizontal shadow length and ε is the local solar elevation.'
  assumptions='Vertical feature on level ground and a distant point-like Sun. Sloping terrain, crater walls, camera projection and the Sun’s finite angular size complicate real measurements. This is not a height estimate from your lunar image.'
 }
 return <section className="visual-experiment"><p className="science-eyebrow">CHANGE ONE THING / SEE WHAT FOLLOWS</p><h4>{title}</h4><p className="experiment-intro">{intro}</p><div className="experiment-canvas">{visual}</div><div className="experiment-bottom"><div className="experiment-controls">{controls}</div><output className="experiment-result" aria-live="polite">{result}</output></div><aside className="experiment-takeaway"><small>BACK TO THE PHOTOGRAPH</small><p>{takeaway}</p></aside><details className="model-details"><summary>The physics · equation, assumptions & source</summary><code>{equation}</code><p>{assumptions}</p><a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a></details><p className="model-label">Illustrative physics · recorded pixels stay unchanged.</p></section>
}
