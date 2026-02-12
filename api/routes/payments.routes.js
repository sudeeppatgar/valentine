import { Router } from "express";
import { createOrderController, verifyPaymentAndCreateValentineController } from "../controllers/payment.controller.js";

const router = Router();

router.post("/order", createOrderController);
router.post("/verify", verifyPaymentAndCreateValentineController);

export default router;
