import express from "express";
import { createRFP, listRFPs, getRFP } from "../controllers/rfpController.js";
const router = express.Router();

router.post("/", createRFP);
router.get("/", listRFPs);
router.get("/:id", getRFP);

export default router;
