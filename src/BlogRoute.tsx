import { lazy, Suspense } from 'react'
const Index=lazy(()=>import('./Blog').then(m=>({default:m.BlogIndex})))
const Article=lazy(()=>import('./Blog').then(m=>({default:m.DarkSkyArticle})))
export function BlogRoute({article=false}:{article?:boolean}) {return <Suspense fallback={<div role="status" style={{minHeight:'60vh',padding:'120px 6%',color:'#eee9dd',background:'#0c151b'}}>Loading field notes…</div>}>{article?<Article/>:<Index/>}</Suspense>}
