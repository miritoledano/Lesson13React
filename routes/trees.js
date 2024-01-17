import express from "express";
import {
  addTree,
  getAllTrees,
  getTreeById,
  deleteTree,
  updateById,
} from "../controllers/trees.js";

const router = express.Router();

router.get("/", getAllTrees);
router.get("/:id", getTreeById);
router.delete("/:id", deleteTree);
router.put("/:id", updateById);
router.post("/", addTree);

export default router;
