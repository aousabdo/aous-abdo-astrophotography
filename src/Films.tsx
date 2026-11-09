import { useState } from 'react'
import { photographs } from './gallery'

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

export function FilmPlayer({subject, compact=false}: {subject:string;compact?:boolean}) {
  const group=films.find(f=>f.subject===subject)!
  const [index,setIndex]=useState(0)
  const clip=group.clips[index]
  const poster=photographs.find(p=>p.id===subject)!.views[0].src
  return <div className={`film-player ${compact?'compact':''}`}>
    <div className="film-options" role="group" aria-label={`${subject==='sun'?'Sun':'Moon'} films`}>{group.clips.map((c,i)=><button key={c.id} className={i===index?'selected':''} aria-pressed={i===index} onClick={()=>setIndex(i)}>{i===0?(subject==='sun'?'Solar rotation':'Lunar tour'):'Raw → stacked'}<span>{c.duration}</span></button>)}</div>
    <video key={clip.id} controls playsInline preload="none" poster={poster} aria-label={clip.title} aria-describedby={`caption-${compact?'viewer-':''}${subject}`}><source src={clip.src} type="video/mp4"/>Your browser cannot play this video. <a href={clip.src}>Open the film</a>.</video>
    <p className="film-description" id={`caption-${compact?'viewer-':''}${subject}`}>{clip.description}</p>
    <div className="film-footer"><span>1080p · silent film</span><a href={clip.src} download>Download film ↓</a></div>
  </div>
}

export function Films() {
 return <section className="films-section" id="films"><header className="section-intro"><div><p className="section-number">WATCH / FOUR SHORT VIDEOS</p><h2>Sun & Moon<br/><em>videos.</em></h2></div><p>The Sun turns. The Moon reveals its terrain. Watch solar rotation, explore the lunar surface, and see the raw captures become finished images.</p></header><div className="films-grid">{films.map(group=><article key={group.subject}><header className="film-heading"><h3>{group.subject==='sun'?'Sun videos':'Moon videos'}</h3><span>{group.subject==='sun'?'01 / SUN':'02 / MOON'}</span></header><FilmPlayer subject={group.subject}/></article>)}</div></section>
}
