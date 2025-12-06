import express from "express";
import { listProposals, receiveProposal } from "../controllers/proposalController.js";
const router = express.Router();

router.get("/", listProposals);
// POST endpoint to simulate receiving an email (webhook)
router.post("/receive", receiveProposal);

export default router;
