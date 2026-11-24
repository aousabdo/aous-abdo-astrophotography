export function BlogHeader({article=false,author='Dr. Aous Abdo'}:{article?:boolean;author?:string}) {
  return <header className="blog-header"><a href="/" className="blog-brand"><span className="blog-orbit"/>One More Photon<small>ASTROPHOTOGRAPHY / {author}</small></a><nav aria-label="Blog navigation"><a href="/#collection">Photographs</a><a href="/#films">Sun & Moon films</a><a href="/blog/" aria-current={article?undefined:'page'}>Blog</a></nav></header>
}
export function BlogFooter({author='Dr. Aous Abdo'}:{author?:string}) {
  return <footer className="blog-footer"><a href="/">Back to the photographs</a><p>{author} · One More Photon<br/><span>Notes from under the sky.</span></p><a href="/blog/feed.xml">RSS feed</a></footer>
}
