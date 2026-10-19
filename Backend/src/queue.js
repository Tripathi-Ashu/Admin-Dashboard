import db from "./db.js";

export const SLOTS = ["08:00 AM","09:00 AM","10:00 AM","11:00 AM","12:00 PM","02:00 PM","03:00 PM","04:00 PM"];
export const ACTIVE = ["booked","checked_in","waiting","weighing","quality_check"];

export function slotEnd(slot) {
  const i = SLOTS.indexOf(slot);
  const [h, rest] = slot.split(":");
  const [m, ap] = rest.split(" ");
  let hour = parseInt(h, 10) % 12 + (ap === "PM" ? 12 : 0);
  hour += 1;
  const ap2 = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${String(h12).padStart(2, "0")}:${m} ${ap2}`;
}

// Live queue for one center+date.
export function getQueueSnapshot(centerId, date, myBookingId = null) {
  const center = db.prepare("SELECT * FROM centers WHERE id=?").get(centerId);
  const rows = db.prepare(`
    SELECT b.id, b.token, b.token_seq, b.status, b.farmer_id
    FROM bookings b WHERE b.center_id=? AND b.date=? AND b.status!='cancelled'
    ORDER BY b.token_seq`).all(centerId, date);

  const serving = rows.find(r => ["weighing","quality_check"].includes(r.status))
    || null;
  const waiting = rows.filter(r => ["checked_in","waiting"].includes(r.status));
  const nextToken = waiting[0] || null;

  let mine = null;
  if (myBookingId) {
    const idx = waiting.findIndex(r => r.id === myBookingId);
    const row = rows.find(r => r.id === myBookingId);
    if (row) {
      const ahead = idx === -1 ? 0 : idx + (serving ? 1 : 0);
      mine = {
        token: row.token,
        status: row.status,
        position: idx === -1 ? null : idx + 1 + (serving ? 1 : 0),
        ahead: idx === -1 ? null : ahead,
        estimatedWaitMinutes: idx === -1 ? null : ahead * center.avg_minutes_per_token
      };
    }
  }

  return {
    center: { id: center.id, name: center.name },
    date,
    nowServing: serving ? serving.token : null,
    nextToken: nextToken ? nextToken.token : null,
    mine,
    list: rows.map(r => ({
      token: r.token,
      status: r.status === "completed" ? "completed"
            : ["weighing","quality_check"].includes(r.status) ? "serving"
            : ["checked_in","waiting"].includes(r.status) ? "waiting" : "booked",
      isMine: r.id === myBookingId
    })),
    updatedAt: new Date().toISOString()
  };
}
