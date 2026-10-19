import jwt from "jsonwebtoken";

export function signToken(farmer) {
  return jwt.sign({ id: farmer.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Login required" });
  try {
    req.farmerId = jwt.verify(token, process.env.JWT_SECRET).id;
    next();
  } catch {
    res.status(401).json({ message: "Session expired, please login again" });
  }
}
