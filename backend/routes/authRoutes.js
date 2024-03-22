import express from "express";
import authController from "../controllers/authControllers.js";
import { requireSignIn, isAdmin, isUser, IsAdmin } from "../Middleware/authMiddleware.js";

//ROUTER OBJECT
const router = express.Router();

//USER REGISTER AND LOGIN
router.post("/register", authController.registerController)
router.post("/login", isUser, authController.loginController)
//ADMIN REGISTER AND LOGIN
router.post("/adminRegister", authController.registerController)
router.post("/adminLogin", isAdmin, authController.loginController)
//FORGET PASSWORD
router.post('/forget-password', authController.forgetPasswordController)

//PRIVATE ROUTES
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})
router.get("/admin-auth", requireSignIn, IsAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})

export default router;