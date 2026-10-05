export type UserRole = 
  | 'super_admin' 
  | 'school_admin' 
  | 'teacher' 
  | 'student' 
  | 'parent' 
  | 'accountant';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  schoolId: string;
  department?: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
}

export interface School {
  id: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  email: string;
  academicYear: string;
  currency: string;
  studentCount: number;
  status: 'active' | 'suspended';
}

export type LedgerType = 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';

export interface Ledger {
  id: string;
  schoolId: string;
  name: string;
  code: string;
  type: LedgerType;
  description: string;
  openingBalance: number;
  currentBalance: number;
  status: 'active' | 'archived';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type TransactionType = 'income' | 'expense' | 'transfer' | 'adjustment';
export type PaymentMethod = 'bank_transfer' | 'cash' | 'credit_card' | 'cheque' | 'online_gateway';

export interface LedgerTransaction {
  id: string;
  schoolId: string;
  ledgerId: string;
  ledgerName: string;
  type: TransactionType;
  amount: number;
  date: string;
  category: string;
  paymentMethod: PaymentMethod;
  referenceNumber: string;
  description: string;
  balanceAfter: number;
  createdBy: string;
  createdAt: string;
}

export interface Student {
  id: string;
  schoolId: string;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  grade: string;
  section: string;
  rollNumber: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  address: string;
  status: 'enrolled' | 'inactive' | 'graduated' | 'suspended';
  attendanceRate: number;
  feeStatus: 'paid' | 'partial' | 'pending' | 'overdue';
  avatarUrl?: string;
  createdAt: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface AttendanceRecord {
  id: string;
  schoolId: string;
  studentId: string;
  studentName: string;
  grade: string;
  section: string;
  date: string;
  status: AttendanceStatus;
  remarks?: string;
  markedBy: string;
  timestamp: string;
}

export interface FeeInvoice {
  id: string;
  schoolId: string;
  studentId: string;
  studentName: string;
  grade: string;
  title: string;
  amount: number;
  paidAmount: number;
  dueAmount: number;
  dueDate: string;
  status: 'paid' | 'partial' | 'pending' | 'overdue';
  ledgerId: string;
  paymentDate?: string;
  paymentMethod?: PaymentMethod;
  receiptNumber?: string;
  createdAt: string;
}

export interface Exam {
  id: string;
  schoolId: string;
  title: string;
  term: string;
  academicYear: string;
  startDate: string;
  endDate: string;
  grade: string;
  status: 'scheduled' | 'in_progress' | 'grading' | 'published';
  subjects: {
    subjectName: string;
    totalMarks: number;
    passMarks: number;
    date: string;
  }[];
}

export interface ExamResult {
  id: string;
  schoolId: string;
  examId: string;
  examTitle: string;
  studentId: string;
  studentName: string;
  grade: string;
  section: string;
  marks: {
    subjectName: string;
    obtainedMarks: number;
    totalMarks: number;
    grade: string;
  }[];
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  overallGrade: string;
  rank?: number;
  published: boolean;
}

export interface AuditLog {
  id: string;
  schoolId: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'PAYMENT' | 'EXPORT';
  resource: string;
  resourceId: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

export interface AnalyticsOverview {
  totalStudents: number;
  totalTeachers: number;
  attendanceToday: {
    percentage: number;
    present: number;
    totalTracked: number;
  };
  pendingFees: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  netSurplus: number;
  upcomingExamsCount: number;
  upcomingExams: Exam[];
  recentActivities: AuditLog[];
}

export interface Teacher {
  id: string;
  schoolId: string;
  employeeCode: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  assignedClasses: string[];
  assignedSubjects: string[];
  salary: number;
  status: 'active' | 'on_leave';
  joinedDate: string;
}

export interface Homework {
  id: string;
  schoolId: string;
  grade: string;
  section: string;
  subject: string;
  title: string;
  description: string;
  assignedBy: string;
  dueDate: string;
  submissionsCount: number;
  totalStudents: number;
  createdAt: string;
}

export interface Notice {
  id: string;
  schoolId: string;
  title: string;
  content: string;
  category: 'academic' | 'administrative' | 'sports' | 'urgent';
  targetAudience: 'all' | 'teachers' | 'students' | 'parents';
  author: string;
  date: string;
  pinned: boolean;
}

export interface LibraryBook {
  id: string;
  schoolId: string;
  isbn: string;
  title: string;
  author: string;
  category: string;
  shelfLocation: string;
  totalCopies: number;
  availableCopies: number;
  status: 'available' | 'reserved' | 'borrowed';
}

export interface TransportRoute {
  id: string;
  schoolId: string;
  routeNumber: string;
  routeName: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  capacity: number;
  assignedStudentsCount: number;
  stops: string[];
  status: 'on_schedule' | 'delayed' | 'maintenance';
}

export interface PayrollRecord {
  id: string;
  schoolId: string;
  employeeId: string;
  employeeName: string;
  designation: string;
  department: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netPayable: number;
  paymentMethod: PaymentMethod;
  status: 'paid' | 'pending';
  paidDate?: string;
  voucherNumber?: string;
}

export type DashboardView = 
  | 'overview' 
  | 'ledgers' 
  | 'students' 
  | 'teachers'
  | 'attendance' 
  | 'fees' 
  | 'payroll'
  | 'exams' 
  | 'homework'
  | 'timetable' 
  | 'notices'
  | 'library'
  | 'transport'
  | 'audit_logs' 
  | 'settings';

