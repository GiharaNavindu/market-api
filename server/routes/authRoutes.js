import express from "express";
import * as AuthController from "../controller/authController.js";
const router  = express.Router();

router.post("/login",AuthController.login);

export default router;