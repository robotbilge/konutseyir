CREATE TABLE IF NOT EXISTS city_sales (
 city_slug TEXT NOT NULL,
 period TEXT NOT NULL,
 total INTEGER NOT NULL CHECK(total >= 0),
 mortgaged INTEGER NOT NULL CHECK(mortgaged >= 0),
 first_sale INTEGER NOT NULL CHECK(first_sale >= 0),
 second_hand INTEGER NOT NULL CHECK(second_hand >= 0),
 retrieved_at TEXT NOT NULL,
 PRIMARY KEY (city_slug, period)
) WITHOUT ROWID;
CREATE INDEX IF NOT EXISTS city_sales_period_idx ON city_sales(period DESC);
