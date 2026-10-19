const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const FULL_MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export const pad = (n) => String(n).padStart(2, "0");

// "2026-09-08" -> "08 Sep 2026"
export function formatDate(iso, full = false) {
  if (!iso) return "-";
  const [y, m, d] = iso.split("-").map(Number);
  return `${pad(d)} ${(full ? FULL_MONTHS : MONTHS)[m - 1]} ${y}`;
}

export function toISODate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// SQLite CURRENT_TIMESTAMP is UTC: "2026-09-08 04:02:00"
export function formatDateTime(ts) {
  if (!ts) return null;
  const d = new Date(ts.replace(" ", "T") + "Z");
  if (Number.isNaN(d.getTime())) return null;
  const h = d.getHours() % 12 || 12;
  return `${pad(d.getDate())} ${MONTHS[d.getMonth()]}, ${pad(h)}:${pad(d.getMinutes())} ${d.getHours() >= 12 ? "PM" : "AM"}`;
}

export const padNum = (n) => (n == null ? "—" : pad(n));

export const STATUS_TEXT = {
  booked: "Upcoming",
  checked_in: "Waiting",
  waiting: "Waiting",
  weighing: "Weighing",
  quality_check: "Quality Check",
  completed: "Completed",
  cancelled: "Cancelled"
};

export const statusClass = (s) =>
  s === "completed" ? "completed" : s === "cancelled" ? "cancelled" : "waiting";

export const CANCELLABLE = ["booked", "checked_in", "waiting"];
