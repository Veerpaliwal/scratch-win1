import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "database.db");

const db = new Database(dbPath);

// table create (agar pehle se nahi hai)
db.prepare(`
  CREATE TABLE IF NOT EXISTS customer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT,
    fullname TEXT,
    phoneno TEXT,
    address TEXT,
    pincode TEXT,
    coupon_code TEXT
  )
`).run();

export default db;
