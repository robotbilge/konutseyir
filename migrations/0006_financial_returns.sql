CREATE TABLE IF NOT EXISTS financial_returns (
 period TEXT NOT NULL,
 instrument TEXT NOT NULL,
 horizon TEXT NOT NULL,
 deflator TEXT NOT NULL,
 kind TEXT NOT NULL,
 value REAL NOT NULL,
 retrieved_at TEXT NOT NULL,
 PRIMARY KEY (period,instrument,horizon,deflator,kind)
) WITHOUT ROWID;
CREATE INDEX IF NOT EXISTS financial_returns_period_idx ON financial_returns(period DESC,horizon,deflator);
