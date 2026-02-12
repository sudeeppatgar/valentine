import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    orderId: { type: String, required: true },
    paymentId: { type: String },
    signature: { type: String },
    status: { type: String, enum: ["created", "paid", "failed"], default: "created" },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
