# Aethel School OS – Enterprise School Management & Financial Accounting Platform

An ultra-modern, enterprise-grade School Management System and Multi-Ledger Accounting platform built with the "Great White" aesthetic, Apple/Linear-level visual polish, server-authoritative double-entry bookkeeping, and full Role-Based Access Control (RBAC).

---

## 1. System Overview

Aethel School OS replaces disparate spreadsheets and outdated legacy ERPs with a unified, high-performance operating system designed for K-12 academies, independent schools, and multi-campus districts.

### Key Capabilities
- **Multi-Ledger Double-Entry Financial Accounting**: Dedicated cost-center ledgers (Tuition, Faculty Payroll, Electricity & Grid Power, Fleet Transit, STEM Labs, Campus Maintenance) with server-side debit/credit calculation and running balances.
- **Student Information System (SIS)**: Complete scholar lifecycle management, cohort balancing, guardian dossiers, and student transcripts.
- **Classroom Roll Call & Attendance**: Real-time attendance register supporting Present, Late, Absent, and Excused status with automated audit logs.
- **Bursar Desk & Fee Invoicing**: Multi-tier fee schedules, payment capture (ACH, Card, Cheque, Cash), and immediate synchronization with general ledgers.
- **Examinations & Scorecards**: Proctored assessment scheduling, subject markbooks, grading curves, rank generation, and printable official transcripts.
- **Role-Based Access Control (RBAC)**: 6 distinct interfaces: Super Admin, School Principal, Teacher, Student, Parent, and Accountant.
- **Immutable Forensic Audit Trail**: Cryptographic audit log capturing user ID, role, sensitive action, resource, IP address, and timestamp.
- **Technical SEO, AEO & GEO**: Schema.org JSON-LD structured data (`SoftwareApplication`, `EducationalOrganization`, `FAQPage`), OpenGraph tags, and semantic question-answer content.

---

## 2. Architecture & Tech Stack

```
├── server/
│   ├── config/              # Runtime & environment configurations
│   ├── controllers/         # HTTP request/response handlers
│   ├── middleware/          # JWT auth, role validation & request logging
│   ├── models/              # Mongoose-compatible document store & aggregations
│   ├── routes/              # RESTful API endpoints (/api/v1/*)
│   ├── services/            # Pure business logic & financial calculation
│   ├── types/               # Server-side TypeScript interfaces & enums
│   └── validators/          # Authoritative Joi validation schemas
├── src/
│   ├── components/
│   │   ├── common/          # Button, Modal, Badge, EmptyState, Skeleton, etc.
│   │   ├── dashboard/       # Overview, Ledgers, Students, Attendance, Fees, etc.
│   │   ├── landing/         # 18-section Great White landing page & feature showcases
│   │   └── layout/          # TopBar contract, Sidebar, Navigation
│   ├── services/            # Typesafe frontend API client
│   ├── types/               # Client-side domain types
│   ├── App.tsx              # Root controller & state coordinator
│   └── index.css            # Tailwind CSS v4 & custom typography
├── server.ts                # Express entrypoint mounting Vite middleware
├── index.html               # Semantic HTML5 entry with Schema.org JSON-LD
└── metadata.json            # Application registry & capabilities
```

### Stack Details
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion, Plus Jakarta Sans, JetBrains Mono (tabular figures).
- **Backend**: Node.js, Express.js, TypeScript, Joi Validation, Mongoose-compatible document store, JWT authentication.
- **Runtime**: Express full-stack running on port 3000 with dev Vite middlewares.

---

## 3. Database ER & Data Relationships

```
School (1) ────< User (N)
School (1) ────< Student (N)
School (1) ────< Ledger (N) ────< LedgerTransaction (N)
School (1) ────< FeeInvoice (N) ───[syncs with]───> LedgerTransaction (1)
School (1) ────< Exam (N) ────< ExamResult (N)
School (1) ────< AttendanceRecord (N)
School (1) ────< AuditLog (N)
```

---

## 4. RESTful API Endpoints

All endpoints are versioned under `/api/v1` and return standardized responses:
```json
{
  "success": true,
  "message": "...",
  "data": {},
  "meta": {}
}
```

### Core Routes
- `GET /api/v1/health` – Returns service health, uptime, memory, and database status.
- `POST /api/v1/auth/login` – Authenticates user credentials and generates JWT token.
- `POST /api/v1/auth/switch-role` – Instant role switching for RBAC testing.
- `GET /api/v1/ledgers` – Retrieves all general ledgers.
- `POST /api/v1/ledgers` – Creates a new cost center ledger (Joi-validated).
- `GET /api/v1/ledgers/:id` – Fetches ledger details and associated transactions.
- `GET /api/v1/transactions` – Queries transactions with optional `ledgerId` filter.
- `POST /api/v1/transactions` – Records a debit or credit entry with server-side balance recalculation.
- `GET /api/v1/students` – Lists enrolled scholars with grade and keyword search.
- `POST /api/v1/students` – Enrolls a new student and generates admission credentials.
- `GET /api/v1/attendance` – Retrieves roll call records for a given date and cohort.
- `POST /api/v1/attendance` – Batch-marks attendance (Present, Late, Absent, Excused).
- `GET /api/v1/fees` – Retrieves fee invoices and arrears.
- `POST /api/v1/fees/pay` – Records fee collection, updates invoice status, and posts an income transaction to the selected ledger.
- `GET /api/v1/exams` – Retrieves assessment terms and subject schedules.
- `GET /api/v1/exams/results` – Queries official report cards and transcript rankings.
- `GET /api/v1/audit-logs` – Streams immutable forensic compliance logs.
- `GET /api/v1/analytics/overview` – Returns aggregated executive KPIs.

---

## 5. Getting Started

### Development
```bash
# Run server with hot Vite middleware:
npm run dev

# Lint & type check:
npm run lint

# Production build:
npm run build
```

---

## 6. Security & Audit Logging
Every sensitive mutation (ledger creation, voucher posting, student enrollment, grade publishing, and attendance marking) automatically generates an immutable audit record containing:
- Staff User ID & Full Name
- Role & Permissions
- Action (CREATE, UPDATE, PAYMENT, LOGIN)
- Resource & Resource ID
- Descriptive Audit Details
- Origin IP Address
- ISO 8601 UTC Timestamp
