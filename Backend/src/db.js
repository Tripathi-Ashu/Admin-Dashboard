import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(process.env.DB_FILE || path.join(__dirname, "..", "mandi.db"));
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
CREATE TABLE IF NOT EXISTS farmers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  village TEXT NOT NULL,
  district TEXT DEFAULT 'Lucknow',
  state TEXT DEFAULT 'Uttar Pradesh',
  primary_crop TEXT DEFAULT 'Wheat',
  address TEXT DEFAULT '',
  verified INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS centers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  capacity_per_slot INTEGER NOT NULL DEFAULT 12,
  avg_minutes_per_token INTEGER NOT NULL DEFAULT 8
);

CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  farmer_id INTEGER NOT NULL REFERENCES farmers(id),
  center_id INTEGER NOT NULL REFERENCES centers(id),
  date TEXT NOT NULL,            -- YYYY-MM-DD
  slot TEXT NOT NULL,            -- e.g. "10:00 AM"
  crop TEXT NOT NULL,
  quantity REAL NOT NULL,        -- quintal
  token_seq INTEGER NOT NULL,    -- running number per center+date
  token TEXT NOT NULL,           -- e.g. A-105
  status TEXT NOT NULL DEFAULT 'booked',
  -- booked | checked_in | waiting | weighing | quality_check | completed | cancelled
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  checked_in_at TEXT,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(center_id, date, token_seq)
);
CREATE INDEX IF NOT EXISTS idx_bookings_farmer ON bookings(farmer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_queue ON bookings(center_id, date, token_seq);
`);

if (db.prepare("SELECT COUNT(*) c FROM centers").get().c === 0) {
  db.prepare("INSERT INTO centers (name, location, capacity_per_slot) VALUES (?,?,?)")
    .run("Lucknow Mandi Procurement Center", "Chinhat, Lucknow", 12);
}

export default db;
