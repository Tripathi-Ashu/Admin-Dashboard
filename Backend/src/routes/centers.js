import { Router } from "express";
import db from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { SLOTS, slotEnd } from "../queue.js";

const router = Router();
router.use(requireAuth);

router.get("/", (_req, res) => {
  const centers = db.prepare("SELECT * FROM centers").all().map(c => ({
    id: c.id, name: c.name, location: c.location,
    totalSlots: c.capacity_per_slot * SLOTS.length
  }));
  res.json({ centers });
});

router.get("/:id/slots", (req, res) => {
  const center = db.prepare("SELECT * FROM centers WHERE id=?").get(req.params.id);
  if (!center) return res.status(404).json({ message: "Center not found" });
  const date = String(req.query.date || "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return res.status(400).json({ message: "date=YYYY-MM-DD required" });

  const counts = db.prepare(`SELECT slot, COUNT(*) c FROM bookings
    WHERE center_id=? AND date=? AND status!='cancelled' GROUP BY slot`).all(center.id, date);
  const used = Object.fromEntries(counts.map(r => [r.slot, r.c]));
  res.json({
    date,
    slots: SLOTS.map(s => ({
      slot: s, endTime: slotEnd(s),
      spotsLeft: Math.max(0, center.capacity_per_slot - (used[s] || 0))
    }))
  });
});

export default router;
