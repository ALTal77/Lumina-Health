const express = require("express");
const crypto = require("crypto");
const { body, param } = require("express-validator");
const rateLimit = require("express-rate-limit");
const db = require("../db");
const validate = require("../middleware/validate");
const { mapBooking } = require("../utils/mappers");

const router = express.Router();

// Modest limit so the public booking form can't be spammed.
const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many booking attempts. Please try again later." },
});

function generateReference() {
  // Same shape as the mock UI: LUM-123456
  const n = crypto.randomInt(100000, 1000000);
  return `LUM-${n}`;
}

// POST /api/bookings
router.post(
  "/",
  bookingLimiter,
  [
    body("doctorId").isString().trim().notEmpty().withMessage("doctorId is required"),
    body("patientName").isString().trim().isLength({ min: 2, max: 100 }),
    body("phone").isString().trim().isLength({ min: 6, max: 30 }),
    body("date").isISO8601().withMessage("date must be a valid date (YYYY-MM-DD)"),
    body("timeSlot").isString().trim().notEmpty(),
    body("notes").optional({ nullable: true }).isString().trim().isLength({ max: 500 }),
  ],
  validate,
  (req, res) => {
    const { doctorId, patientName, phone, date, timeSlot, notes = null } = req.body;

    const doctor = db.prepare("SELECT id FROM doctors WHERE id = ?").get(doctorId);
    if (!doctor) {
      return res.status(400).json({ error: "Selected doctor does not exist" });
    }

    let reference = generateReference();
    // Extremely unlikely, but guard against a reference collision anyway.
    const refExists = db.prepare("SELECT 1 FROM bookings WHERE reference = ?");
    while (refExists.get(reference)) reference = generateReference();

    db.prepare(
      `INSERT INTO bookings (reference, doctor_id, patient_name, phone, date, time_slot, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    ).run(reference, doctorId, patientName, phone, date, timeSlot, notes);

    const row = db.prepare("SELECT * FROM bookings WHERE reference = ?").get(reference);
    res.status(201).json({ booking: mapBooking(row) });
  },
);

// GET /api/bookings/:reference
router.get(
  "/:reference",
  [param("reference").isString().trim().notEmpty()],
  validate,
  (req, res) => {
    const row = db
      .prepare("SELECT * FROM bookings WHERE reference = ?")
      .get(req.params.reference);
    if (!row) return res.status(404).json({ error: "Booking not found" });
    res.json({ booking: mapBooking(row) });
  },
);

module.exports = router;
