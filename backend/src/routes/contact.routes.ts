import { Router } from "express";
import { validateContactMessage, } from "../middlewares/validation.middleware";
import { sendContactMessage } from "../controllers/contact.controller";
import { limiter } from "../middlewares/ratelimit.middleware";

const router = Router();
router.post("/",limiter, validateContactMessage, sendContactMessage)
export default router