import mongoose from "mongoose";

const SenderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
  },
  { timestamps: true }
);

SenderSchema.index({ email: 1 }, { unique: true });

export default mongoose.model("Sender", SenderSchema);
