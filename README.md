# AI-Powered RFP Management

This repository is a minimal, demo-ready implementation of the **AI-Powered RFP Management System** required by the SDE assignment. It contains:

- `backend/` — Node.js + Express backend with endpoints for RFPs, vendors, and proposals.
- `frontend/` — React (Vite) demo UI that can create RFPs, manage vendors, and view proposals.
- `docker-compose.yml` — to run PostgreSQL, backend, and frontend together.
- `.env.example` — environment variables.

### .env file

DB_HOST=db
DB_USER=postgres
DB_PASS=password
DB_NAME=rfps
DB_PORT=5432

OPENAI_KEY=add_your_openAI_key

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
MAIL_USER=add_your_email_id
MAIL_PASS=add_your_password

IMAP_HOST=imap.gmail.com
IMAP_PORT=993

### Option A — Docker (recommended)

1. Add `.env` file inside backend folder
2. `docker-compose up --build`
3. Backend: http://localhost:4000
4. Frontend: http://localhost:5173

### Option B — Run locally without Docker

1. Add `.env` file inside backend folder.
2. `npm run dev` - it will run both frontend and backend.
