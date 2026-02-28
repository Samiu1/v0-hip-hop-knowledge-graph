-- Hip-Hop Knowledge Graph — Database Schema
-- Script: 01-schema.sql

-- ───────────────────────────────────────────────
-- NODES
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS nodes (
  id              TEXT PRIMARY KEY,
  name            TEXT NOT NULL,
  type            TEXT NOT NULL CHECK (type IN ('artist','album','era','event','movement','region','concept')),
  era             TEXT,
  year_start      INTEGER,
  year_end        INTEGER,
  region          TEXT,
  description     TEXT,
  influence_score FLOAT DEFAULT 0,
  metadata        JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_nodes_type       ON nodes(type);
CREATE INDEX IF NOT EXISTS idx_nodes_era        ON nodes(era);
CREATE INDEX IF NOT EXISTS idx_nodes_region     ON nodes(region);
CREATE INDEX IF NOT EXISTS idx_nodes_influence  ON nodes(influence_score DESC);
CREATE INDEX IF NOT EXISTS idx_nodes_fts        ON nodes
  USING GIN(to_tsvector('english', name || ' ' || COALESCE(description, '')));

-- ───────────────────────────────────────────────
-- EDGES
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS edges (
  id           SERIAL PRIMARY KEY,
  source_id    TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
  target_id    TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
  relationship TEXT NOT NULL CHECK (relationship IN (
    'influenced','collaborated','sampled','member_of',
    'pioneered','rivals','produced','released_in','originated_in'
  )),
  weight       FLOAT DEFAULT 1.0,
  year         INTEGER,
  metadata     JSONB DEFAULT '{}',
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(source_id, target_id, relationship)
);

CREATE INDEX IF NOT EXISTS idx_edges_source ON edges(source_id);
CREATE INDEX IF NOT EXISTS idx_edges_target ON edges(target_id);
CREATE INDEX IF NOT EXISTS idx_edges_rel    ON edges(relationship);

-- ───────────────────────────────────────────────
-- ERAS
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS eras (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  year_start  INTEGER NOT NULL,
  year_end    INTEGER,
  description TEXT,
  color       TEXT,
  key_events  JSONB DEFAULT '[]'
);

-- ───────────────────────────────────────────────
-- ANALYTICS SNAPSHOTS
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS analytics_snapshots (
  id           SERIAL PRIMARY KEY,
  snapshot_at  TIMESTAMPTZ DEFAULT NOW(),
  era          TEXT,
  top_nodes    JSONB,
  genre_counts JSONB,
  region_dist  JSONB,
  edge_density FLOAT,
  new_nodes    INTEGER DEFAULT 0
);

-- ───────────────────────────────────────────────
-- CRON LOGS
-- ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cron_logs (
  id          SERIAL PRIMARY KEY,
  job_name    TEXT NOT NULL,
  status      TEXT NOT NULL CHECK (status IN ('success','error','running')),
  message     TEXT,
  ran_at      TIMESTAMPTZ DEFAULT NOW(),
  duration_ms INTEGER
);
