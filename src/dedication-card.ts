import type { Dedication } from './dedication-data'
import type { Photograph, View } from './gallery'

// Measure the same text that is drawn; break long words without dropping characters.
function lines(ctx: CanvasRenderingContext2D, text: string, width: number): string[] {
  const output: string[] = []
  for (const paragraph of text.split('\n')) {
    let line = ''
    for (const word of paragraph.split(/\s+/)) {
      if (!word) continue
      const joined = line ? `${line} ${word}` : word
      if (ctx.measureText(joined).width <= width) { line = joined; continue }
      if (line) { output.push(line); line = '' }
      for (const letter of Array.from(word)) {
        if (line && ctx.measureText(line + letter).width > width) { output.push(line); line = '' }
        line += letter
      }
    }
    output.push(line)
  }
  return output
}

export async function dedicationPng(value: Dedication, photo: Photograph, view: View): Promise<Blob> {
  const image = new Image()
  image.src = view.src
  await image.decode()
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Your browser could not prepare an image. You can still share the dedication link.')
  canvas.width = 1800
  const imageScale = Math.min(1620 / image.naturalWidth, 1180 / image.naturalHeight)
  const imageWidth = Math.round(image.naturalWidth * imageScale), imageHeight = Math.round(image.naturalHeight * imageScale)
  const title = `For ${value.to.trim()}`
  ctx.font = '72px Georgia, serif'
  const titleLines = lines(ctx, title, 1460)
  ctx.font = '38px Arial, sans-serif'
  const messageLines = value.message.trim() ? lines(ctx, value.message.trim(), 1390) : []
  ctx.font = '30px Arial, sans-serif'
  const fromLines = value.from.trim() ? lines(ctx, `From ${value.from.trim()}`, 1390) : []
  const textStart = 160 + imageHeight + 95
  canvas.height = textStart + titleLines.length * 88 + (messageLines.length ? 38 + messageLines.length * 58 : 0) + (fromLines.length ? 58 + fromLines.length * 44 : 0) + 220
  const paper = value.style === 'paper'
  const background = paper ? '#f0eee5' : '#10191c', ink = paper ? '#263e43' : '#f0eee5', muted = paper ? '#6c7775' : '#a5b8b9', lineColor = paper ? '#c8cbbd' : '#385052'
  ctx.fillStyle = background; ctx.fillRect(0,0,canvas.width,canvas.height)
  ctx.strokeStyle = lineColor; ctx.lineWidth = 2; ctx.strokeRect(36,36,canvas.width-72,canvas.height-72)
  ctx.textAlign = 'center'; ctx.textBaseline = 'top'
  ctx.fillStyle = muted; ctx.font = '22px Arial, sans-serif'; ctx.fillText('A LITTLE UNIVERSE, JUST FOR YOU',900,88)
  ctx.drawImage(image,(1800-imageWidth)/2,160,imageWidth,imageHeight)
  let y = textStart
  ctx.fillStyle = ink; ctx.font = '72px Georgia, serif'
  for (const row of titleLines) { ctx.fillText(row,900,y); y += 88 }
  if (messageLines.length) {
    y += 38; ctx.font = '38px Arial, sans-serif'
    for (const row of messageLines) { ctx.fillText(row,900,y); y += 58 }
  }
  if (fromLines.length) {
    y += 58; ctx.font = '30px Arial, sans-serif'; ctx.fillStyle = muted
    for (const row of fromLines) { ctx.fillText(row,900,y); y += 44 }
  }
  ctx.strokeStyle = lineColor; ctx.beginPath(); ctx.moveTo(750,canvas.height-150);ctx.lineTo(1050,canvas.height-150);ctx.stroke()
  ctx.font = '24px Georgia, serif'; ctx.fillStyle = muted; ctx.fillText(photo.title,900,canvas.height-124)
  ctx.font = '19px Arial, sans-serif'; ctx.fillText('Photograph by Aous Abdo · onemorephoton.com',900,canvas.height-82)
  return new Promise((resolve,reject) => canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('The card could not be downloaded. Please try again.')),'image/png'))
}
