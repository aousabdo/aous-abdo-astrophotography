import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  deriveDownloadToken,
  handleRequest,
  sha256Hex,
  verifyStripeSignature,
} from '../src/index.js'

const encoder = new TextEncoder()

async function stripeSignature(secret, timestamp, payload) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const bytes = await crypto.subtle.sign('HMAC', key, encoder.encode(`${timestamp}.${payload}`))
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

test('verifies an authentic Stripe webhook signature', async () => {
  const secret = 'whsec_test'
  const payload = '{"id":"evt_test"}'
  const timestamp = 1_700_000_000
  const signature = await stripeSignature(secret, timestamp, payload)

  assert.equal(
    await verifyStripeSignature(payload, `t=${timestamp},v1=${signature}`, secret, timestamp),
    true,
  )
})

test('rejects tampered and stale Stripe webhook signatures', async () => {
  const secret = 'whsec_test'
  const payload = '{"id":"evt_test"}'
  const timestamp = 1_700_000_000
  const signature = await stripeSignature(secret, timestamp, payload)

  assert.equal(
    await verifyStripeSignature(`${payload}x`, `t=${timestamp},v1=${signature}`, secret, timestamp),
    false,
  )
  assert.equal(
    await verifyStripeSignature(payload, `t=${timestamp},v1=${signature}`, secret, timestamp + 301),
    false,
  )
})

test('derives stable opaque download tokens', async () => {
  const first = await deriveDownloadToken('cs_test_example', 'download-secret')
  const second = await deriveDownloadToken('cs_test_example', 'download-secret')

  assert.equal(first, second)
  assert.match(first, /^[A-Za-z0-9_-]{43}$/)
  assert.equal((await sha256Hex(first)).length, 64)
})

test('health endpoint reports configured bindings without exposing secrets', async () => {
  const response = await handleRequest(new Request('https://store.example/health'), {
    DOWNLOADS_BUCKET: {},
    ORDERS_DB: {},
    STRIPE_SECRET_KEY: 'must-not-leak',
  })
  const payload = await response.json()

  assert.equal(response.status, 200)
  assert.deepEqual(payload.bindings, { downloads: true, orders: true })
  assert.equal(JSON.stringify(payload).includes('must-not-leak'), false)
})

test('checkout rejects requests from untrusted origins before touching storage', async () => {
  const response = await handleRequest(new Request('https://store.example/v1/checkout', {
    method: 'POST',
    headers: {
      Origin: 'https://malicious.example',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ slug: 'rho-ophiuchi' }),
  }), {
    SITE_ORIGIN: 'https://onemorephoton.com',
    SITE_ORIGIN_WWW: 'https://www.onemorephoton.com',
  })

  assert.equal(response.status, 403)
})
