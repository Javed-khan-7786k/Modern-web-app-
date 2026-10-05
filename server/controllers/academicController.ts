import { Request, Response } from 'express';
import { AcademicService } from '../services/academicService.js';
import { attendanceMarkSchema, feePaymentSchema } from '../validators/joiSchemas.js';

export class AcademicController {
  // Attendance
  static getAttendance(req: Request, res: Response) {
    try {
      const { date, grade } = req.query as { date?: string; grade?: string };
      const records = AcademicService.getAttendance(date, grade);
      return res.status(200).json({
        success: true,
        data: records,
        meta: { total: records.length },
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  static markAttendance(req: Request, res: Response) {
    const { error, value } = attendanceMarkSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    try {
      const markedBy = (req.body.markedBy as string) || 'Prof. Marcus Vance';
      const result = AcademicService.markAttendance(value.records, markedBy);
      return res.status(200).json({
        success: true,
        message: `Attendance recorded for ${result.length} students`,
        data: result,
      });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  // Fees
  static getFees(req: Request, res: Response) {
    try {
      const { studentId } = req.query as { studentId?: string };
      const fees = AcademicService.getFees(studentId);
      return res.status(200).json({
        success: true,
        data: fees,
        meta: { total: fees.length },
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  static payFee(req: Request, res: Response) {
    const { error, value } = feePaymentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    try {
      const recordedBy = (req.body.recordedBy as string) || 'Nolan Hayes, CPA';
      const updatedFee = AcademicService.payFee(
        value.feeId,
        value.amount,
        value.paymentMethod,
        value.referenceNumber,
        value.ledgerId,
        recordedBy
      );

      return res.status(200).json({
        success: true,
        message: 'Payment processed and synced with general ledger',
        data: updatedFee,
      });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  // Exams
  static getExams(req: Request, res: Response) {
    try {
      const exams = AcademicService.getExams();
      return res.status(200).json({ success: true, data: exams });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  static getExamResults(req: Request, res: Response) {
    try {
      const { examId, studentId } = req.query as { examId?: string; studentId?: string };
      const results = AcademicService.getExamResults(examId, studentId);
      return res.status(200).json({ success: true, data: results });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  // Audit Logs
  static getAuditLogs(req: Request, res: Response) {
    try {
      const logs = AcademicService.getAuditLogs();
      return res.status(200).json({
        success: true,
        data: logs,
        meta: { total: logs.length },
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  // Overview
  static getOverview(req: Request, res: Response) {
    try {
      const overview = AcademicService.getOverview();
      return res.status(200).json({
        success: true,
        data: overview,
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
}
