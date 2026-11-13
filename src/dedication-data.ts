export type Dedication = { v: 1; photo: string; view: string; to: string; message: string; from: string; style: 'midnight' | 'paper' }
export const dedicationLimits = { to: 40, message: 240, from: 40 }
const text = (value: unknown, max: number) => typeof value === 'string' && value.length <= max && !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)

function valid(value: unknown): value is Dedication {
  if (!value || typeof value !== 'object') return false
  const d = value as Dedication
  return d.v === 1 && typeof d.photo === 'string' && /^[a-z0-9-]{1,80}$/.test(d.photo)
    && typeof d.view === 'string' && /^[a-z0-9-]{1,80}$/.test(d.view)
    && text(d.to, dedicationLimits.to) && !!d.to.trim()
    && text(d.message, dedicationLimits.message) && text(d.from, dedicationLimits.from)
    && (d.style === 'midnight' || d.style === 'paper')
}

export function encodeDedication(value: Dedication): string {
  if (!valid(value)) throw new Error('Please add a recipient and keep the message within its limit.')
  const bytes = new TextEncoder().encode(JSON.stringify(value))
  return btoa(String.fromCharCode(...bytes)).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'')
}

export function decodeDedication(encoded: string): Dedication | null {
  try {
    if (!encoded || encoded.length > 5000 || !/^[A-Za-z0-9_-]+$/.test(encoded)) return null
    const bytes = Uint8Array.from(atob(encoded.replaceAll('-','+').replaceAll('_','/')), c => c.charCodeAt(0))
    const value: unknown = JSON.parse(new TextDecoder('utf-8', {fatal:true}).decode(bytes))
    return valid(value) ? value : null
  } catch { return null }
}
