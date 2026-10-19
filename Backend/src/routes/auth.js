import { Router } from "express";
import bcrypt from "bcryptjs";
import db from "../db.js";
import { signToken, requireAuth } from "../middleware/auth.js";

const router = Router();
const isMobile = (m) => /^\d{10}$/.test(m);
const publicFarmer = (f) => ({
  id: f.id, name: f.name, mobile: f.mobile, village: f.village,
  district: f.district, state: f.state, primaryCrop: f.primary_crop,
  address: f.address, verified: !!f.verified
});

router.post("/register", (req, res) => {
  const { name, mobile, village, password } = req.body || {};
  const cleanMobile = String(mobile || "").replace(/\D/g, "").slice(-10);
  if (!name?.trim() || !village?.trim()) return res.status(400).json({ message: "Name and village are required" });
  if (!isMobile(cleanMobile)) return res.status(400).json({ message: "Enter a valid 10-digit mobile number" });
  if (!password || password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });

  if (db.prepare("SELECT 1 FROM farmers WHERE mobile=?").get(cleanMobile))
    return res.status(409).json({ message: "This mobile number is already registered" });

  const hash = bcrypt.hashSync(password, 10);
  const info = db.prepare(
    "INSERT INTO farmers (name, mobile, password_hash, village, address) VALUES (?,?,?,?,?)"
  ).run(name.trim(), cleanMobile, hash, village.trim(), `${village.trim()} Village, Lucknow, Uttar Pradesh`);
  const farmer = db.prepare("SELECT * FROM farmers WHERE id=?").get(info.lastInsertRowid);
  res.status(201).json({ token: signToken(farmer), farmer: publicFarmer(farmer) });
});

router.post("/login", (req, res) => {
  const { mobile, password } = req.body || {};
  const cleanMobile = String(mobile || "").replace(/\D/g, "").slice(-10);
  const farmer = db.prepare("SELECT * FROM farmers WHERE mobile=?").get(cleanMobile);
  if (!farmer || !bcrypt.compareSync(String(password || ""), farmer.password_hash))
    return res.status(401).json({ message: "Invalid mobile number or password" });
  res.json({ token: signToken(farmer), farmer: publicFarmer(farmer) });
});

router.get("/me", requireAuth, (req, res) => {
  const farmer = db.prepare("SELECT * FROM farmers WHERE id=?").get(req.farmerId);
  if (!farmer) return res.status(401).json({ message: "Account not found" });
  res.json({ farmer: publicFarmer(farmer) });
});

router.put("/me", requireAuth, (req, res) => {
  const { name, village, district, state, primaryCrop, address } = req.body || {};
  const cur = db.prepare("SELECT * FROM farmers WHERE id=?").get(req.farmerId);
  db.prepare(`UPDATE farmers SET name=?, village=?, district=?, state=?, primary_crop=?, address=? WHERE id=?`)
    .run(name?.trim() || cur.name, village?.trim() || cur.village, district?.trim() || cur.district,
         state?.trim() || cur.state, primaryCrop || cur.primary_crop, address ?? cur.address, req.farmerId);
  res.json({ farmer: publicFarmer(db.prepare("SELECT * FROM farmers WHERE id=?").get(req.farmerId)) });
});

export default router;
