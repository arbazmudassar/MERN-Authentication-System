import { Router } from "express";
import * as AuthController from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const AuthRouter = Router();

AuthRouter.post("/register", AuthController.Register);
AuthRouter.post("/login", AuthController.login);
AuthRouter.get("/logout", authMiddleware, AuthController.logout);
AuthRouter.get("/logout-all", authMiddleware, AuthController.logoutAll);
AuthRouter.get("/refresh-token", authMiddleware, AuthController.refreshToken);
AuthRouter.post("/verify-email", AuthController.verifyEmail);
AuthRouter.get("/otp-send", AuthController.sendVerificationOTP);
AuthRouter.get("/me", AuthController.getMe);
AuthRouter.post("/forgot-password",AuthController.sendForgotPasswordOTP);
AuthRouter.post("/verify-forgot-password-otp",AuthController.verifyForgotPasswordOTP);
AuthRouter.post("/reset-password",AuthController.resetPassword);

export default AuthRouter;