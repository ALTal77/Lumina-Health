const path = require("path");
const fs = require("fs");
const { DatabaseSync } = require("node:sqlite");

const DB_PATH = process.env.DB_PATH || path.join(__dirname, "../../data/lumina.db");

// Make sure the data directory exists before opening the file.
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new DatabaseSync(DB_PATH);
db.exec("PRAGMA journal_mode = WAL;");
db.exec("PRAGMA foreign_keys = ON;");

db.exec(`
  CREATE TABLE IF NOT EXISTS doctors (
    id              TEXT PRIMARY KEY,
    name_en         TEXT NOT NULL,
    name_ar         TEXT NOT NULL,
    specialty_en    TEXT NOT NULL,
    specialty_ar    TEXT NOT NULL,
    hospital_en     TEXT NOT NULL,
    hospital_ar     TEXT NOT NULL,
    image           TEXT NOT NULL,
    rating          REAL NOT NULL DEFAULT 4.8,
    reviews_count   INTEGER NOT NULL DEFAULT 0,
    experience      INTEGER NOT NULL DEFAULT 0,
    next_slot_en    TEXT NOT NULL,
    next_slot_ar    TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS patients (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id      TEXT UNIQUE NOT NULL,
    full_name       TEXT NOT NULL,
    national_id     TEXT NOT NULL,
    email           TEXT UNIQUE NOT NULL,
    password_hash   TEXT NOT NULL,
    gender          TEXT NOT NULL DEFAULT 'male',
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    reference       TEXT UNIQUE NOT NULL,
    doctor_id       TEXT NOT NULL REFERENCES doctors(id),
    patient_name    TEXT NOT NULL,
    phone           TEXT NOT NULL,
    date            TEXT NOT NULL,
    time_slot       TEXT NOT NULL,
    notes           TEXT,
    status          TEXT NOT NULL DEFAULT 'confirmed',
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS contact_messages (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    name            TEXT NOT NULL,
    email           TEXT NOT NULL,
    subject         TEXT,
    message         TEXT NOT NULL,
    status          TEXT NOT NULL DEFAULT 'new',
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// Seed doctors once, only if the table is empty, so re-starting the server
// doesn't duplicate rows.
const doctorCount = db.prepare("SELECT COUNT(*) AS count FROM doctors").get().count;

if (doctorCount === 0) {
  const insert = db.prepare(`
    INSERT INTO doctors (
      id, name_en, name_ar, specialty_en, specialty_ar,
      hospital_en, hospital_ar, image, rating, reviews_count,
      experience, next_slot_en, next_slot_ar
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const seedDoctors = [
    ["doc-1", "Dr. Layla Haddad", "د. ليلى حداد", "Cardiology", "أمراض القلب",
      "Lumina Central Campus", "لومينا - الحرم المركزي",
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
      4.9, 214, 12, "Today, 4:30 PM", "اليوم، 4:30 م"],
    ["doc-2", "Dr. Omar Nassar", "د. عمر نصّار", "Orthopedics", "جراحة العظام",
      "Lumina Central Campus", "لومينا - الحرم المركزي",
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
      4.8, 176, 15, "Tomorrow, 10:00 AM", "غداً، 10:00 ص"],
    ["doc-3", "Dr. Rana Suleiman", "د. رنا سليمان", "Pediatrics", "طب الأطفال",
      "Lumina Family Clinic", "لومينا - عيادة الأسرة",
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=600",
      5.0, 302, 9, "Today, 6:00 PM", "اليوم، 6:00 م"],
    ["doc-4", "Dr. Karim Aboud", "د. كريم عبود", "Dermatology", "الأمراض الجلدية",
      "Lumina Central Campus", "لومينا - الحرم المركزي",
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
      4.7, 128, 8, "Fri, 1:00 PM", "الجمعة، 1:00 م"],
    ["doc-5", "Dr. Yasmin Khoury", "د. ياسمين خوري", "Neurology", "طب الأعصاب",
      "Lumina Central Campus", "لومينا - الحرم المركزي",
      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=600",
      4.9, 189, 14, "Mon, 9:30 AM", "الاثنين، 9:30 ص"],
    ["doc-6", "Dr. Sami Barakat", "د. سامي بركات", "General Surgery", "الجراحة العامة",
      "Lumina Family Clinic", "لومينا - عيادة الأسرة",
      "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&q=80&w=600",
      4.6, 97, 20, "Today, 2:15 PM", "اليوم، 2:15 م"],
  ];

  db.exec("BEGIN");
  try {
    for (const row of seedDoctors) insert.run(...row);
    db.exec("COMMIT");
  } catch (err) {
    db.exec("ROLLBACK");
    throw err;
  }
}

module.exports = db;
