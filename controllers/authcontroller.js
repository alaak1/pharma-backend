import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { first_name, last_name, phone, role, email, password } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const name = req.body.name || [first_name, last_name].filter(Boolean).join(" ").trim();

    const user = await User.create({
      first_name,
      last_name,
      name,
      phone,
      role,
      email,
      password: hashed,
    });

    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ error: "Registration failed", details: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    // SHORT-LIVED ACCESS TOKEN (1 hour)
    const accessToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // LONG-LIVED REFRESH TOKEN (30 days)
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "30d" }
    );

    return res.json({
      message: "Login successful",
      token: accessToken,
      refreshToken,
      user
    });

  } catch (err) {
    return res.status(500).json({
      error: "Login failed",
      details: err.message
    });
  }
};

export const refresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ error: "Missing refresh token" });

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { id: payload.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      token: newAccessToken
    });

  } catch (err) {
    return res.status(401).json({ error: "Invalid refresh token" });
  }
};
