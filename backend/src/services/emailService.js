/**
 * Email sending (SMTP) and receiving (IMAP) helpers.
 * For local/demo use the /api/proposals/receive endpoint to simulate incoming vendor emails.
 * This file wires up nodemailer and a basic IMAP listener if IMAP configuration is present.
 */
import nodemailer from "nodemailer";
import { simpleParser } from "mailparser";
import Imap from "imap";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.example.com",
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.MAIL_USER || "",
    pass: process.env.MAIL_PASS || "",
  },
});

export async function sendRFPEmail(vendor, rfp) {
  const mail = {
    from: process.env.MAIL_USER,
    to: vendor.email,
    subject: `RFP Invitation: ${rfp.title || "RFP"}`,
    html: `<p>Dear ${vendor.name || vendor.email},</p>
    <p>Please see the RFP below:</p>
    <pre>${JSON.stringify(rfp.structured_data || rfp, null, 2)}</pre>
    <p>Reply with your proposal to this email.</p>`,
  };
  return transporter.sendMail(mail);
}

// Optional IMAP listener (requires IMAP env vars)
export function startImapListener() {
  try {
    const imapConfig = {
      user: process.env.MAIL_USER,
      password: process.env.MAIL_PASS,
      host: process.env.IMAP_HOST,
      port: Number(process.env.IMAP_PORT || 993),
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
    };
    if (!imapConfig.user) throw new Error("No MAIL_USER configured");
    const imap = new Imap(imapConfig);
    imap.once("ready", function () {
      imap.openBox("INBOX", false, function (err, box) {
        if (err) throw err;
        imap.on("mail", function () {
          // For simplicity: fetch unseen messages and parse.
          const f = imap.seq.fetch("1:*", { bodies: "" });
          f.on("message", function (msg) {
            msg.on("body", async function (stream) {
              const parsed = await simpleParser(stream);
              console.log("IMAP received mail from", parsed.from?.text);
              // In production, call parseVendorProposal and save to DB.
            });
          });
        });
      });
    });
    imap.connect();
  } catch (error) {
    console.log("Error starting IMAP listener", error);
  }
}
