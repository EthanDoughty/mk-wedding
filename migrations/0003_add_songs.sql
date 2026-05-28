CREATE TABLE IF NOT EXISTS songs (
	id TEXT PRIMARY KEY,
	created_at INTEGER NOT NULL,
	submitter_name TEXT,
	original_url TEXT NOT NULL,
	title TEXT,
	artist TEXT,
	artwork_url TEXT,
	odesli_page_url TEXT,
	platforms_json TEXT
);

CREATE INDEX IF NOT EXISTS idx_songs_created_at ON songs(created_at DESC);
