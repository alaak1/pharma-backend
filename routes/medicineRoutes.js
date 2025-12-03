import express from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from "../controllers/medicineController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();
router.get("/", authenticate, authorize("admin", "support", "regular"), getAll);
router.get("/:id", authenticate, authorize("admin", "support", "regular"), getById);
router.post("/", authenticate, authorize("admin", "regular"), create);
router.put("/:id", authenticate, authorize("admin", "regular"), update);
router.delete("/delete/:id", authenticate, authorize("admin", "regular"), remove);

export default router;
