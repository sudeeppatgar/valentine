import { Router } from "express";
import { createValentineController, getValentineController, updateValentineController } from "../controllers/valentine.controller.js";

const router = Router();

router.post("/", createValentineController);
router.get("/:shareId", getValentineController);
router.put("/:shareId", updateValentineController);

export default router;
