CREATE TABLE IF NOT EXISTS guide_publication_state (
 id INTEGER PRIMARY KEY CHECK(id=1),
 initialized_at TEXT NOT NULL,
 build_id TEXT NOT NULL,
 checked_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS guide_publications (
 path TEXT PRIMARY KEY,
 title TEXT NOT NULL,
 summary TEXT NOT NULL,
 seen_at TEXT NOT NULL,
 baseline INTEGER NOT NULL DEFAULT 0 CHECK(baseline IN (0,1))
);
CREATE TABLE IF NOT EXISTS guide_push_deliveries (
 path TEXT NOT NULL,
 endpoint TEXT NOT NULL,
 state TEXT NOT NULL DEFAULT 'pending',
 attempts INTEGER NOT NULL DEFAULT 0,
 attempted_at TEXT,
 PRIMARY KEY(path,endpoint)
);
CREATE INDEX IF NOT EXISTS guide_push_pending_idx ON guide_push_deliveries(state,attempted_at);
