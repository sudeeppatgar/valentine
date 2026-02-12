import Valentine from "../models/valentine.model.js";
import crypto from "crypto";

const generateId = () => {
  if (crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
};

export const createValentineController = async (req, res, next) => {
  try {
    const { userId, data } = req.body || {};
    if (!userId || !data) {
      return res.status(400).json({ message: "userId and data are required" });
    }
    const shareId = generateId();
    const created = await Valentine.create({ ...data, userId, shareId, status: "pending" });
    return res.status(201).json(created);
  } catch (error) {
    return next(error);
  }
};

export const getValentineController = async (req, res, next) => {
  try {
    const valentine = await Valentine.findOne({ shareId: req.params.shareId });
    if (!valentine) return res.status(404).json({ message: "Valentine not found" });
    if (valentine.status && valentine.status !== "approved") {
      return res.status(403).json({ message: "Valentine pending approval" });
    }
    return res.json(valentine);
  } catch (error) {
    return next(error);
  }
};

export const updateValentineController = async (req, res, next) => {
  try {
    const updated = await Valentine.findOneAndUpdate(
      { shareId: req.params.shareId },
      { ...req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Valentine not found" });
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
};
