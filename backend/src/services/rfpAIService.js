/**
 * Minimal AI integration stub for RFP parsing.
 * In production, this calls OpenAI (or other LLM) to convert natural language into structured JSON.
 * Here we implement a simple heuristic parser and a fallback to return the original text.
 */
import OpenAI from "openai";

const OPENAI_KEY = process.env.OPENAI_KEY;

export async function parseRFPText(text){
  // If OPENAI_KEY is provided, call OpenAI. Otherwise, use a heuristic parser.
  if(OPENAI_KEY){
    try {
      const client = new OpenAI({ apiKey: OPENAI_KEY });
      const prompt = `Convert the procurement request into JSON with fields: title, budget, items (name, qty, specs), payment_terms, warranty, delivery_timeline. Request: ${text}`;
      const resp = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{role:"user", content: prompt}],
      });
      const content = resp.choices[0].message.content;
      return JSON.parse(content);
    } catch(e){
      console.error("OpenAI error", e.message);
    }
  }

  // Heuristic fallback: extract numbers and simple items.
  const budgetMatch = text.match(/\$?([0-9,]+)\s*(?:total)?/i);
  const budget = budgetMatch ? Number(budgetMatch[1].replace(/,/g,"")) : null;
  const items = [];
  const lines = text.split(/[\n\.]/).map(s=>s.trim()).filter(Boolean);
  for(const l of lines){
    const m = l.match(/(\d+)\s+(laptops?|monitors?|screens?|pcs?)/i);
    if(m){
      items.push({name: m[2], qty: Number(m[1]), specs: ""});
    }
  }
  return {
    title: lines[0] || "RFP",
    budget,
    items,
    payment_terms: text.includes("net 30") ? "Net 30" : "",
    warranty: text.match(/(\b\d+\s*year)/i)?.[0] || "",
    delivery_timeline: text.match(/(\d+\s*days)/i)?.[0] || ""
  };
}
