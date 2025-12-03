import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Ensures the requester is authenticated and attaches the user to the request
export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Authorization token missing" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.id);

    if (!user) {
      return res.status(401).json({ error: "User not found for token" });
    }

    req.user = {
      id: user.id,
      role: user.role,
      email: user.email,
    };

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Guards a route so only specific roles can access it
export const authorize = (...roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Forbidden: insufficient role" });
  }

  return next();
};
