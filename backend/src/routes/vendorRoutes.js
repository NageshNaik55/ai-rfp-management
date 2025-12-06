import express from "express";
import { addVendor, listVendors } from "../controllers/vendorController.js";
const router = express.Router();

router.post("/", addVendor);
router.get("/", listVendors);

export default router;
