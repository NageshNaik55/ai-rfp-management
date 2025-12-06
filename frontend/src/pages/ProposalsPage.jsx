import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProposalsPage() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProposals();
  }, []);

  async function fetchProposals() {
    try {
      const r = await $http.get("/api/proposals");
      // Ensure we always have an array
      const proposalsArray = Array.isArray(r.data)
        ? r.data
        : r.data.proposals || [];
      setProposals(proposalsArray);
    } catch (err) {
      console.error("Error fetching proposals", err);
      setProposals([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Loading proposals...</p>;
  if (proposals.length === 0) return <p>No proposals found.</p>;

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Proposals</h3>
      <ul>
        {proposals.map((p) => (
          <li key={p.id}>
            {p.vendor_email} —{" "}
            {p.ai_summary?.slice(0, 80) || p.raw_email_text?.slice(0, 80)}
          </li>
        ))}
      </ul>
    </div>
  );
}
