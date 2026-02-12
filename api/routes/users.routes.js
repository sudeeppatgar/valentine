import { Router } from "express";
import { createUserController, getUserController, listUserValentinesController } from "../controllers/user.controller.js";

const router = Router();

router.post("/", createUserController);
router.get("/:userId", getUserController);
router.get("/:userId/valentines", listUserValentinesController);

export default router;
