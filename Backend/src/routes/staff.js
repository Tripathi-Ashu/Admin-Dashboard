// Operator endpoints to move tokens through weighing -> quality check -> completed.
// Protected by a shared STAFF_KEY header so the live queue can be demoed without a full admin panel.
import { Router } from "express";
import db from "../db.js";
import { todayStr } from "../util.js";

const router = Router();
router.use((req, res, next) => {
  const key = process.env.STAFF_KEY;
  if (!key || req.headers["x-staff-key"] !== key) return res.status(403).json({ message: "Staff access only" });
  next();
});

const NEXT = { booked: "waiting", checked_in: "weighing", waiting: "weighing", weighing: "quality_check", quality_check: "completed" };

router.post("/bookings/:id/advance", (req, res) => {
  const b = db.prepare("SELECT * FROM bookings WHERE id=?").get(req.params.id);
  if (!b) return res.status(404).json({ message: "Booking not found" });
  const next = NEXT[b.status];
  if (!next) return res.status(400).json({ message: `Cannot advance from ${b.status}` });
  db.prepare("UPDATE bookings SET status=?, updated_at=CURRENT_TIMESTAMP WHERE id=?").run(next, b.id);
  res.json({ id: b.id, token: b.token, status: next });
});

router.get("/queue", (req, res) => {
  const date = req.query.date || todayStr();
  res.json({ bookings: db.prepare(`SELECT id, token, slot, crop, quantity, status FROM bookings
    WHERE date=? AND status!='cancelled' ORDER BY token_seq`).all(date) });
});

export default router;
