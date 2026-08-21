const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");
const rateLimit = require("express-rate-limit");
const db = require("../db");
const validate = require("../middleware/validate");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many login attempts. Please try again later." },
});

const JWT_SECRET = process.env.JWT_SECRET || "lumina-dev-secret";
const JWT_ISSUER = "lumina-health";
const JWT_EXPIRES_IN = "7d";

function signToken(patient) {
  return jwt.sign(
    { sub: patient.patient_id, email: patient.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN, issuer: JWT_ISSUER },
  );
}

function mapPatient(patient) {
  return {
    patientId: patient.patient_id,
    name: patient.full_name,
    email: patient.email,
  };
}

// POST /api/auth/login - issues a JWT for an existing patient.
router.post(
  "/login",
  loginLimiter,
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isString().notEmpty().withMessage("password is required"),
  ],
  validate,
  (req, res) => {
    const { email, password } = req.body;

    const patient = db.prepare("SELECT * FROM patients WHERE email = ?").get(email);
    if (!patient || !bcrypt.compareSync(password, patient.password_hash)) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({ token: signToken(patient), patient: mapPatient(patient) });
  },
);

// Middleware for protected routes: verifies the Bearer token.
function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }
  try {
    req.patient = jwt.verify(token, JWT_SECRET, { issuer: JWT_ISSUER });
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// GET /api/auth/me - returns the currently authenticated patient.
router.get("/me", requireAuth, (req, res) => {
  const patient = db
    .prepare("SELECT * FROM patients WHERE patient_id = ?")
    .get(req.patient.sub);
  if (!patient) return res.status(404).json({ error: "Patient not found" });
  res.json({ patient: mapPatient(patient) });
});

module.exports = router;
module.exports.requireAuth = requireAuth;