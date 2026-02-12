import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

/**
 * Hash a plain password
 */
export const hashPassword = async (plainPassword) => {
  if (!plainPassword) {
    throw new Error("Password is required for hashing");
  }
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
};

/**
 * Compare plain password with hashed password
 */
export const comparePassword = async (plainPassword, hashedPassword) => {
  if (!plainPassword || !hashedPassword) {
    return false;
  }

  return bcrypt.compare(plainPassword, hashedPassword);
};

import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

export const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn || "1w",
  });
};
