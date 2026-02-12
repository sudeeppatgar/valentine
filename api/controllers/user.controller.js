import Sender from "../models/sender.model.js";
import Valentine from "../models/valentine.model.js";

export const createUserController = async (req, res, next) => {
  try {
    const { name, email } = req.body || {};
    if (!name || !email) {
      return res.status(400).json({ message: "name and email are required" });
    }
    const existing = await Sender.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(200).json(existing);
    const user = await Sender.create({ name, email });
    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
};

export const getUserController = async (req, res, next) => {
  try {
    const user = await Sender.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (error) {
    return next(error);
  }
};

export const listUserValentinesController = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const valentines = await Valentine.find({ userId }).sort({ createdAt: -1 });
    return res.json(valentines);
  } catch (error) {
    return next(error);
  }
};
