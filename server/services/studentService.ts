import { db } from '../models/mockDb.js';
import { Student } from '../types/index.js';

export class StudentService {
  static getStudents(query?: { grade?: string; search?: string }) {
    let list = db.getStudents();
    if (query?.grade && query.grade !== 'all') {
      list = list.filter(s => s.grade.toLowerCase() === query.grade?.toLowerCase());
    }
    if (query?.search) {
      const q = query.search.toLowerCase();
      list = list.filter(
        s =>
          s.firstName.toLowerCase().includes(q) ||
          s.lastName.toLowerCase().includes(q) ||
          s.admissionNumber.toLowerCase().includes(q) ||
          s.rollNumber.toLowerCase().includes(q)
      );
    }
    return list;
  }

  static getStudentById(id: string) {
    const student = db.getStudentById(id);
    if (!student) throw new Error('Student not found');
    const attendance = db.getAttendance(undefined, student.grade).filter(a => a.studentId === student.id);
    const fees = db.getFees(student.id);
    const examResults = db.getExamResults(undefined, student.id);
    return { student, attendance, fees, examResults };
  }

  static createStudent(data: Parameters<typeof db.createStudent>[0]) {
    return db.createStudent(data);
  }
}
