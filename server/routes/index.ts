import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { LedgerController } from '../controllers/ledgerController.js';
import { StudentController } from '../controllers/studentController.js';
import { AcademicController } from '../controllers/academicController.js';
import { HealthController } from '../controllers/healthController.js';
import { db } from '../models/mockDb.js';

const router = Router();

// Health Check (Section 29)
router.get('/health', HealthController.getHealth);

// Authentication & Session
router.post('/auth/login', AuthController.login);
router.post('/auth/switch-role', AuthController.switchRole);
router.get('/auth/me', AuthController.getMe);

// Financial Ledger & Transactions (Section 4)
router.get('/ledgers', LedgerController.getLedgers);
router.post('/ledgers', LedgerController.createLedger);
router.get('/ledgers/summary', LedgerController.getFinancialSummary);
router.get('/ledgers/:id', LedgerController.getLedgerById);
router.get('/transactions', LedgerController.getTransactions);
router.post('/transactions', LedgerController.createTransaction);

// Students Information System (Section 5)
router.get('/students', StudentController.getStudents);
router.post('/students', StudentController.createStudent);
router.get('/students/:id', StudentController.getStudentById);

// Attendance Management
router.get('/attendance', AcademicController.getAttendance);
router.post('/attendance', AcademicController.markAttendance);

// Fees Management
router.get('/fees', AcademicController.getFees);
router.post('/fees/pay', AcademicController.payFee);

// Examination System
router.get('/exams', AcademicController.getExams);
router.get('/exams/results', AcademicController.getExamResults);

// Audit Logging
router.get('/audit-logs', AcademicController.getAuditLogs);

// System Overview & Analytics
router.get('/analytics/overview', AcademicController.getOverview);

// Teachers & Faculty
router.get('/teachers', (req, res) => {
  return res.json({ success: true, data: db.getTeachers() });
});

router.post('/teachers', (req, res) => {
  const teacher = db.createTeacher(req.body);
  return res.status(201).json({ success: true, data: teacher });
});

// Homework & Assignments
router.get('/homework', (req, res) => {
  const { grade, section } = req.query as { grade?: string; section?: string };
  return res.json({ success: true, data: db.getHomework(grade, section) });
});

router.post('/homework', (req, res) => {
  const hw = db.createHomework(req.body);
  return res.status(201).json({ success: true, data: hw });
});

// Notices & Bulletin Board
router.get('/notices', (req, res) => {
  return res.json({ success: true, data: db.getNotices() });
});

router.post('/notices', (req, res) => {
  const notice = db.createNotice(req.body);
  return res.status(201).json({ success: true, data: notice });
});

// Library
router.get('/library', (req, res) => {
  return res.json({ success: true, data: db.getLibraryBooks() });
});

router.post('/library/checkout', (req, res) => {
  try {
    const book = db.checkoutBook(req.body.bookId);
    return res.json({ success: true, data: book });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

// Fleet Transport
router.get('/transport', (req, res) => {
  return res.json({ success: true, data: db.getTransportRoutes() });
});

// Payroll & Compensation
router.get('/payroll', (req, res) => {
  return res.json({ success: true, data: db.getPayroll() });
});

router.post('/payroll/disburse', (req, res) => {
  try {
    const recordedBy = req.body.recordedBy || 'Nolan Hayes, CPA';
    const record = db.disbursePayroll(req.body.payrollId, recordedBy);
    return res.json({ success: true, data: record, message: 'Payroll disbursed and debited to General Ledger EXP-201' });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
