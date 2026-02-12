import { Router } from "express";
import { listAllValentinesController, updateValentineStatusController } from "../controllers/admin.controller.js";
import { adminLoginController } from "../controllers/adminAuth.controller.js";
import { requireAdmin } from "../middleware/adminAuth.middleware.js";

const router = Router();

router.post("/login", adminLoginController);
router.get("/valentines", requireAdmin, listAllValentinesController);
router.patch("/valentines/:shareId", requireAdmin, updateValentineStatusController);

export default router;
