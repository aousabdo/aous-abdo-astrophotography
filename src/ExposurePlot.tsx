import { useId, useState } from 'react'
import { MathText } from './Math'
import { skyLimitedExposure } from './skyglow-model'

export function ExposurePlot() {
  const [magnitude,setMagnitude]=useState(20.5)
  const [hours,setHours]=useState(4)
  const id=useId().replaceAll(':','')
  const factor=skyLimitedExposure(22,magnitude), required=hours*factor
  const L=68,R=738,T=28,B=312
  const x=(m:number)=>L+(22-m)/3*(R-L)
  const y=(f:number)=>B-f/16*(B-T)
  const curve=Array.from({length:121},(_,i)=>{const m=22-i/40;return `${i?'L':'M'}${x(m).toFixed(2)},${y(skyLimitedExposure(22,m)).toFixed(2)}`}).join(' ')
  return <section className="blog-exposure" id="exposure" aria-labelledby="exposure-title">
    <header><p className="blog-eyebrow">THE PHOTOGRAPHIC COST / A SECOND EXPERIMENT</p><h2 id="exposure-title">The glow can disappear.<br/><em>Its noise stays.</em></h2><p>You can subtract a sky background. You cannot subtract the random arrival times of its photons. For very faint dust, a brighter sky can turn one night’s work into several.</p></header>
    <div className="blog-exposure-grid"><div className="blog-exposure-controls">
      <label className="blog-control">Your comparison sky <output>{magnitude.toFixed(2)} <small>mag/arcsec²</small></output><input type="range" aria-label="Comparison sky brightness" min="19" max="22" step=".05" value={magnitude} onChange={e=>setMagnitude(Number(e.target.value))}/><span className="exposure-range-labels"><span>19 · brighter</span><span>22 · darker</span></span></label>
      <label className="blog-control">Time at the reference sky <output>{hours} hours</output><input type="range" aria-label="Reference integration time" min="1" max="12" step=".5" value={hours} onChange={e=>setHours(Number(e.target.value))}/></label>
      <p className="exposure-reference">Reference background: <strong>22.00 mag/arcsec²</strong><br/>Same target, passband, telescope and detector.</p>
      <div className="exposure-readout" aria-live="polite" aria-atomic="true"><span>SAME SIGNAL-TO-NOISE RATIO</span><strong>{required.toFixed(1)}<small> hours</small></strong><p><b>{factor.toFixed(2)}×</b> the total integration<br/>for a background <b>{factor.toFixed(2)}×</b> as bright.</p></div>
      <button className="blog-reset" onClick={()=>{setMagnitude(20.5);setHours(4)}}>Reset the comparison ↺</button>
    </div><figure className="exposure-chart"><div className="exposure-chart-heading"><span>TOTAL INTEGRATION / HOURS</span><span>Same faint target · same S/N</span></div>
      <svg viewBox="0 0 800 380" role="img" aria-label={`Sky-limited total integration versus sky brightness. ${hours} hours at 22 magnitudes per square arcsecond becomes ${required.toFixed(1)} hours at ${magnitude.toFixed(2)}. Lower magnitudes mean a brighter sky.`}>
        <defs><linearGradient id={`exposure-fill-${id}`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#e7bb80" stopOpacity=".25"/><stop offset="1" stopColor="#e7bb80" stopOpacity=".015"/></linearGradient></defs>
        {[0,4,8,12,16].map(f=><g key={f}><line x1={L} x2={R} y1={y(f)} y2={y(f)} stroke="#ffffff19"/><text x={L-13} y={y(f)+5} textAnchor="end">{f*hours}</text></g>)}
        {[22,21.5,21,20.5,20,19.5,19].map(m=><g key={m}><line x1={x(m)} x2={x(m)} y1={T} y2={B} stroke="#ffffff0c"/><text x={x(m)} y={B+26} textAnchor="middle">{m.toFixed(1)}</text></g>)}
        <path d={`${curve}L${R},${B}L${L},${B}Z`} fill={`url(#exposure-fill-${id})`}/><path d={curve} fill="none" stroke="#edc68e" strokeWidth="3"/>
        <path d={`M${L},${y(factor)}H${x(magnitude)}V${B}`} fill="none" stroke="#b9d8d0" strokeDasharray="5 5"/>
        <circle cx={x(22)} cy={y(1)} r="5" fill="#ebc58e"/><circle cx={x(magnitude)} cy={y(factor)} r="11" fill="#b9d8d022"/><circle cx={x(magnitude)} cy={y(factor)} r="5.5" fill="#c7e4d9" stroke="#12232b" strokeWidth="2"/>
        <text x={L} y="365">DARKER SKY</text><text x={R} y="365" textAnchor="end">BRIGHTER SKY →</text>
      </svg><figcaption>Sky brightness in mag/arcsec². Moving right means a brighter background; the curve shows the total time needed to preserve the same faint-target signal-to-noise ratio.</figcaption>
      <div className="exposure-quick-facts"><div><strong>1 magnitude</strong><span>brighter → 2.51× time</span></div><div><strong>2 magnitudes</strong><span>brighter → 6.31× time</span></div><div><strong>3 magnitudes</strong><span>brighter → 15.85× time</span></div></div>
      <details className="blog-crossings"><summary>Read the values as a table</summary><table><thead><tr><th scope="col">Sky (mag/arcsec²)</th><th scope="col">Time factor</th><th scope="col">Total hours</th></tr></thead><tbody>{[22,21.5,21,20.5,20,19.5,19].map(m=><tr key={m}><th scope="row">{m.toFixed(1)}</th><td>{skyLimitedExposure(22,m).toFixed(2)}×</td><td>{(hours*skyLimitedExposure(22,m)).toFixed(1)}</td></tr>)}</tbody></table></details>
    </figure></div>
    <div className="exposure-insight"><span aria-hidden="true">↗</span><p><strong>Twice the background does not mean twice the noise.</strong> At fixed time, photon noise rises by <MathText tex={String.raw`\sqrt{2}`}/> and S/N falls to about 71%. Recovering that S/N takes twice the total integration.</p></div>
    <details className="blog-technical exposure-derivation"><summary>Why time follows sky brightness</summary><p>For an extremely faint source whose noise is dominated by sky photons, let <MathText tex="s"/> be the detected source rate and <MathText tex="b"/> the sky rate in the same measurement area. The usual CCD noise equation reduces to:</p>
      <MathText block tex={String.raw`\mathrm{S/N}\simeq\frac{s\,t}{\sqrt{b\,t}}=s\sqrt{\frac{t}{b}}`}/>
      <p>Holding source rate and S/N fixed makes total integration proportional to sky rate. Magnitudes then give:</p>
      <MathText block tex={String.raw`\frac{t_2}{t_1}\simeq\frac{b_2}{b_1}=10^{\,0.4(m_1-m_2)}`}/>
      <p>This is the sky-dominated limit of the standard signal-and-noise calculation. <a className="blog-text-link" href="#ref-snr">See the noise-equation reference ↗</a></p>
    </details>
    <p className="exposure-assumptions"><strong>When this comparison applies:</strong> a very faint, sky-noise-dominated target; unchanged detected source rate, passband, image scale and transparency; negligible read noise and dark current. It compares <em>total integration</em>, not individual subexposure length, and does not predict gradients, saturation or processing artifacts. A broadband sky-meter reading is not interchangeable with the background through a narrowband filter. The 22.00 reference is illustrative.</p>
    <a className="exposure-field-link" href="/stories/seahorse/">In the real Seahorse sessions, 2.4× the background made 95 minutes worth roughly 40 darker-sky minutes. Read the observing record ↗</a>
  </section>
}
