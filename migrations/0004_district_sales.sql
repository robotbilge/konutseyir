CREATE TABLE IF NOT EXISTS district_sales (
 city_slug TEXT NOT NULL,
 district_name TEXT NOT NULL,
 period TEXT NOT NULL,
 total INTEGER NOT NULL CHECK(total >= 0),
 retrieved_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY(city_slug,district_name,period)
);
CREATE INDEX IF NOT EXISTS idx_district_sales_city_period ON district_sales(city_slug,period DESC,total DESC);
