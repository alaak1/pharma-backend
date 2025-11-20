import express from "express";
import { refresh, register, login } from "../controllers/authcontroller.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

export default router;
