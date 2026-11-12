import { useEffect, useRef, useState } from 'react'
import soundtrackCatalog from './film-soundtracks.json'
import './film-soundtracks.css'
import { photographs } from './gallery'
import { sources } from './science'
import { SourceLinks } from './SciencePanel'

export const films = [
  {subject:'sun', title:'The Sun, turning', clips:[
    {id:'sun-rotation',title:'One day of solar rotation',duration:'0:15',src:'/films/sun-rotation.mp4',description:'July 31 → August 1, 2026. Two real observations, with modeled motion interpolated between them.'},
    {id:'sun-raw-vs-stacked',title:'Sun · raw capture to finished stack',duration:'0:48',src:'/films/sun-raw-vs-stacked.mp4',description:'A side-by-side look at the original solar capture and the stacked image, followed by details of the sunspots.'},
  ]},
  {subject:'moon', title:'Across the lunar surface', clips:[
    {id:'moon-tour',title:'A tour of the Moon',duration:'1:20',src:'/films/moon-tour.mp4',description:'A guided journey across the finished lunar photograph, from Tycho and Copernicus to the Sea of Tranquility. Animated from a still image.'},
    {id:'moon-raw-vs-stacked',title:'Moon · raw capture to finished stack',duration:'0:53',src:'/films/moon-raw-vs-stacked.mp4',description:'See the moving raw lunar capture beside the stacked result, revealing how many frames become one clear view.'},
  ]},
]

const videoNotes:Record<string,{type:string;time:string;physics:string;process:string;limit:string}> = {
 'sun-rotation':{type:'Two observed endpoints + modeled animation',time:'July 31 → August 1, 2026, 11:31 UT at each endpoint: 24 hours represented in 15 seconds.',physics:'The solar equator rotates faster than higher latitudes. Sunspots trace magnetic regions and also evolve.',process:'Differential-rotation modeling and a blend connect the two real observations.',limit:'Intermediate frames are modeled. This is not a continuous observed timelapse, and the display color is a white-light rendering.'},
 'sun-raw-vs-stacked':{type:'Observed raw footage + processed comparison',time:'Solar capture from July 31, 2026. Playback length is the edit length, not a measurement of solar motion.',physics:'Earth’s atmosphere distorts fine solar detail from frame to frame. Sunspots are cooler magnetic regions in the photosphere.',process:'Raw capture is compared with a registered, stacked and sharpened result, followed by closer views.',limit:'Stacking reduces random noise; frame selection and sharpening affect detail. The finished view is processed rather than a single raw frame.'},
 'moon-tour':{type:'Guided animation of a finished still',time:'Lunar data from August 29/30, 2026. The 1 minute 20 second tour is an editing sequence, not elapsed lunar time.',physics:'Impact craters, rays and basaltic mare plains record different chapters of lunar geology.',process:'A pan-and-zoom journey through Tycho, Copernicus, Aristarchus, Plato / Vallis Alpes, the Sea of Tranquility and Mare Crisium.',limit:'This is not a spacecraft flyover. Upsampled closeups add no new resolved detail. The Apollo 11 area label locates a region; the landing hardware is not resolved.'},
 'moon-raw-vs-stacked':{type:'Observed raw footage + processed comparison',time:'Lunar capture from August 29/30, 2026. Playback is a comparison edit rather than a real-time record of changing terrain.',physics:'Atmospheric seeing makes the raw lunar image shimmer. Aligning many exposures helps separate persistent surface structure from random noise.',process:'Real raw footage appears beside the finished stack, followed by closeups. The associated tour image used 656 selected frames.',limit:'Stacking cannot restore information never recorded. Sharpening can exaggerate edges, and enlarging pixels does not create new surface detail.'},
}

