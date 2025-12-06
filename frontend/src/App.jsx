import React from "react";
import CreateRFPPage from "./pages/CreateRFPPage";
import VendorsPage from "./pages/VendorsPage";
import ProposalsPage from "./pages/ProposalsPage";

export default function App() {
  return (
    <div style={{ fontFamily: "system-ui", padding: 20 }}>
      <h1>AI RFP Management</h1>
      <div style={{ display: "flex", gap: 20 }}>
        <div
          style={{ flex: 1, borderRight: "1px solid #ddd", paddingRight: 20 }}
        >
          <CreateRFPPage />
        </div>
        <div style={{ width: 380 }}>
          <VendorsPage />
          <ProposalsPage />
        </div>
      </div>
    </div>
  );
}
