import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = new URL('..', import.meta.url).pathname
const outputRoot = path.join(root, 'dist/client')
const template = await readFile(path.join(outputRoot, 'index.html'), 'utf8')
const photographs = JSON.parse(await readFile(path.join(root, 'src/photos.json'), 'utf8'))

const siteUrl = 'https://onemorephoton.com'

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')

function pageHtml({ title, description, pathname, image = `${siteUrl}/og.png`, type = 'website' }) {
  const canonical = `${siteUrl}${pathname}`
  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta property="og:type" content="[^"]*"\s*\/?>/, `<meta property="og:type" content="${type}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${image}" />`)

  html = html.replace('</head>', `    <meta name="twitter:title" content="${escapeHtml(title)}" />\n    <meta name="twitter:description" content="${escapeHtml(description)}" />\n    <meta name="twitter:image" content="${image}" />\n  </head>`)
  return html
}

async function emit(route, metadata) {
  const directory = path.join(outputRoot, route.replace(/^\//, ''))
  await mkdir(directory, { recursive: true })
  await writeFile(path.join(directory, 'index.html'), pageHtml(metadata))
}

await emit('gallery', {
  title: 'Gallery — One More Photon',
  description: 'The complete deep-sky astrophotography archive by Aous Abdo: nebulae, galaxies, and star fields.',
  pathname: '/gallery/',
})

await emit('about', {
  title: 'About Aous Abdo — One More Photon',
  description: 'From a borrowed monocular in Amman to Los Alamos, Michigan State, NASA, and a lifelong return to the night sky.',
  pathname: '/about/',
  image: `${siteUrl}/astro/stellar-dust.jpg`,
})

await emit('work', {
  title: 'The Wider Orbit — One More Photon',
  description: 'Astronomy, revelation, scientific visualization, and signal work by Aous Abdo.',
  pathname: '/work/',
})

for (const photo of photographs) {
  await emit(`photographs/${photo.slug}`, {
    title: `${photo.title} — One More Photon`,
    description: photo.note,
    pathname: `/photographs/${photo.slug}/`,
    image: `${siteUrl}/${photo.src}`,
    type: 'article',
  })
}

await writeFile(path.join(outputRoot, '404.html'), pageHtml({
  title: 'No Signal — One More Photon',
  description: 'This light never arrived.',
  pathname: '/404.html',
}))

console.log(`Generated ${photographs.length + 4} static routes.`)
