CREATE TABLE IF NOT EXISTS mood_entries (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  score INTEGER NOT NULL,
  mood TEXT NOT NULL,
  emoji TEXT NOT NULL,
  summary TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_mood_entries_created_at ON mood_entries (created_at DESC);
