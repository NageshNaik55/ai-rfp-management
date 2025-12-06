import db from "../config/db.js";
import { parseVendorProposal } from "../services/proposalAIService.js";

export async function listProposals(req,res){
  try{
    const q = await db.query("SELECT * FROM proposals ORDER BY created_at DESC");
    res.json(q.rows);
  } catch(err){
    res.status(500).json({error: err.message});
  }
}

// simulate receiving a vendor email body via webhook for demo
export async function receiveProposal(req,res){
  try{
    const { rfpid, vendor_email, body } = req.body;
    const parsed = await parseVendorProposal(body || "");
    const q = await db.query(
      `INSERT INTO proposals (rfp_id, vendor_email, raw_email_text, parsed_data, ai_summary, score)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [rfpid, vendor_email, body, parsed, parsed.summary || "", parsed.score || null]
    );
    res.json(q.rows[0]);
  } catch(err){
    console.error(err);
    res.status(500).json({error: err.message});
  }
}
