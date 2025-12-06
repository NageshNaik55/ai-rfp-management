import db from "../config/db.js";
import { parseRFPText } from "../services/rfpAIService.js";

export async function createRFP(req, res) {
  console.log("log from inside createRFP func  =============> ");

  try {
    const { description, title } = req.body;
    const structured = await parseRFPText(description || "");
    const q = await db.query(
      `INSERT INTO rfps (title, structured_data) VALUES ($1,$2) RETURNING *`,
      [title || structured.title || "RFP", structured]
    );
    res.json(q.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

export async function listRFPs(req, res) {
  try {
    const q = await db.query("SELECT * FROM rfps ORDER BY created_at DESC");
    res.json(q.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getRFP(req, res) {
  try {
    const id = req.params.id;
    const q = await db.query("SELECT * FROM rfps WHERE id=$1", [id]);
    if (q.rows.length === 0)
      return res.status(404).json({ error: "not found" });
    res.json(q.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
