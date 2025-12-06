import React, { useState } from "react";
import axios from "axios";

export default function CreateRFPPage() {
  const [text, setText] = useState("");
  const [created, setCreated] = useState(null);
  const create = async () => {
    try {
      const res = await $http.post("/api/rfps", { description: text });
      setCreated(res.data);
    } catch (e) {
      alert("Error: " + (e.response?.data?.error || e.message));
    }
  };
  return (
    <div>
      <h2>Create RFP (natural language)</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        style={{ width: "100%" }}
        placeholder='E.g. "I need 20 laptops 16GB and 15 monitors 27-inch. Budget $50,000. Delivery within 30 days. Net 30 payment. 1 year warranty."'
      />
      <button onClick={create} style={{ marginTop: 10 }}>
        Create RFP
      </button>
      {created && (
        <div style={{ marginTop: 12, padding: 10, border: "1px solid #ccc" }}>
          <h3>Created RFP</h3>
          <pre>{JSON.stringify(created, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
