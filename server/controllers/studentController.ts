import { Request, Response } from 'express';
import { StudentService } from '../services/studentService.js';
import { studentCreateSchema } from '../validators/joiSchemas.js';

export class StudentController {
  static getStudents(req: Request, res: Response) {
    try {
      const { grade, search } = req.query as { grade?: string; search?: string };
      const students = StudentService.getStudents({ grade, search });
      return res.status(200).json({
        success: true,
        data: students,
        meta: { total: students.length },
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: err.message || 'Error retrieving students',
      });
    }
  }

  static getStudentById(req: Request, res: Response) {
    try {
      const studentDetails = StudentService.getStudentById(req.params.id);
      return res.status(200).json({
        success: true,
        data: studentDetails,
      });
    } catch (err: any) {
      return res.status(404).json({
        success: false,
        message: err.message,
      });
    }
  }

  static createStudent(req: Request, res: Response) {
    const { error, value } = studentCreateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        errors: error.details,
      });
    }

    try {
      const newStudent = StudentService.createStudent(value);
      return res.status(201).json({
        success: true,
        message: `Student ${newStudent.firstName} ${newStudent.lastName} registered successfully`,
        data: newStudent,
      });
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
}
