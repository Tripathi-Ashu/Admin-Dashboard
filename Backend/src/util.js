// Today's date as YYYY-MM-DD in Indian time, so "today" matches the mandi's day (not UTC).
export function todayStr() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}
