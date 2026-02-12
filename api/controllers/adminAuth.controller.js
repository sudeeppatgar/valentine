import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
import { comparePassword, findUserByEmail } from "../services/auth.service.js";

export const adminLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }
    const admin = await findUserByEmail(email, true);
    if (!admin || admin.role !== "admin") {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const ok = await comparePassword(password, admin.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const secret = config.jwtSecret || "dev-secret";
    const token = jwt.sign(
      { role: "admin", email: admin.email, id: admin._id },
      secret,
      { expiresIn: config.jwtExpiresIn || "7d" }
    );
    return res.json({ token });
  } catch (error) {
    return next(error);
  }
};
