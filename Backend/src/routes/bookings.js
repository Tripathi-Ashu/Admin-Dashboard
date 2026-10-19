import { Router } from "express";
import db from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { SLOTS, ACTIVE, slotEnd, getQueueSnapshot } from "../queue.js";

const router = Router();
router.use(requireAuth);

const CROPS = ["Wheat", "Rice", "Maize", "Barley"];
import { todayStr } from "../util.js";

const shape = (b) => ({
  id: b.id, token: b.token, date: b.date, slot: b.slot, endTime: slotEnd(b.slot),
  crop: b.crop, quantity: b.quantity, status: b.status,
  center: { id: b.center_id, name: b.center_name, location: b.center_location },
  createdAt: b.created_at, checkedInAt: b.checked_in_at, updatedAt: b.updated_at
});

const baseSelect = `SELECT b.*, c.name AS center_name, c.location AS center_location
  FROM bookings b JOIN centers c ON c.id=b.center_id`;

router.post("/", (req, res) => {
  const { centerId, date, slot, crop, quantity } = req.body || {};
  const qty = Number(quantity);
  if (!centerId || !date || !slot) return res.status(400).json({ message: "Center, date and slot are required" });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < todayStr()) return res.status(400).json({ message: "Choose today or a future date" });
  if (!SLOTS.includes(slot)) return res.status(400).json({ message: "Invalid time slot" });
  if (!CROPS.includes(crop)) return res.status(400).json({ message: "Invalid crop" });
  if (!Number.isFinite(qty) || qty <= 0 || qty > 1000) return res.status(400).json({ message: "Enter a valid quantity (quintal)" });

  const center = db.prepare("SELECT * FROM centers WHERE id=?").get(centerId);
  if (!center) return res.status(404).json({ message: "Center not found" });

  const create = db.transaction(() => {
    const dup = db.prepare(`SELECT 1 FROM bookings WHERE farmer_id=? AND center_id=? AND date=? AND slot=? AND status!='cancelled'`)
      .get(req.farmerId, centerId, date, slot);
    if (dup) return { error: [409, "You already have a booking for this slot"] };

    const used = db.prepare(`SELECT COUNT(*) c FROM bookings WHERE center_id=? AND date=? AND slot=? AND status!='cancelled'`)
      .get(centerId, date, slot).c;
    if (used >= center.capacity_per_slot) return { error: [409, "This slot is full, please pick another"] };

    const seq = (db.prepare("SELECT COALESCE(MAX(token_seq),0) m FROM bookings WHERE center_id=? AND date=?")
      .get(centerId, date).m) + 1;
    const token = `A-${String(seq).padStart(3, "0")}`;
    const info = db.prepare(`INSERT INTO bookings (farmer_id, center_id, date, slot, crop, quantity, token_seq, token)
      VALUES (?,?,?,?,?,?,?,?)`).run(req.farmerId, centerId, date, slot, crop, qty, seq, token);
    return { id: info.lastInsertRowid };
  });

  const out = create();
  if (out.error) return res.status(out.error[0]).json({ message: out.error[1] });
  res.status(201).json({ booking: shape(db.prepare(`${baseSelect} WHERE b.id=?`).get(out.id)) });
});

router.get("/", (req, res) => {
  const { status, q } = req.query;
  let rows = db.prepare(`${baseSelect} WHERE b.farmer_id=? ORDER BY b.date DESC, b.token_seq DESC`).all(req.farmerId).map(shape);
  if (status === "upcoming") rows = rows.filter(b => ACTIVE.includes(b.status));
  else if (status === "completed" || status === "cancelled") rows = rows.filter(b => b.status === status);
  if (q) {
    const s = String(q).toLowerCase();
    rows = rows.filter(b => [b.token, b.crop, b.center.name, b.date, b.slot].some(v => String(v).toLowerCase().includes(s)));
  }
  res.json({ bookings: rows });
});

router.get("/active", (req, res) => {
  const b = db.prepare(`${baseSelect} WHERE b.farmer_id=? AND b.status IN (${ACTIVE.map(() => "?").join(",")}) AND b.date>=?
    ORDER BY b.date ASC, b.token_seq ASC LIMIT 1`).get(req.farmerId, ...ACTIVE, todayStr());
  if (!b) return res.json({ booking: null, queue: null });
  res.json({ booking: shape(b), queue: getQueueSnapshot(b.center_id, b.date, b.id) });
});

router.get("/stats", (req, res) => {
  const year = new Date().getFullYear().toString();
  const completed = db.prepare(`SELECT COUNT(*) c FROM bookings WHERE farmer_id=? AND status='completed' AND date LIKE ?`)
    .get(req.farmerId, `${year}%`).c;
  const recent = db.prepare(`${baseSelect} WHERE b.farmer_id=? AND b.status='completed' ORDER BY b.date DESC LIMIT 5`)
    .all(req.farmerId).map(shape);
  res.json({ completedThisYear: completed, recent });
});

router.get("/:id", (req, res) => {
  const b = db.prepare(`${baseSelect} WHERE b.id=? AND b.farmer_id=?`).get(req.params.id, req.farmerId);
  if (!b) return res.status(404).json({ message: "Booking not found" });
  res.json({ booking: shape(b), queue: getQueueSnapshot(b.center_id, b.date, b.id) });
});

router.post("/:id/check-in", (req, res) => {
  const b = db.prepare("SELECT * FROM bookings WHERE id=? AND farmer_id=?").get(req.params.id, req.farmerId);
  if (!b) return res.status(404).json({ message: "Booking not found" });
  if (b.status !== "booked") return res.status(400).json({ message: "Already checked in or closed" });
  if (b.date !== todayStr()) return res.status(400).json({ message: "Check-in is only possible on the booking date" });
  db.prepare("UPDATE bookings SET status='waiting', checked_in_at=CURRENT_TIMESTAMP, updated_at=CURRENT_TIMESTAMP WHERE id=?").run(b.id);
  res.json({ ok: true });
});

router.post("/:id/cancel", (req, res) => {
  const b = db.prepare("SELECT * FROM bookings WHERE id=? AND farmer_id=?").get(req.params.id, req.farmerId);
  if (!b) return res.status(404).json({ message: "Booking not found" });
  if (!["booked", "checked_in", "waiting"].includes(b.status))
    return res.status(400).json({ message: "This booking can no longer be cancelled" });
  db.prepare("UPDATE bookings SET status='cancelled', updated_at=CURRENT_TIMESTAMP WHERE id=?").run(b.id);
  res.json({ ok: true });
});

export default router;
