import rateLimit from "express-rate-limit";
import { AppError } from "../utils/AppError";

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 30,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56,
    handler: (request, response, next) => {
        next(new AppError("you riched to maximum limit", 429))
    }
})