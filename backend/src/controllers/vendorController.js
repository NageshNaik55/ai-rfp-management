import db from "../config/db.js";

export async function addVendor(req,res){
  try{
    const {name,email,contact} = req.body;
    const q = await db.query(
      `INSERT INTO vendors (name,email,contact,meta) VALUES ($1,$2,$3,$4) RETURNING *`,
      [name,email,contact,{}]
    );
    res.json(q.rows[0]);
  } catch(err){
    res.status(500).json({error: err.message});
  }
}

export async function listVendors(req,res){
  try{
    const q = await db.query("SELECT * FROM vendors ORDER BY id DESC");
    res.json(q.rows);
  } catch(err){
    res.status(500).json({error: err.message});
  }
}
