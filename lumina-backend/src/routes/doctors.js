const express = require("express");
const { query } = require("express-validator");
const db = require("../db");
const validate = require("../middleware/validate");
const { mapDoctor } = require("../utils/mappers");

const router = express.Router();

// GET /api/doctors?search=&specialty=
// Mirrors the filtering logic used in the Doctors.tsx carousel: matches on
// either English or Arabic name/specialty, case-insensitively.
router.get(
  "/",
  [
    query("search").optional().isString().trim().isLength({ max: 100 }),
    query("specialty").optional().isString().trim().isLength({ max: 100 }),
  ],
  validate,
  (req, res) => {
    const { search = "", specialty = "" } = req.query;
    const rows = db.prepare("SELECT * FROM doctors").all();

    const q = search.toLowerCase();
    const filtered = rows.filter((row) => {
      const matchesQuery =
        !q ||
        row.name_en.toLowerCase().includes(q) ||
        row.name_ar.toLowerCase().includes(q) ||
        row.specialty_en.toLowerCase().includes(q) ||
        row.specialty_ar.toLowerCase().includes(q);

      const matchesSpecialty =
        !specialty ||
        row.specialty_en.toLowerCase() === specialty.toLowerCase() ||
        row.specialty_ar.toLowerCase() === specialty.toLowerCase();

      return matchesQuery && matchesSpecialty;
    });

    res.json({ doctors: filtered.map(mapDoctor), total: filtered.length });
  },
);

// GET /api/doctors/specialties - distinct specialty list for the Hero dropdown
router.get("/specialties", (req, res) => {
  const rows = db.prepare("SELECT DISTINCT specialty_en, specialty_ar FROM doctors").all();
  res.json({
    specialtiesEn: rows.map((r) => r.specialty_en),
    specialtiesAr: rows.map((r) => r.specialty_ar),
  });
});

// GET /api/doctors/:id
router.get("/:id", (req, res) => {
  const row = db.prepare("SELECT * FROM doctors WHERE id = ?").get(req.params.id);
  if (!row) return res.status(404).json({ error: "Doctor not found" });
  res.json({ doctor: mapDoctor(row) });
});

module.exports = router;
