const STRIPE_ENDPOINT = 'https://api.stripe.com/v1'
const SIGNATURE_TOLERANCE_SECONDS = 300

export default {
  async fetch(request, env) {
    return handleRequest(request, env)
  },
}

export async function handleRequest(request, env) {
  const url = new URL(request.url)

  if (request.method === 'OPTIONS') {
    return handlePreflight(request, env)
  }

  try {
    if (request.method === 'GET' && url.pathname === '/health') {
      return json({
        ok: true,
        service: 'one-more-photon-store',
        bindings: {
          downloads: Boolean(env.DOWNLOADS_BUCKET),
          orders: Boolean(env.ORDERS_DB),
        },
      })
    }

    if (request.method === 'GET' && url.pathname === '/v1/products') {
      return listProducts(request, env)
    }

    if (request.method === 'POST' && url.pathname === '/v1/checkout') {
      return createCheckout(request, env)
    }

    if (request.method === 'POST' && url.pathname === '/v1/webhooks/stripe') {
      return handleStripeWebhook(request, env)
    }

    if (request.method === 'GET' && url.pathname === '/v1/order') {
      return getOrder(request, env)
    }

    if (request.method === 'GET' && url.pathname.startsWith('/v1/download/')) {
      return downloadPurchase(request, env, url.pathname.slice('/v1/download/'.length))
    }

    return json({ error: 'Not found' }, 404, corsHeaders(request, env))
  } catch (error) {
    console.error('Unhandled store error', error)
    return json({ error: 'The store is temporarily unavailable.' }, 500, corsHeaders(request, env))
  }
}

async function listProducts(request, env) {
  const result = await env.ORDERS_DB.prepare(
    'SELECT slug, title FROM products WHERE active = 1 ORDER BY title',
  ).all()

  return json({ products: result.results }, 200, corsHeaders(request, env))
}

