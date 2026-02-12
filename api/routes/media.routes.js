import { Router } from "express";
import { uploadImageController } from "../controllers/media.controller.js";

const router = Router();

router.post("/upload", uploadImageController);

export default router;
