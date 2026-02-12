import Valentine from "../models/valentine.model.js";

export const listAllValentinesController = async (req, res, next) => {
  try {
    const valentines = await Valentine.find({}).sort({ createdAt: -1 });
    return res.json(valentines);
  } catch (error) {
    return next(error);
  }
};

export const updateValentineStatusController = async (req, res, next) => {
  try {
    const { status } = req.body || {};
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "status must be pending, approved, or rejected" });
    }
    const updated = await Valentine.findOneAndUpdate(
      { shareId: req.params.shareId },
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Valentine not found" });
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
};
