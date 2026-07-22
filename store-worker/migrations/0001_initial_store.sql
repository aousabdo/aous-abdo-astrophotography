PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS products (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  stripe_price_id TEXT NOT NULL UNIQUE,
  r2_key TEXT NOT NULL UNIQUE,
  download_filename TEXT NOT NULL,
  license_version TEXT NOT NULL DEFAULT 'personal-v1',
  active INTEGER NOT NULL DEFAULT 0 CHECK (active IN (0, 1)),
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  stripe_session_id TEXT NOT NULL UNIQUE,
  stripe_payment_intent_id TEXT,
  product_slug TEXT NOT NULL,
  customer_email TEXT,
  amount_total INTEGER,
  currency TEXT,
  status TEXT NOT NULL CHECK (status IN ('paid', 'failed', 'refunded')),
  license_version TEXT NOT NULL,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  fulfilled_at INTEGER,
  FOREIGN KEY (product_slug) REFERENCES products(slug)
);

CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_product_slug ON orders(product_slug);

CREATE TABLE IF NOT EXISTS download_tokens (
  order_id TEXT PRIMARY KEY,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at INTEGER NOT NULL,
  max_downloads INTEGER NOT NULL DEFAULT 3 CHECK (max_downloads > 0),
  download_count INTEGER NOT NULL DEFAULT 0 CHECK (download_count >= 0),
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  last_downloaded_at INTEGER,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_download_tokens_expires_at ON download_tokens(expires_at);

CREATE TABLE IF NOT EXISTS webhook_events (
  event_id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  processed_at INTEGER NOT NULL DEFAULT (unixepoch())
);
