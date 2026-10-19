process.env.TZ = process.env.TZ || "Asia/Kolkata";
import "dotenv/config";
import express from "express";
import cors from "cors";
import "./db.js";
import authRoutes from "./routes/auth.js";
import centerRoutes from "./routes/centers.js";
import bookingRoutes from "./routes/bookings.js";
import queueRoutes from "./routes/queue.js";
import staffRoutes from "./routes/staff.js";

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET missing. Copy .env.example to .env and set it.");
  process.exit(1);
}

const app = express();
app.use(cors({ origin: (process.env.CLIENT_ORIGIN || "http://localhost:5173").split(",") }));
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/centers", centerRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/queue", queueRoutes);
app.use("/api/staff", staffRoutes);

app.use((req, res) => res.status(404).json({ message: "Not found" }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong on the server" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Smart Mandi API running on http://localhost:${port}`));
