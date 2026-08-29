const express = require("express");
const bcrypt = require("bcryptjs");
const { body } = require("express-validator");
const rateLimit = require("express-rate-limit");
const db = require("../db");
const validate = require("../middleware/validate");

const router = express.Router();

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many registration attempts. Please try again later." },
});

function generatePatientId() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `LUM-PT-${n}`;
}

// POST /api/register
router.post(
  "/",
  registerLimiter,
  [
    body("fullName").isString().trim().isLength({ min: 2, max: 100 }),
    body("nationalId").isString().trim().isLength({ min: 4, max: 30 }),
    body("email").isEmail().normalizeEmail(),
    body("password").isString().isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
    body("gender").optional().isIn(["male", "female"]),
  ],
  validate,
  (req, res, next) => {
    try {
      const { fullName, nationalId, email, password, gender = "male" } = req.body;

      const existing = db.prepare("SELECT id FROM patients WHERE email = ?").get(email);
      if (existing) {
        return res.status(409).json({ error: "An account with this email already exists" });
      }

      const passwordHash = bcrypt.hashSync(password, 10);

      let patientId = generatePatientId();
      const idExists = db.prepare("SELECT 1 FROM patients WHERE patient_id = ?");
      while (idExists.get(patientId)) patientId = generatePatientId();

      db.prepare(
        `INSERT INTO patients (patient_id, full_name, national_id, email, password_hash, gender)
         VALUES (?, ?, ?, ?, ?, ?)`,
      ).run(patientId, fullName, nationalId, email, passwordHash, gender);

      res.status(201).json({
        patient: {
          patientId,
          name: fullName,
          idNumber: nationalId,
          email,
        },
      });
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;
