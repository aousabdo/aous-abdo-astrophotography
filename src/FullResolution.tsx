import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type OpenSeadragon from 'openseadragon'
import catalogData from './deepzoom-catalog.json'
import './full-resolution.css'

type ImageInfo = {width:number;height:number;tileSize:number;overlap:number;maxLevel:number}
const catalog = catalogData as {edition:string;tileBase:string;views:Record<string,ImageInfo>}
export const hasFullResolution = (id:string) => Boolean(catalog.views[id])

export function FullResolutionViewer({viewId,title,preview,focused,onFocus,onExit}:{viewId:string;title:string;preview:string;focused:boolean;onFocus:()=>void;onExit:()=>void}) {
 const surface=useRef<HTMLDivElement>(null), viewer=useRef<OpenSeadragon.Viewer|null>(null), factory=useRef<typeof OpenSeadragon|null>(null)
 const [loaded,setLoaded]=useState(false),[error,setError]=useState(false),[percent,setPercent]=useState(0),[attempt,setAttempt]=useState(0)
 const info=catalog.views[viewId]
 useEffect(()=>{
  let alive=true, instance:OpenSeadragon.Viewer|undefined
  setLoaded(false);setError(false);setPercent(0)
  if(!info||!surface.current)return
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
  import('openseadragon').then(({default:OSD})=>{
   if(!alive||!surface.current)return
   factory.current=OSD
   const source=new OSD.TileSource({width:info.width,height:info.height,tileSize:info.tileSize,tileOverlap:info.overlap,minLevel:0,maxLevel:info.maxLevel})
   const base=import.meta.env.DEV?`/tiles/${catalog.edition}`:catalog.tileBase
   source.getTileUrl=(level:number,x:number,y:number)=>`${base}/${viewId}/${level}/${x}_${y}.jpg`
   instance=OSD({element:surface.current,tileSources:[source],drawer:'canvas',showNavigationControl:false,showNavigator:true,navigatorPosition:'BOTTOM_RIGHT',navigatorWidth:128,navigatorHeight:90,navigatorAutoFade:false,navigatorBorderColor:'#516775',navigatorDisplayRegionColor:'#c7dfe6',navigatorBackground:'#05090c',crossOriginPolicy:'Anonymous',ajaxWithCredentials:false,imageLoaderLimit:6,maxImageCacheCount:80,timeout:20000,animationTime:reduced?0:.45,blendTime:reduced?0:.12,minZoomImageRatio:.1,maxZoomPixelRatio:1,visibilityRatio:1,constrainDuringPan:true,keyboardNavEnabled:false,gestureSettingsMouse:{clickToZoom:true,dblClickToZoom:false,scrollToZoom:true},gestureSettingsTouch:{pinchToZoom:true,dragToPan:true,clickToZoom:false,dblClickToZoom:true,flickEnabled:true}})
   viewer.current=instance
   instance.canvas.setAttribute('aria-label',`${title}, full-resolution image. Drag or use arrow keys to move. Plus and minus zoom; zero fits the image; one shows source pixels.`)
   instance.canvas.setAttribute('role','region')
   const update=()=>{if(alive&&instance?.world.getItemCount())setPercent(Math.round(instance.viewport.viewportToImageZoom(instance.viewport.getZoom(true))*100))}
   instance.addHandler('open',()=>{if(!alive)return;update();instance?.canvas.focus({preventScroll:true})})
   instance.addHandler('tile-drawn',()=>{if(alive)setLoaded(true)})
   instance.addHandler('animation',update);instance.addHandler('resize',update)
   instance.addHandler('tile-load-failed',()=>{if(alive)setError(true)})
   instance.addHandler('open-failed',()=>{if(alive)setError(true)})
  }).catch(()=>{if(alive)setError(true)})
  return()=>{alive=false;instance?.destroy();viewer.current=null;factory.current=null}
 },[viewId,attempt])
 const zoomBy=(factor:number)=>{viewer.current?.viewport.zoomBy(factor);viewer.current?.viewport.applyConstraints()}
 const fit=()=>{viewer.current?.viewport.goHome();viewer.current?.viewport.applyConstraints()}
 const native=()=>{const vp=viewer.current?.viewport;if(vp){vp.zoomTo(vp.imageToViewportZoom(1));vp.applyConstraints()}}
 const key=(event:KeyboardEvent)=>{
  if(event.altKey||event.metaKey||event.ctrlKey)return
  const vp=viewer.current?.viewport,OSD=factory.current
  if(!vp||!OSD)return
  if(['+','=','-','0','1','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){
   event.preventDefault();event.stopPropagation()
   if(event.key==='+'||event.key==='=')zoomBy(1.6)
   else if(event.key==='-')zoomBy(1/1.6)
   else if(event.key==='0')fit()
   else if(event.key==='1')native()
   else {const step=.12/vp.getZoom();vp.panBy(new OSD.Point(event.key==='ArrowLeft'?-step:event.key==='ArrowRight'?step:0,event.key==='ArrowUp'?-step:event.key==='ArrowDown'?step:0));vp.applyConstraints()}
  }
 }
 return <section className="fullres-viewer" aria-label={`Explore ${title} at full resolution`} onKeyDownCapture={key} data-source-width={info?.width}>
  <header className="fullres-heading"><div><span className="fullres-live-dot"/><strong>Full resolution</strong><span>{info?.width.toLocaleString()} × {info?.height.toLocaleString()} px</span></div><button onClick={onExit}>Return to photograph ↙</button></header>
  <div className="fullres-body">{!loaded&&<img className="fullres-placeholder" src={preview} alt=""/>}<div className="fullres-surface" ref={surface}/>{!loaded&&!error&&<p className="fullres-loading" role="status">Bringing the detail into view…</p>}{error&&<div className="fullres-error" role="status"><span>Some detail could not load.</span><button onClick={()=>setAttempt(n=>n+1)}>Retry</button><button onClick={onExit}>Use the photograph</button></div>}</div>
  <div className="fullres-toolbar" role="group" aria-label="Image exploration controls"><div><button onClick={()=>zoomBy(1/1.6)} aria-label="Zoom out" title="Zoom out (−)">−</button><output aria-label="Image magnification">{percent?`${percent}%`:'—'}</output><button onClick={()=>zoomBy(1.6)} aria-label="Zoom in" title="Zoom in (+)">+</button><button onClick={fit} title="Fit the complete image (0)">Fit</button><button onClick={native} title="View the recorded pixels (1)">100%</button></div><button className="fullres-focus" onClick={onFocus} aria-pressed={focused}>{focused?'Show image notes ↙':'Focus view ↗'}</button></div>
  <p className="fullres-help"><span>Drag to explore · scroll or pinch to zoom</span><span>100% shows the recorded pixels · Esc to return</span></p>
 </section>
}
