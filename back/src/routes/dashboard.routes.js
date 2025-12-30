import { Router } from "express";
import { getDashboardHome } from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/home", getDashboardHome);

export default router;
