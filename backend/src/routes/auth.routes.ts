import { Router } from "express";
import { forgotPassword, getMe, login, register, resetPassword, verifyResetPasswordToken } from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { validateForgotPassword, validateLogin, validateRegister, validateResetPassword } from "../middlewares/validation.middleware";
import { limiter } from "../middlewares/ratelimit.middleware";
const router = Router()

router.post("/register", limiter, validateRegister, register)
router.post("/login", limiter, validateLogin, login)
router.post("/forgot-password", validateForgotPassword, forgotPassword)
router.get("/verify-reset-token/:token", verifyResetPasswordToken)
router.post("/reset-password", validateResetPassword, resetPassword)
router.get("/me", isAuthenticated, getMe)
export default router