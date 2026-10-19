import { Router } from "express";
import db from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { getQueueSnapshot } from "../queue.js";
import { todayStr } from "../util.js";

const router = Router();
router.use(requireAuth);

router.get("/live", (req, res) => {
  const today = todayStr();
  const b = db.prepare(`SELECT * FROM bookings WHERE farmer_id=? AND date>=? AND
    status IN ('booked','checked_in','waiting','weighing','quality_check')
    ORDER BY date ASC, token_seq ASC LIMIT 1`).get(req.farmerId, today);
  if (!b) return res.json({ queue: null });
  res.json({ queue: getQueueSnapshot(b.center_id, b.date, b.id) });
});

export default router;