async function createCheckout(request, env) {
  if (!isAllowedOrigin(request, env)) {
    return json({ error: 'Origin not allowed' }, 403)
  }

  if (!env.STRIPE_SECRET_KEY) {
    return json({ error: 'Checkout is not configured.' }, 503, corsHeaders(request, env))
  }

  const contentType = request.headers.get('content-type') || ''
  if (!contentType.toLowerCase().includes('application/json')) {
    return json({ error: 'Expected application/json' }, 415, corsHeaders(request, env))
  }

  const body = await request.json().catch(() => null)
  const slug = typeof body?.slug === 'string' ? body.slug.trim() : ''
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return json({ error: 'Invalid photograph' }, 400, corsHeaders(request, env))
  }

  const product = await env.ORDERS_DB.prepare(
    `SELECT slug, stripe_price_id, license_version
     FROM products
     WHERE slug = ? AND active = 1`,
  ).bind(slug).first()

  if (!product) {
    return json({ error: 'This photograph is not currently available.' }, 404, corsHeaders(request, env))
  }

  const successUrl = new URL(env.SITE_ORIGIN)
  successUrl.searchParams.set('purchase', 'success')
  successUrl.searchParams.set('session_id', '{CHECKOUT_SESSION_ID}')

  const cancelUrl = new URL(env.SITE_ORIGIN)
  cancelUrl.searchParams.set('photo', product.slug)
  cancelUrl.searchParams.set('purchase', 'cancelled')

  const form = new URLSearchParams()
  form.set('line_items[0][price]', product.stripe_price_id)
  form.set('line_items[0][quantity]', '1')
  form.set('managed_payments[enabled]', 'true')
  form.set('mode', 'payment')
  form.set('success_url', successUrl.toString())
  form.set('cancel_url', cancelUrl.toString())
  form.set('client_reference_id', product.slug)
  form.set('metadata[product_slug]', product.slug)
  form.set('metadata[license_version]', product.license_version)

  const stripeResponse = await fetch(`${STRIPE_ENDPOINT}/checkout/sessions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Stripe-Version': env.STRIPE_API_VERSION || '2025-03-31.basil',
    },
    body: form,
  })

  const session = await stripeResponse.json()
  if (!stripeResponse.ok || typeof session.url !== 'string') {
    console.error('Stripe Checkout Session creation failed', stripeResponse.status, session?.error?.type)
    return json({ error: 'Checkout could not be started.' }, 502, corsHeaders(request, env))
  }

  return json({ checkout_url: session.url }, 200, corsHeaders(request, env))
}

async function handleStripeWebhook(request, env) {
  if (!env.STRIPE_WEBHOOK_SECRET || !env.DOWNLOAD_TOKEN_SECRET) {
    return json({ error: 'Webhook is not configured.' }, 503)
  }

  const rawBody = await request.text()
  const signature = request.headers.get('stripe-signature') || ''
  const valid = await verifyStripeSignature(rawBody, signature, env.STRIPE_WEBHOOK_SECRET)
  if (!valid) {
    return json({ error: 'Invalid signature' }, 400)
  }

  const event = JSON.parse(rawBody)
  if (!event?.id || !event?.type || !event?.data?.object) {
    return json({ error: 'Invalid event' }, 400)
  }

  if (event.type === 'checkout.session.async_payment_failed') {
    await recordFailedPayment(event, env)
    return json({ received: true })
  }

  if (!['checkout.session.completed', 'checkout.session.async_payment_succeeded'].includes(event.type)) {
    return json({ received: true })
  }

  const session = event.data.object
  if (event.type === 'checkout.session.completed' && session.payment_status !== 'paid') {
    return json({ received: true, awaiting_payment: true })
  }

  const productSlug = session.metadata?.product_slug
  if (!productSlug || typeof session.id !== 'string') {
    return json({ error: 'Missing fulfillment metadata' }, 400)
  }

  const product = await env.ORDERS_DB.prepare(
    `SELECT slug, license_version
     FROM products
     WHERE slug = ?`,
  ).bind(productSlug).first()

  if (!product) {
    console.error('Webhook referenced an unknown product', productSlug)
    return json({ error: 'Unknown product' }, 400)
  }

  const now = Math.floor(Date.now() / 1000)
  const ttl = positiveInteger(env.DOWNLOAD_TTL_SECONDS, 86400)
  const maxDownloads = positiveInteger(env.DOWNLOAD_MAX_COUNT, 3)
  const orderId = `ord_${(await sha256Hex(session.id)).slice(0, 32)}`
  const downloadToken = await deriveDownloadToken(session.id, env.DOWNLOAD_TOKEN_SECRET)
  const tokenHash = await sha256Hex(downloadToken)
  const email = session.customer_details?.email || session.customer_email || null

  try {
    await env.ORDERS_DB.batch([
      env.ORDERS_DB.prepare(
        'INSERT INTO webhook_events (event_id, event_type, processed_at) VALUES (?, ?, ?)',
      ).bind(event.id, event.type, now),
      env.ORDERS_DB.prepare(
        `INSERT INTO orders (
          id, stripe_session_id, stripe_payment_intent_id, product_slug,
          customer_email, amount_total, currency, status, license_version,
          created_at, fulfilled_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'paid', ?, ?, ?)
        ON CONFLICT(stripe_session_id) DO UPDATE SET
          stripe_payment_intent_id = excluded.stripe_payment_intent_id,
          customer_email = excluded.customer_email,
          amount_total = excluded.amount_total,
          currency = excluded.currency,
          status = 'paid',
          fulfilled_at = excluded.fulfilled_at`,
      ).bind(
        orderId,
        session.id,
        session.payment_intent || null,
        product.slug,
        email,
        session.amount_total ?? null,
        session.currency || null,
        session.metadata?.license_version || product.license_version,
        now,
        now,
      ),
      env.ORDERS_DB.prepare(
        `INSERT INTO download_tokens (
          order_id, token_hash, expires_at, max_downloads, download_count, created_at
        ) VALUES (?, ?, ?, ?, 0, ?)
        ON CONFLICT(order_id) DO NOTHING`,
      ).bind(orderId, tokenHash, now + ttl, maxDownloads, now),
    ])
  } catch (error) {
    if (String(error).includes('UNIQUE constraint failed: webhook_events.event_id')) {
      return json({ received: true, duplicate: true })
    }
    throw error
  }

  return json({ received: true })
}

async function recordFailedPayment(event, env) {
  const session = event.data.object
  const now = Math.floor(Date.now() / 1000)

  try {
    await env.ORDERS_DB.batch([
      env.ORDERS_DB.prepare(
        'INSERT INTO webhook_events (event_id, event_type, processed_at) VALUES (?, ?, ?)',
      ).bind(event.id, event.type, now),
      env.ORDERS_DB.prepare(
        `UPDATE orders
         SET status = 'failed'
         WHERE stripe_session_id = ?`,
      ).bind(session.id),
    ])
  } catch (error) {
    if (!String(error).includes('UNIQUE constraint failed: webhook_events.event_id')) {
      throw error
    }
  }
}

async function getOrder(request, env) {
  if (!isAllowedOrigin(request, env)) {
    return json({ error: 'Origin not allowed' }, 403)
  }

  if (!env.DOWNLOAD_TOKEN_SECRET) {
    return json({ error: 'Delivery is not configured.' }, 503, corsHeaders(request, env))
  }

  const sessionId = new URL(request.url).searchParams.get('session_id') || ''
  if (!/^cs_(?:test_|live_)?[A-Za-z0-9_]+$/.test(sessionId)) {
    return json({ error: 'Invalid order reference' }, 400, corsHeaders(request, env))
  }

  const order = await env.ORDERS_DB.prepare(
    `SELECT
       o.status,
       p.title,
       t.token_hash,
       t.expires_at,
       t.max_downloads,
       t.download_count
     FROM orders o
     JOIN products p ON p.slug = o.product_slug
     LEFT JOIN download_tokens t ON t.order_id = o.id
     WHERE o.stripe_session_id = ?`,
  ).bind(sessionId).first()

  if (!order) {
    return json({ status: 'processing' }, 202, corsHeaders(request, env))
  }

  if (order.status !== 'paid' || !order.token_hash) {
    return json({ status: order.status }, 409, corsHeaders(request, env))
  }

  const now = Math.floor(Date.now() / 1000)
  if (order.expires_at <= now || order.download_count >= order.max_downloads) {
    return json({ status: 'expired', title: order.title }, 410, corsHeaders(request, env))
  }

  const token = await deriveDownloadToken(sessionId, env.DOWNLOAD_TOKEN_SECRET)
  if (!constantTimeEqual(await sha256Hex(token), order.token_hash)) {
    return json({ error: 'Delivery token mismatch' }, 500, corsHeaders(request, env))
  }

  const apiUrl = new URL(request.url)
  const downloadUrl = `${apiUrl.origin}/v1/download/${encodeURIComponent(token)}`
  return json({
    status: 'ready',
    title: order.title,
    download_url: downloadUrl,
    expires_at: order.expires_at,
    downloads_remaining: order.max_downloads - order.download_count,
  }, 200, corsHeaders(request, env))
}

async function downloadPurchase(request, env, token) {
  if (!/^[A-Za-z0-9_-]{40,100}$/.test(token)) {
    return json({ error: 'Invalid download link' }, 400)
  }

  const tokenHash = await sha256Hex(token)
  const purchase = await env.ORDERS_DB.prepare(
    `SELECT
       t.order_id,
       t.expires_at,
       t.max_downloads,
       t.download_count,
       o.status,
       p.r2_key,
       p.download_filename
     FROM download_tokens t
     JOIN orders o ON o.id = t.order_id
     JOIN products p ON p.slug = o.product_slug
     WHERE t.token_hash = ?`,
  ).bind(tokenHash).first()

  const now = Math.floor(Date.now() / 1000)
  if (!purchase || purchase.status !== 'paid' || purchase.expires_at <= now) {
    return json({ error: 'This download link is invalid or expired.' }, 410)
  }

  const objectInfo = await env.DOWNLOADS_BUCKET.head(purchase.r2_key)
  if (!objectInfo) {
    console.error('Purchased R2 object is missing', purchase.r2_key)
    return json({ error: 'The file is temporarily unavailable. Please contact support.' }, 503)
  }

  const update = await env.ORDERS_DB.prepare(
    `UPDATE download_tokens
     SET download_count = download_count + 1,
         last_downloaded_at = ?
     WHERE order_id = ?
       AND expires_at > ?
       AND download_count < max_downloads`,
  ).bind(now, purchase.order_id, now).run()

  if (!update.meta?.changes) {
    return json({ error: 'This download link has reached its limit.' }, 410)
  }

  const object = await env.DOWNLOADS_BUCKET.get(purchase.r2_key)
  if (!object?.body) {
    return json({ error: 'The file is temporarily unavailable. Please contact support.' }, 503)
  }

  const filename = safeFilename(purchase.download_filename)
  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('Content-Type', headers.get('Content-Type') || 'application/octet-stream')
  headers.set('Content-Length', String(object.size))
  headers.set('Content-Disposition', `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`)
  headers.set('Cache-Control', 'private, no-store')
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('Referrer-Policy', 'no-referrer')

  return new Response(object.body, { status: 200, headers })
}

export async function verifyStripeSignature(
  payload,
  signatureHeader,
  secret,
  nowSeconds = Math.floor(Date.now() / 1000),
) {
  const parts = signatureHeader.split(',').map((part) => part.trim())
  const timestampPart = parts.find((part) => part.startsWith('t='))
  const signatures = parts
    .filter((part) => part.startsWith('v1='))
    .map((part) => part.slice(3))

  if (!timestampPart || signatures.length === 0) return false

  const timestamp = Number(timestampPart.slice(2))
  if (!Number.isInteger(timestamp) || Math.abs(nowSeconds - timestamp) > SIGNATURE_TOLERANCE_SECONDS) {
    return false
  }

  const expected = await hmacHex(secret, `${timestamp}.${payload}`)
  return signatures.some((signature) => constantTimeEqual(signature, expected))
}

export async function deriveDownloadToken(sessionId, secret) {
  const signature = await hmacBytes(secret, `download:${sessionId}`)
  return bytesToBase64Url(signature)
}

export async function sha256Hex(value) {
  const bytes = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return bytesToHex(new Uint8Array(digest))
}

async function hmacHex(secret, value) {
  return bytesToHex(await hmacBytes(secret, value))
}

async function hmacBytes(secret, value) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value))
  return new Uint8Array(signature)
}

function bytesToHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function bytesToBase64Url(bytes) {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function constantTimeEqual(left, right) {
  if (typeof left !== 'string' || typeof right !== 'string' || left.length !== right.length) {
    return false
  }

  let difference = 0
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index)
  }
  return difference === 0
}

function positiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback
}

function safeFilename(value) {
  return String(value || 'one-more-photon-download.jpg')
    .replace(/[\r\n"\\/]/g, '-')
    .replace(/[^A-Za-z0-9._ -]/g, '-')
    .slice(0, 160)
}

function isAllowedOrigin(request, env) {
  const origin = request.headers.get('origin')
  return allowedOrigins(env).has(origin)
}

function allowedOrigins(env) {
  return new Set([env.SITE_ORIGIN, env.SITE_ORIGIN_WWW].filter(Boolean))
}

function corsHeaders(request, env) {
  const origin = request.headers.get('origin')
  if (!allowedOrigins(env).has(origin)) return {}

  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
}

function handlePreflight(request, env) {
  if (!isAllowedOrigin(request, env)) {
    return new Response(null, { status: 403 })
  }
  return new Response(null, { status: 204, headers: corsHeaders(request, env) })
}

function json(value, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(value), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...extraHeaders,
    },
  })
}
