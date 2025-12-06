import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import rfpRoutes from "./routes/rfpRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import proposalRoutes from "./routes/proposalRoutes.js";
import dotenv from "dotenv";
dotenv.config();
import { startImapListener } from "./services/emailService.js";

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/rfps", rfpRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/proposals", proposalRoutes);

// simple health
app.get("/api/health", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
  // start IMAP listener if configured (optional)
  try {
    startImapListener();
  } catch (e) {
    console.log(
      "IMAP listener not started (probably missing config) - OK for local dev."
    );
  }
});
