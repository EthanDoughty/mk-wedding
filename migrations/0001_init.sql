CREATE TABLE IF NOT EXISTS rsvps (
	id TEXT PRIMARY KEY,
	created_at INTEGER NOT NULL,
	guest_name TEXT NOT NULL,
	email TEXT,
	attending INTEGER NOT NULL,            -- 1 = yes, 0 = no
	plus_one_name TEXT,
	meal_choice TEXT,                       -- 'chicken' | 'fish' | 'veggie' | NULL
	dietary_notes TEXT,
	message TEXT
);

CREATE INDEX IF NOT EXISTS idx_rsvps_created_at ON rsvps(created_at DESC);
