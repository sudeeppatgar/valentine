import { Router } from "express";
import usersRoutes from "./users.routes.js";
import valentinesRoutes from "./valentines.routes.js";
import mediaRoutes from "./media.routes.js";
import adminRoutes from "./admin.routes.js";
const router = Router();

router.use("/users", usersRoutes);
router.use("/valentines", valentinesRoutes);
router.use("/media", mediaRoutes);
router.use("/admin", adminRoutes);

export default router;
