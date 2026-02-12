import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/payment.model.js";
import Valentine from "../models/valentine.model.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const generateId = () => {
  if (crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
};

export const createOrderController = async (req, res, next) => {
  try {
    const { amount, currency = "INR", userId } = req.body || {};
    if (!amount || !userId) {
      return res.status(400).json({ message: "amount and userId are required" });
    }
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ message: "Razorpay keys not configured" });
    }
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency,
      receipt: `valentine_${Date.now()}`,
    });
    await Payment.create({
      userId,
      amount,
      currency,
      orderId: order.id,
      status: "created",
    });
    return res.status(201).json({ orderId: order.id, amount, currency, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    return next(error);
  }
};

export const verifyPaymentAndCreateValentineController = async (req, res, next) => {
  try {
    const { orderId, paymentId, signature, userId, data } = req.body || {};
    if (!orderId || !paymentId || !signature || !userId || !data) {
      return res.status(400).json({ message: "orderId, paymentId, signature, userId, data are required" });
    }
    const requiredFields = ["senderName", "recipientName", "proposalMessage", "wishMessage", "loveLetterText"];
    for (const field of requiredFields) {
      if (!data[field]) {
        return res.status(400).json({ message: `Missing field: ${field}` });
      }
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) return res.status(500).json({ message: "Razorpay secret not configured" });

    const expected = crypto.createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
    if (expected !== signature) {
      await Payment.findOneAndUpdate({ orderId }, { status: "failed", paymentId, signature });
      return res.status(400).json({ message: "Payment verification failed" });
    }

    await Payment.findOneAndUpdate({ orderId }, { status: "paid", paymentId, signature });

    const shareId = generateId();
    const created = await Valentine.create({ ...data, userId, shareId });
    return res.status(201).json(created);
  } catch (error) {
    return next(error);
  }
};
