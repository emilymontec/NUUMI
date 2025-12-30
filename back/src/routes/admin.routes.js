import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, (_, res) => {
  res.json({ message: "Panel admin activo" });
});

export default router;
