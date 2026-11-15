import katex from 'katex'
import 'katex/dist/katex.min.css'

/** Only trusted, author-written TeX enters this component. MathML is included for assistive technology. */
export function MathText({tex,block=false}:{tex:string;block?:boolean}) {
  const html=katex.renderToString(tex,{displayMode:block,throwOnError:true,trust:false,output:'htmlAndMathml'})
  return block?<div className="blog-equation" dangerouslySetInnerHTML={{__html:html}}/>:<span className="blog-inline-math" dangerouslySetInnerHTML={{__html:html}}/>
}
