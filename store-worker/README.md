# One More Photon store Worker

Private digital-edition checkout and delivery service for One More Photon.

## Responsibilities

- Creates one-time Stripe Checkout Sessions with Managed Payments enabled.
- Accepts and verifies Stripe webhook signatures.
- Records idempotent fulfillment in D1.
- Issues deterministic, expiring download tokens.
- Streams purchased files from the private R2 binding.

The public GitHub Pages site remains separate. No original or purchased file is stored in the public repository.

## Cloudflare resources

- Worker: `one-more-photon-store`
- R2 binding: `DOWNLOADS_BUCKET` → `one-more-photon-private-downloads`
- D1 binding: `ORDERS_DB` → `one-more-photon-orders`

## Required secrets

Set these with `wrangler secret put` or in the Cloudflare dashboard. Never commit them.

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `DOWNLOAD_TOKEN_SECRET`

For local development, copy `.dev.vars.example` to `.dev.vars` and use test credentials only.

## Database

Apply migrations locally first:

```bash
npm run store:migrate:local
```

Apply them to the remote D1 database only after validation:

```bash
npm run store:migrate:remote
```

Each sellable photograph must have one row in `products` containing its Stripe Price ID, private R2 object key, safe download filename, license version, and active status.

## Validation

```bash
npm run store:check
```

## API

- `GET /health`
- `GET /v1/products`
- `POST /v1/checkout`
- `POST /v1/webhooks/stripe`
- `GET /v1/order?session_id=...`
- `GET /v1/download/:token`
