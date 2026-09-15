CREATE TABLE IF NOT EXISTS observations (
 series TEXT NOT NULL,
 period TEXT NOT NULL,
 value REAL NOT NULL,
 retrieved_at TEXT NOT NULL,
 PRIMARY KEY (series, period)
) WITHOUT ROWID;
CREATE TABLE IF NOT EXISTS source_status (
 series TEXT PRIMARY KEY,
 state TEXT NOT NULL,
 attempted_at TEXT NOT NULL
);
