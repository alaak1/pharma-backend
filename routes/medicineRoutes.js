import express from "express";
import { getAll, getById, create, update } from "../controllers/medicineController.js";

const router = express.Router();
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);

export default router;
