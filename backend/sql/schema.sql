-- Simple PostgreSQL schema for demo
CREATE TABLE IF NOT EXISTS rfps (
  id SERIAL PRIMARY KEY,
  title TEXT,
  structured_data JSONB,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS vendors (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  contact TEXT,
  meta JSONB,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS proposals (
  id SERIAL PRIMARY KEY,
  rfp_id INTEGER REFERENCES rfps(id),
  vendor_email TEXT,
  raw_email_text TEXT,
  parsed_data JSONB,
  ai_summary TEXT,
  score NUMERIC,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS email_logs (
  id SERIAL PRIMARY KEY,
  direction TEXT,
  vendor_id INTEGER,
  rfp_id INTEGER,
  subject TEXT,
  body TEXT,
  timestamp TIMESTAMP DEFAULT now()
);
