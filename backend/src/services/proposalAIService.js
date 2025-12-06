/**
 * Minimal AI proposal parser. If OPENAI_KEY present, uses LLM; otherwise heuristics.
 */
import OpenAI from "openai";
const OPENAI_KEY = process.env.OPENAI_KEY;

export async function parseVendorProposal(emailText){
  if(OPENAI_KEY){
    try {
      const client = new OpenAI({ apiKey: OPENAI_KEY });
      const prompt = `Extract proposal details (price, items[], delivery_timeline, warranty, payment_terms). Respond JSON. Email: ${emailText}`;
      const resp = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{role:"user", content: prompt}],
      });
      return JSON.parse(resp.choices[0].message.content);
    } catch(e){
      console.error("OpenAI error", e.message);
    }
  }
  // Heuristic fallback
  const priceMatch = emailText.match(/\$\s*([0-9,\.]+)/);
  const price = priceMatch ? Number(priceMatch[1].replace(/,/g,"")) : null;
  return {
    price,
    items: [],
    delivery_timeline: (emailText.match(/within\s*(\d+)\s*days/i)?.[1]||""),
    warranty: emailText.match(/(\d+\s*year)/i)?.[0] || "",
    payment_terms: emailText.includes("net 30") ? "Net 30" : "",
    summary: emailText.slice(0,300)
  };
}
