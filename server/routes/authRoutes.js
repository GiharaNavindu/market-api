import express from "express";
import * as AuthController from "../controller/authController.js";
const router  = express.Router();

router.post("/login",AuthController.login);
router.post("/forgot-password", auth.forgotPassword);


export default router;