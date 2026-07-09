import { Router } from "express";
import { isAdmin } from "../middlewares/role.middleware";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { getStats } from "../controllers/stats.controller";

const router = Router();

router.get("/", isAuthenticated, isAdmin, getStats)

export default router