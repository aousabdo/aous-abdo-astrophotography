import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { photographs, type Photograph, type View } from './gallery'
import { decodeDedication, encodeDedication, dedicationLimits, type Dedication } from './dedication-data'
import { dedicationPng } from './dedication-card'
import { wallpaperSelection } from './wallpaper-selection'
import './dedications.css'

export const dedicationHref = (photo: string, view?: string) => `/dedicate/?photo=${encodeURIComponent(photo)}${view?`&view=${encodeURIComponent(view)}`:''}`
const suggestions = [
  { id:'heart', label:'For love', message:'Some things are too big for words. This little piece of the universe is for you.' },
  { id:'pleiades', label:'For friendship', message:'Life is brighter with you in my constellation.' },
  { id:'andromeda', label:'Across the distance', message:'Different places. The same sky. Thinking of you, wherever you are.' },
]
function initialState() {
  const encoded = new URLSearchParams(window.location.hash.slice(1)).get('gift')
  const gift = encoded ? decodeDedication(encoded) : null
  const validGift = gift && photographs.some(p=>p.id===gift.photo && p.views.some(v=>v.id===gift.view)) ? gift : null
  const params = new URLSearchParams(window.location.search)
  const photo = photographs.find(p=>p.id===(validGift?.photo || params.get('photo'))) || photographs.find(p=>p.id==='heart')!
  const view = photo.views.find(v=>v.id===(validGift?.view || params.get('view'))) || photo.views[0]
  return { value: validGift || {v:1,photo:photo.id,view:view.id,to:'',message:'',from:'',style:'midnight'} as Dedication, gift:Boolean(validGift), invalid:encoded!==null&&!validGift }
}
function GiftCard({value,photo,view,onImageError}:{value:Dedication;photo:Photograph;view:View;onImageError:()=>void}) {
  return <div className={`ded-card ded-card-${value.style}`} aria-label="Dedication card preview"><p className="ded-card-eyebrow">A LITTLE UNIVERSE, JUST FOR YOU</p><div className="ded-card-image"><img key={view.id} src={view.src} alt={photo.alt} onError={onImageError}/></div><div className="ded-card-words"><h2>For {value.to.trim() || 'someone special'}</h2>{value.message.trim() ? <p className="ded-card-message">{value.message}</p> : !value.to.trim() && <p className="ded-card-placeholder">A name. A few words. A piece of the universe.</p>}{value.from.trim()&&<p className="ded-card-from">From {value.from}</p>}</div><div className="ded-card-credit"><strong>{photo.title}</strong><span>Photograph by Aous Abdo · One More Photon</span></div></div>
}
export function DedicationLink({photo,view}:{photo:string;view?:string}) {
  return <a className="ded-photo-link" href={dedicationHref(photo,view)}><span>♡ Dedicate this photograph <b>↗</b></span><small>A name, a few words, and a sky to share.</small></a>
}
export function DedicationSpotlight() {
  const heart = photographs.find(p=>p.id==='heart')!
  return <section className="ded-spotlight" aria-labelledby="ded-spotlight-title"><div className="ded-spotlight-copy"><p className="ded-eyebrow">A PHOTOGRAPH FOR SOMEONE</p><h2 id="ded-spotlight-title">Send a little<br/><em>universe.</em></h2><p>For someone you love. For someone far away. Or simply because a photograph made you think of them.</p><a className="ded-primary" href="/dedicate/">Create a dedication <span aria-hidden="true">↗</span></a><small>A personal message · a card to keep · a link to share</small></div><a className="ded-spotlight-art" href={dedicationHref('heart')} aria-label="Dedicate the Heart Nebula"><img src={heart.views[0].src} alt={heart.alt} loading="lazy"/><div><span>FOR SOMEONE SPECIAL</span><p>A little piece of the sky.<br/>With you in mind.</p><small>The Heart Nebula · Aous Abdo</small></div></a></section>
}
export function DedicationsPage({brand='One More Photon'}:{brand?:string}) {
  const [initial] = useState(initialState)
  const [value,setValue] = useState<Dedication>(initial.value)
  const draft = useRef<Dedication | null>(initial.gift ? null : initial.value)
  const [gift,setGift] = useState(initial.gift)
  const [invalid,setInvalid] = useState(initial.invalid)
  const [query,setQuery] = useState('')
  const [status,setStatus] = useState('')
  const [error,setError] = useState('')
  const [busy,setBusy] = useState(false)
  const [copyFallback,setCopyFallback] = useState('')
  const form = useRef<HTMLFormElement>(null)
  const title = useRef<HTMLHeadingElement>(null)
  const photo = photographs.find(p=>p.id===value.photo)!
  const view = photo.views.find(v=>v.id===value.view) || photo.views[0]
  const filtered = useMemo(()=>photographs.filter(p=>`${p.title} ${p.catalog}`.toLowerCase().includes(query.trim().toLowerCase())),[query])
  const visible = filtered.some(p=>p.id===photo.id)?filtered:[photo,...filtered]
  useEffect(()=>{document.title=gift?`A photograph for you — ${brand}`:`Dedicate a photograph — ${brand}`},[gift,brand])
  useEffect(()=>{
    const restore = () => {const next=initialState();setValue(!next.gift&&!next.invalid&&draft.current?draft.current:next.value);setGift(next.gift);setInvalid(next.invalid);setStatus('');setError('');setCopyFallback('')}
    window.addEventListener('popstate',restore);window.addEventListener('hashchange',restore)
    return()=>{window.removeEventListener('popstate',restore);window.removeEventListener('hashchange',restore)}
  },[])
  const change = (next:Partial<Dedication>) => {setValue(v=>{const updated={...v,...next};draft.current=updated;return updated});setStatus('');setError('');setCopyFallback('')}
  const selectPhoto = (id:string) => {const p=photographs.find(p=>p.id===id)!;change({photo:id,view:p.views[0].id});window.history.replaceState({},'',dedicationHref(id,p.views[0].id))}
  const normalized = ():Dedication => {const clean=(s:string)=>s.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g,'').trim();return {...value,to:clean(value.to),message:clean(value.message),from:clean(value.from)}}
  const ready = () => {
    if (!gift && !form.current?.reportValidity()) return false
    try { encodeDedication(normalized()); return true }
    catch { setError('Please add a recipient and keep your message within the character limit.'); return false }
  }
  const link = () => `${window.location.origin}/dedicate/#gift=${encodeDedication(normalized())}`
  const preview = (event:FormEvent) => {event.preventDefault();if(!ready())return;setInvalid(false);setError('');setCopyFallback('');window.history.pushState({},'',link());setGift(true);window.scrollTo({top:0,behavior:'instant'});requestAnimationFrame(()=>title.current?.focus())}
  const edit = () => {draft.current=value;window.history.replaceState({},'',dedicationHref(photo.id,view.id));setGift(false);setStatus('');setCopyFallback('');window.scrollTo({top:0,behavior:'instant'});requestAnimationFrame(()=>title.current?.focus())}
  const share = async () => {
    if (!ready()) return
    setError('');setStatus('');setCopyFallback('')
    try {await navigator.clipboard.writeText(link());setStatus('Dedication link copied. Ready to send.')} catch {setCopyFallback(link());setStatus('Copy the link below to share your dedication.')}
  }
  const nativeShare = async () => {
    if (!ready()) return
    try {await navigator.share({title:'A little universe, just for you',text:'A photograph with you in mind.',url:link()})}
    catch(e) {if((e as Error).name!=='AbortError') {setCopyFallback(link());setError('Sharing could not open. You can copy the link below instead.')}}
  }
  const download = async () => {
    if (!ready()) return
    setBusy(true);setError('');setStatus('')
    try {
      const blob = await dedicationPng(normalized(),photo,view)
      const url = URL.createObjectURL(blob), anchor=document.createElement('a')
      anchor.href=url;anchor.download=`${photo.id}-dedication.png`;document.body.append(anchor);anchor.click();anchor.remove()
      window.setTimeout(()=>URL.revokeObjectURL(url),60000)
      setStatus('Your card is ready. Check your downloads.')
    } catch {setError('The card could not be prepared. Check your connection and try again, or share the dedication link.')}
    finally {setBusy(false)}
  }
  const actions = <><div className="ded-actions"><button type="button" className="ded-primary" onClick={share}>Copy dedication link ↗</button><button type="button" className="ded-secondary" onClick={download} disabled={busy}>{busy?'Preparing your card…':'Download card ↓'}</button>{typeof navigator.share==='function'&&<button type="button" className="ded-secondary" onClick={nativeShare}>Share…</button>}</div><div className="ded-feedback" aria-live="polite">{status&&<p>{status}</p>}{error&&<p role="alert">{error}</p>}</div>{copyFallback&&<label className="ded-copy-fallback">Your dedication link<input readOnly value={copyFallback} onFocus={e=>e.target.select()}/><small>Select the link and copy it using your browser.</small></label>}</>
  return <div className={`ded-page ${gift?'ded-recipient':''}`}><header className="ded-header"><a href="/" className="ded-brand">{brand}<span>ASTROPHOTOGRAPHY BY AOUS ABDO</span></a><nav aria-label="Dedication navigation"><a href="/#collection">Photographs</a><a href="/wallpapers/">Wallpapers</a></nav></header><main>
    {invalid&&<div className="ded-invalid" role="alert"><strong>This dedication link could not be opened.</strong><p>It may be incomplete or use an unavailable photograph. Ask the sender for the full link, or create a new dedication below.</p></div>}
    <section className="ded-intro"><p className="ded-eyebrow">{gift?'A PHOTOGRAPH WITH YOU IN MIND':'A PHOTOGRAPH FOR SOMEONE'}</p><h1 ref={title} tabIndex={-1}>{gift?<>A little universe.<br/><em>Just for you.</em></>:<>Send a little<br/><em>universe.</em></>}</h1><p>{gift?'Someone saw this part of the sky and thought of you.':'A name, a few words, and a photograph worth sharing. Make a personal card for someone who matters.'}</p>{!gift&&<div className="ded-steps" aria-label="Three steps"><span>01 Choose a sky</span><span>02 Make it personal</span><span>03 Send it their way</span></div>}</section>
    <div className="ded-workspace">{!gift&&<form className="ded-editor" ref={form} onSubmit={preview}><section><p className="ded-eyebrow">01 / CHOOSE A SKY</p><div className="ded-suggestions" aria-label="Photograph suggestions">{suggestions.map(s=><button key={s.id} type="button" aria-pressed={photo.id===s.id} onClick={()=>selectPhoto(s.id)}><img src={photographs.find(p=>p.id===s.id)!.views[0].thumb} alt=""/><span>{s.label}<small>{photographs.find(p=>p.id===s.id)!.title}</small></span></button>)}</div><label>Find a photograph<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Heart, Moon, M31…"/></label><label>Photograph<select value={photo.id} onChange={e=>selectPhoto(e.target.value)}>{visible.map(p=><option value={p.id} key={p.id}>{p.title} · {p.catalog}</option>)}</select></label>{!filtered.length&&<p className="ded-small" role="status">No matches. Your selected photograph is still available.</p>}{photo.views.length>1&&<label>Image edition<select value={view.id} onChange={e=>change({view:e.target.value})}>{photo.views.map(v=><option value={v.id} key={v.id}>{v.rig} · {v.label}</option>)}</select></label>}</section><section><p className="ded-eyebrow">02 / MAKE IT PERSONAL</p><label>For<input name="recipient" autoComplete="off" required maxLength={dedicationLimits.to} pattern=".*\S.*" placeholder="Someone special" value={value.to} onChange={e=>change({to:e.target.value})}/></label><label>Your message <span>optional</span><textarea name="message" maxLength={dedicationLimits.message} rows={4} placeholder="A few words, in your own voice…" value={value.message} onChange={e=>change({message:e.target.value})}/><small>{value.message.length} / {dedicationLimits.message}</small></label>{!value.message&&<button type="button" className="ded-starter" onClick={()=>change({message:(suggestions.find(s=>s.id===photo.id)||suggestions[0]).message})}>Need a starting point? Add a suggested message ↗</button>}<label>From <span>optional</span><input name="sender" autoComplete="off" maxLength={dedicationLimits.from} placeholder="Your name" value={value.from} onChange={e=>change({from:e.target.value})}/></label><fieldset className="ded-styles"><legend>Card style</legend><button type="button" aria-pressed={value.style==='midnight'} onClick={()=>change({style:'midnight'})}><i className="ded-swatch-midnight"/>Midnight</button><button type="button" aria-pressed={value.style==='paper'} onClick={()=>change({style:'paper'})}><i className="ded-swatch-paper"/>Warm paper</button></fieldset></section><section className="ded-send"><p className="ded-eyebrow">03 / SEND IT THEIR WAY</p><button type="submit" className="ded-preview-button">Preview their experience <span>↗</span></button>{actions}<p className="ded-small">Free for personal sharing. No account needed. Your words are included in the link; anyone you share it with can read and forward it. The site does not save your dedication to a database.</p></section></form>}
    <div className="ded-preview" id="ded-card"><p className="ded-preview-caption">{gift?'A GIFT OF LIGHT':'YOUR CARD / LIVE PREVIEW'}</p><GiftCard value={value} photo={photo} view={view} onImageError={()=>setError('The photograph could not load. Check your connection or choose another image.')}/>{!gift&&<p className="ded-preview-note">The whole photograph, with your words beneath it.<br/>Download a high-resolution PNG or share the personal link.</p>}</div></div>
    {gift&&<><section className="ded-gift-actions">{actions}<p className="ded-small">Keep the card, or share this moment with someone else.</p><button type="button" className="ded-text-button" onClick={edit}>Edit this dedication</button></section><section className="ded-beyond"><div><p className="ded-eyebrow">THE SKY BEHIND YOUR GIFT</p><h2>{photo.title}</h2><p>{photo.caption}</p><span>{photo.catalog}</span></div><div><a href={`/?photo=${photo.id}&view=${view.id}&media=science`}>Discover the object & its science ↗</a><a href={`/?photo=${photo.id}&view=${view.id}&media=detail`}>Explore the photograph at full resolution ↗</a>{wallpaperSelection[photo.id]&&<a href={`/wallpapers/?photo=${photo.id}&view=${view.id}`}>Make it your wallpaper ↓</a>}</div></section><a className="ded-make-another" href={dedicationHref(photo.id)}>Make a dedication for someone in your universe ↗</a></>}
    </main><footer className="ded-footer"><a href="/">← Return to {brand}</a><span>Real photographs. A personal connection.</span></footer></div>
}
