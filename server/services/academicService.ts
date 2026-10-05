import { db } from '../models/mockDb.js';

export class AcademicService {
  // Attendance
  static getAttendance(date?: string, grade?: string) {
    return db.getAttendance(date, grade);
  }

  static markAttendance(records: { studentId: string; date: string; status: any; remarks?: string }[], markedBy: string) {
    return db.markAttendance(records, markedBy);
  }

  // Fees
  static getFees(studentId?: string) {
    return db.getFees(studentId);
  }

  static payFee(feeId: string, amount: number, paymentMethod: any, referenceNumber: string, ledgerId: string, recordedBy: string) {
    return db.payFee(feeId, amount, paymentMethod, referenceNumber, ledgerId, recordedBy);
  }

  // Exams & Results
  static getExams() {
    return db.getExams();
  }

  static getExamResults(examId?: string, studentId?: string) {
    return db.getExamResults(examId, studentId);
  }

  // Audit Logs
  static getAuditLogs() {
    return db.getAuditLogs();
  }

  // Analytics Overview
  static getOverview() {
    return db.getAnalyticsOverview();
  }
}
