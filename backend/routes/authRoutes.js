import express from "express";
import authController from "../controllers/authControllers.js";
import { requireSignIn, isAdmin } from "../Middleware/authMiddleware.js";
//router object
const router = express.Router();

//REGISTER || METHOD POST
router.post("/register", authController.registerController)
router.post("/login", authController.loginController)
// private routes
router.get("/dashboard", requireSignIn)
export default router;