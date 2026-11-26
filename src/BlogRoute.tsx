import { lazy, Suspense } from 'react'
const Index=lazy(()=>import('./Blog').then(m=>({default:m.BlogIndex})))
const Article=lazy(()=>import('./Blog').then(m=>({default:m.DarkSkyArticle})))
const Lagoon=lazy(()=>import('./LagoonFieldNote').then(m=>({default:m.LagoonFieldNote})))
const M81=lazy(()=>import('./M81Post').then(m=>({default:m.M81Post})))
export function BlogRoute({article=false,m81=false,lagoon=false}:{article?:boolean;m81?:boolean;lagoon?:boolean}) {return <Suspense fallback={<div role="status" style={{minHeight:'60vh',padding:'120px 6%',color:'#eee9dd',background:'#0c151b'}}>Loading field notes…</div>}>{lagoon?<Lagoon/>:m81?<M81/>:article?<Article/>:<Index/>}</Suspense>}