export function FilmPlayer({subject, compact=false}: {subject:string;compact?:boolean}) {
  const group=films.find(f=>f.subject===subject)!
  const [index,setIndex]=useState(0),[score,setScore]=useState(subject==='sun'?'celestial':'five')
  const [soundOn,setSoundOn]=useState(false),[silent,setSilent]=useState(false),[failed,setFailed]=useState(false),[playHint,setPlayHint]=useState('')
  const video=useRef<HTMLVideoElement>(null),volume=useRef(.8)
  const clip=group.clips[index],notes=videoNotes[clip.id]
  const soundtrack=soundtrackCatalog.films.find(f=>f.film===clip.id&&f.score===score)!
  const src=silent?clip.src:soundtrack.url
  const poster=photographs.find(p=>p.id===subject)!.views[0].src
  useEffect(()=>{const el=video.current;if(!el)return;el.volume=volume.current;return()=>el.pause()},[clip.id,score,silent])
  const chooseClip=(next:number)=>{video.current?.pause();setIndex(next);setFailed(false);setSilent(false);setPlayHint('')}
  const chooseScore=(next:string)=>{video.current?.pause();setScore(next);setSilent(false);setFailed(false);setPlayHint('')}
  const toggleSound=()=>{
    const el=video.current;if(!el||silent)return
    const enabled=!soundOn;el.muted=!enabled;setSoundOn(enabled);setPlayHint('')
    if(enabled){if(el.volume===0)el.volume=.8;if(el.paused)el.play().catch(e=>{if(e.name!=='AbortError')setPlayHint('Press play on the video to hear the selected music.')})}
  }
  return <div className={`film-player ${compact?'compact':''}`}>
    <div className="film-options" role="group" aria-label={`${subject==='sun'?'Sun':'Moon'} films`}>{group.clips.map((c,i)=><button key={c.id} className={i===index?'selected':''} aria-pressed={i===index} onClick={()=>chooseClip(i)}>{i===0?(subject==='sun'?'Solar rotation':'Lunar tour'):'Raw → stacked'}<span>{c.duration}</span></button>)}</div>
    <video ref={video} key={`${clip.id}-${score}-${silent}`} src={src} muted={!soundOn} controls playsInline preload="none" poster={poster} aria-label={clip.title} aria-describedby={`caption-${compact?'viewer-':''}${subject}`} onPlay={event=>{document.querySelectorAll('video').forEach(other=>{if(other!==event.currentTarget)other.pause()})}} onVolumeChange={event=>{const el=event.currentTarget;volume.current=el.volume;if(!silent)setSoundOn(!el.muted&&el.volume>0)}} onError={()=>setFailed(true)}>Your browser cannot play this video. <a href={clip.src}>Open the silent film</a>.</video>
    <div className="film-music-panel"><div className="film-music-heading"><div><p>LISTEN WHILE YOU WATCH</p><strong>Music for the sky</strong></div><button className="film-sound-toggle" onClick={toggleSound} disabled={silent} aria-pressed={soundOn} aria-label={soundOn?'Turn soundtrack sound off':'Turn soundtrack sound on'}><span aria-hidden="true">{soundOn?'♫':'♪'}</span>{silent?'Silent original':soundOn?'Sound on':'Sound off'}</button></div><div className="film-score-options" role="group" aria-label="Soundtrack options">{[{id:'one',title:'Cylinder One',letter:'A'},{id:'five',title:'Cylinder Five',letter:'B'},{id:'celestial',title:'Cinematic · Celestial',letter:'C'}].map(option=><button key={option.id} aria-pressed={!silent&&score===option.id} onClick={()=>chooseScore(option.id)}><small>{option.letter}</small>{option.title}<span>{!silent&&score===option.id?'✓':'↗'}</span></button>)}</div><p className="film-music-hint">Choose a soundtrack, then play. Sound is optional.</p>{playHint&&<p role="status" className="film-music-status">{playHint}</p>}</div>
    {failed&&<div className="film-music-error" role="status"><span>This version could not load.</span><button onClick={()=>{video.current?.pause();setSilent(true);setSoundOn(false);setFailed(false)}}>Play the silent original</button></div>}
    <p className="film-description" id={`caption-${compact?'viewer-':''}${subject}`}>{clip.description}</p>
    <p className="science-eyebrow">{notes.type}</p><div className="film-footer"><span>1080p · optional ambient music</span><div>{!silent&&<a href={soundtrack.url} download>Download with music ↓</a>}<a href={clip.src} download>Silent original ↓</a></div></div>
    <details className="film-music-credits"><summary>Music & credits · {soundtrack.artist}</summary><p>“{soundtrack.track}” by <a href={soundtrack.source} target="_blank" rel="noreferrer">{soundtrack.artist}</a>{score==='celestial'?' — released under CC BY 4.0.':', from Cylinders (2014). Music © 2014 Chris Zabriskie.'} <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">Creative Commons Attribution 4.0</a>.</p><p>Excerpted, level-adjusted and faded to fit the film. Photography and video © Aous Abdo.</p><a href={soundtrackCatalog.credits}>Full music credits ↗</a></details>
    <details className="film-notes"><summary>About this video · time, physics & how it was made</summary><dl>{[['Time represented',notes.time],['What you are seeing',notes.physics],['How it was made',notes.process],['Reading the result',notes.limit]].map(([label,text])=><div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}</dl><SourceLinks items={subject==='sun'?[sources.sunspots,sources.rotation]:[sources.craters,sources.phases]}/><p>Capture and edit notes: Aous Abdo’s records.</p></details>
    <a className="film-science-link" href={`?photo=${subject}&media=science`}>Explore the {subject==='sun'?'Sun’s':'Moon’s'} science · story & physics lab ↗</a>
  </div>
}

export function Films() {
 return <section className="films-section" id="films"><header className="section-intro"><div><p className="section-number">WATCH / FOUR SHORT VIDEOS</p><h2>Sun & Moon<br/><em>videos.</em></h2></div><p>The Sun turns. The Moon reveals its terrain. Watch solar rotation, explore the lunar surface, and see the raw captures become finished images.</p></header><div className="films-grid">{films.map(group=><article key={group.subject}><header className="film-heading"><h3>{group.subject==='sun'?'Sun videos':'Moon videos'}</h3><span>{group.subject==='sun'?'01 / SUN':'02 / MOON'}</span></header><FilmPlayer subject={group.subject}/></article>)}</div></section>
}
