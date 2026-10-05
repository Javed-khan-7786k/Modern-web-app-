import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { LedgerController } from '../controllers/ledgerController.js';
import { StudentController } from '../controllers/studentController.js';
import { AcademicController } from '../controllers/academicController.js';
import { HealthController } from '../controllers/healthController.js';

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

export default router;
