CREATE TABLE IF NOT EXISTS news (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 slug TEXT NOT NULL UNIQUE,
 title TEXT NOT NULL,
 summary TEXT NOT NULL,
 source_name TEXT NOT NULL,
 source_url TEXT NOT NULL UNIQUE,
 published_at TEXT NOT NULL,
 category TEXT,
 image_url TEXT,
 created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS news_published_idx ON news(published_at DESC);

CREATE TABLE IF NOT EXISTS push_subscriptions (
 endpoint TEXT PRIMARY KEY,
 p256dh TEXT NOT NULL,
 auth TEXT NOT NULL,
 created_at TEXT NOT NULL,
 updated_at TEXT NOT NULL
);
