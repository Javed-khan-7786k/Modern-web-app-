import { 
  User, 
  School, 
  Ledger, 
  LedgerTransaction, 
  Student, 
  AttendanceRecord, 
  FeeInvoice, 
  Exam, 
  ExamResult, 
  AuditLog,
  UserRole
} from '../types/index.js';

export interface DatabaseState {
  schools: School[];
  users: User[];
  ledgers: Ledger[];
  transactions: LedgerTransaction[];
  students: Student[];
  attendance: AttendanceRecord[];
  fees: FeeInvoice[];
  exams: Exam[];
  examResults: ExamResult[];
  auditLogs: AuditLog[];
}

const DEFAULT_SCHOOL_ID = 'sch_aethel_01';

// Initial Seed Data
const initialSchools: School[] = [
  {
    id: DEFAULT_SCHOOL_ID,
    name: 'Aethel Academy of Science & Arts',
    code: 'AETHEL-01',
    address: '450 University Crest Ave, Cambridge, MA 02138',
    phone: '+1 (617) 890-4421',
    email: 'admissions@aethelacademy.edu',
    academicYear: '2026-2027',
    currency: 'USD',
    studentCount: 1420,
    status: 'active',
  },
];

const initialUsers: User[] = [
  {
    id: 'usr_super_01',
    name: 'Dr. Arthur Sterling',
    email: 'superadmin@aethel.edu',
    role: 'super_admin',
    schoolId: DEFAULT_SCHOOL_ID,
    department: 'Chancellor Office',
    phone: '+1 (617) 555-0100',
    isActive: true,
    createdAt: '2026-01-15T08:00:00.000Z',
  },
  {
    id: 'usr_admin_01',
    name: 'Elena Rostova, M.Ed.',
    email: 'principal@aethel.edu',
    role: 'school_admin',
    schoolId: DEFAULT_SCHOOL_ID,
    department: 'Headmaster Administration',
    phone: '+1 (617) 555-0101',
    isActive: true,
    createdAt: '2026-01-15T08:30:00.000Z',
  },
  {
    id: 'usr_teacher_01',
    name: 'Prof. Marcus Vance',
    email: 'marcus.vance@aethel.edu',
    role: 'teacher',
    schoolId: DEFAULT_SCHOOL_ID,
    department: 'Natural Sciences & AP Physics',
    phone: '+1 (617) 555-0102',
    isActive: true,
    createdAt: '2026-02-01T09:00:00.000Z',
  },
  {
    id: 'usr_student_01',
    name: 'Sophia Thorne',
    email: 'sophia.thorne@student.aethel.edu',
    role: 'student',
    schoolId: DEFAULT_SCHOOL_ID,
    department: 'Grade 11 - Section A',
    phone: '+1 (617) 555-0103',
    isActive: true,
    createdAt: '2026-08-10T10:00:00.000Z',
  },
  {
    id: 'usr_parent_01',
    name: 'David & Catherine Thorne',
    email: 'thorne.family@guardian.edu',
    role: 'parent',
    schoolId: DEFAULT_SCHOOL_ID,
    department: 'Parent Association Council',
    phone: '+1 (617) 555-0104',
    isActive: true,
    createdAt: '2026-08-10T10:30:00.000Z',
  },
  {
    id: 'usr_accountant_01',
    name: 'Nolan Hayes, CPA',
    email: 'finance@aethel.edu',
    role: 'accountant',
    schoolId: DEFAULT_SCHOOL_ID,
    department: 'Treasury & Comptroller Office',
    phone: '+1 (617) 555-0105',
    isActive: true,
    createdAt: '2026-01-20T11:00:00.000Z',
  },
];

const initialLedgers: Ledger[] = [
  {
    id: 'led_tuition_01',
    schoolId: DEFAULT_SCHOOL_ID,
    name: 'Academic Tuition & Admissions',
    code: 'REV-101',
    type: 'revenue',
    description: 'Quarterly and annual core academic enrollment tuition fees',
    openingBalance: 450000.00,
    currentBalance: 894500.00,
    status: 'active',
    createdBy: 'Nolan Hayes, CPA',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-10-01T14:30:00.000Z',
  },
  {
    id: 'led_salary_02',
    schoolId: DEFAULT_SCHOOL_ID,
    name: 'Faculty & Staff Payroll',
    code: 'EXP-201',
    type: 'expense',
    description: 'Monthly compensation, benefits, and adjunct instructional stipends',
    openingBalance: 0.00,
    currentBalance: 312400.00,
    status: 'active',
    createdBy: 'Nolan Hayes, CPA',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-10-01T10:00:00.000Z',
  },
  {
    id: 'led_elec_03',
    schoolId: DEFAULT_SCHOOL_ID,
    name: 'School Electricity & Grid Power',
    code: 'EXP-301',
    type: 'expense',
    description: 'Campus HVAC, laboratory power supply, and athletic stadium illumination',
    openingBalance: 0.00,
    currentBalance: 24850.00,
    status: 'active',
    createdBy: 'Nolan Hayes, CPA',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-09-28T16:15:00.000Z',
  },
  {
    id: 'led_transport_04',
    schoolId: DEFAULT_SCHOOL_ID,
    name: 'Student Transit & Fleet Logistics',
    code: 'EXP-401',
    type: 'expense',
    description: 'Electric bus fleet maintenance, route fuel, and transit operator contracts',
    openingBalance: 0.00,
    currentBalance: 38200.00,
    status: 'active',
    createdBy: 'Nolan Hayes, CPA',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-10-02T11:45:00.000Z',
  },
  {
    id: 'led_stationery_05',
    schoolId: DEFAULT_SCHOOL_ID,
    name: 'Laboratory Equipment & Stationery',
    code: 'EXP-501',
    type: 'expense',
    description: 'STEM consumables, AP chemistry supplies, robotics components, and testing papers',
    openingBalance: 0.00,
    currentBalance: 16400.00,
    status: 'active',
    createdBy: 'Nolan Hayes, CPA',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-09-25T09:20:00.000Z',
  },
  {
    id: 'led_maintenance_06',
    schoolId: DEFAULT_SCHOOL_ID,
    name: 'Campus Facilities & Maintenance',
    code: 'EXP-601',
    type: 'expense',
    description: 'Building envelope repairs, custodial sanitization, plumbing, and landscape care',
    openingBalance: 0.00,
    currentBalance: 29150.00,
    status: 'active',
    createdBy: 'Nolan Hayes, CPA',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-09-30T13:00:00.000Z',
  },
  {
    id: 'led_rent_07',
    schoolId: DEFAULT_SCHOOL_ID,
    name: 'Athletic Field & Auditorium Lease',
    code: 'EXP-701',
    type: 'expense',
    description: 'Olympic swimming pavilion and equestrian center municipal land lease',
    openingBalance: 0.00,
    currentBalance: 45000.00,
    status: 'active',
    createdBy: 'Nolan Hayes, CPA',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-09-15T08:00:00.000Z',
  },
  {
    id: 'led_other_08',
    schoolId: DEFAULT_SCHOOL_ID,
    name: 'Contingency & Miscellaneous Operations',
    code: 'EXP-801',
    type: 'expense',
    description: 'Incidental accreditation fees, student symposium guest travel, and legal compliance',
    openingBalance: 0.00,
    currentBalance: 11200.00,
    status: 'active',
    createdBy: 'Nolan Hayes, CPA',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-10-03T15:20:00.000Z',
  },
];

const initialTransactions: LedgerTransaction[] = [
  {
    id: 'tx_001',
    schoolId: DEFAULT_SCHOOL_ID,
    ledgerId: 'led_tuition_01',
    ledgerName: 'Academic Tuition & Admissions',
    type: 'income',
    amount: 14500.00,
    date: '2026-10-03T09:15:00.000Z',
    category: 'Term 1 Enrollment',
    paymentMethod: 'bank_transfer',
    referenceNumber: 'WT-2026-88192',
    description: 'Quarterly tuition settlement for Sophia Thorne & Julian Thorne',
    balanceAfter: 894500.00,
    createdBy: 'Nolan Hayes, CPA',
    createdAt: '2026-10-03T09:16:00.000Z',
  },
  {
    id: 'tx_002',
    schoolId: DEFAULT_SCHOOL_ID,
    ledgerId: 'led_salary_02',
    ledgerName: 'Faculty & Staff Payroll',
    type: 'expense',
    amount: 52400.00,
    date: '2026-10-01T10:00:00.000Z',
    category: 'Faculty Remuneration',
    paymentMethod: 'bank_transfer',
    referenceNumber: 'PAY-SEP-26A',
    description: 'Direct deposit faculty monthly payroll for Science & Mathematics departments',
    balanceAfter: 312400.00,
    createdBy: 'Nolan Hayes, CPA',
    createdAt: '2026-10-01T10:05:00.000Z',
  },
  {
    id: 'tx_003',
    schoolId: DEFAULT_SCHOOL_ID,
    ledgerId: 'led_elec_03',
    ledgerName: 'School Electricity & Grid Power',
    type: 'expense',
    amount: 3850.00,
    date: '2026-09-28T16:15:00.000Z',
    category: 'Utility Bill',
    paymentMethod: 'online_gateway',
    referenceNumber: 'UTIL-ELEC-902',
    description: 'Eversource commercial power billing for North Science wing and server core',
    balanceAfter: 24850.00,
    createdBy: 'Nolan Hayes, CPA',
    createdAt: '2026-09-28T16:20:00.000Z',
  },
  {
    id: 'tx_004',
    schoolId: DEFAULT_SCHOOL_ID,
    ledgerId: 'led_transport_04',
    ledgerName: 'Student Transit & Fleet Logistics',
    type: 'expense',
    amount: 4200.00,
    date: '2026-10-02T11:45:00.000Z',
    category: 'Fleet Maintenance',
    paymentMethod: 'credit_card',
    referenceNumber: 'FLEET-SV-440',
    description: 'Comprehensive quarterly brake safety and software telemetry service for 6 buses',
    balanceAfter: 38200.00,
    createdBy: 'Nolan Hayes, CPA',
    createdAt: '2026-10-02T11:50:00.000Z',
  },
  {
    id: 'tx_005',
    schoolId: DEFAULT_SCHOOL_ID,
    ledgerId: 'led_stationery_05',
    ledgerName: 'Laboratory Equipment & Stationery',
    type: 'expense',
    amount: 2150.00,
    date: '2026-09-25T09:20:00.000Z',
    category: 'Lab Reagents',
    paymentMethod: 'bank_transfer',
    referenceNumber: 'INV-BIO-9921',
    description: 'ThermoFisher molecular biology electrophoresis reagents for Grade 12 AP Bio',
    balanceAfter: 16400.00,
    createdBy: 'Nolan Hayes, CPA',
    createdAt: '2026-09-25T09:22:00.000Z',
  },
];

const initialStudents: Student[] = [
  {
    id: 'stu_001',
    schoolId: DEFAULT_SCHOOL_ID,
    admissionNumber: 'AET-2024-001',
    firstName: 'Sophia',
    lastName: 'Thorne',
    gender: 'female',
    dateOfBirth: '2009-04-18',
    grade: 'Grade 11',
    section: 'A',
    rollNumber: '1101',
    guardianName: 'David & Catherine Thorne',
    guardianPhone: '+1 (617) 555-0104',
    guardianEmail: 'thorne.family@guardian.edu',
    address: '88 Brattle Street, Cambridge, MA',
    status: 'enrolled',
    attendanceRate: 98.4,
    feeStatus: 'paid',
    createdAt: '2024-08-15T09:00:00.000Z',
  },
  {
    id: 'stu_002',
    schoolId: DEFAULT_SCHOOL_ID,
    admissionNumber: 'AET-2024-002',
    firstName: 'Alexander',
    lastName: 'Chen',
    gender: 'male',
    dateOfBirth: '2009-02-11',
    grade: 'Grade 11',
    section: 'A',
    rollNumber: '1102',
    guardianName: 'Dr. Wei Chen',
    guardianPhone: '+1 (617) 555-0188',
    guardianEmail: 'wei.chen@partners.org',
    address: '14 Oxford St, Cambridge, MA',
    status: 'enrolled',
    attendanceRate: 96.2,
    feeStatus: 'paid',
    createdAt: '2024-08-15T09:30:00.000Z',
  },
  {
    id: 'stu_003',
    schoolId: DEFAULT_SCHOOL_ID,
    admissionNumber: 'AET-2024-003',
    firstName: 'Amara',
    lastName: 'Okafor',
    gender: 'female',
    dateOfBirth: '2009-07-29',
    grade: 'Grade 11',
    section: 'A',
    rollNumber: '1103',
    guardianName: 'Chief Emeka Okafor',
    guardianPhone: '+1 (617) 555-0192',
    guardianEmail: 'okafor.holdings@law.com',
    address: '22 Concord Ave, Cambridge, MA',
    status: 'enrolled',
    attendanceRate: 99.1,
    feeStatus: 'pending',
    createdAt: '2024-08-16T10:00:00.000Z',
  },
  {
    id: 'stu_004',
    schoolId: DEFAULT_SCHOOL_ID,
    admissionNumber: 'AET-2024-004',
    firstName: 'Julian',
    lastName: 'Thorne',
    gender: 'male',
    dateOfBirth: '2011-11-04',
    grade: 'Grade 9',
    section: 'B',
    rollNumber: '0914',
    guardianName: 'David & Catherine Thorne',
    guardianPhone: '+1 (617) 555-0104',
    guardianEmail: 'thorne.family@guardian.edu',
    address: '88 Brattle Street, Cambridge, MA',
    status: 'enrolled',
    attendanceRate: 95.0,
    feeStatus: 'paid',
    createdAt: '2025-08-20T08:30:00.000Z',
  },
  {
    id: 'stu_005',
    schoolId: DEFAULT_SCHOOL_ID,
    admissionNumber: 'AET-2023-018',
    firstName: 'Maya',
    lastName: 'Lin-Desai',
    gender: 'female',
    dateOfBirth: '2008-09-14',
    grade: 'Grade 12',
    section: 'A',
    rollNumber: '1205',
    guardianName: 'Sunita Desai & Ken Lin',
    guardianPhone: '+1 (617) 555-0211',
    guardianEmail: 'sdesai@design.org',
    address: '105 Huron Ave, Cambridge, MA',
    status: 'enrolled',
    attendanceRate: 97.8,
    feeStatus: 'overdue',
    createdAt: '2023-08-12T09:00:00.000Z',
  },
  {
    id: 'stu_006',
    schoolId: DEFAULT_SCHOOL_ID,
    admissionNumber: 'AET-2023-024',
    firstName: 'Lucas',
    lastName: 'Montague',
    gender: 'male',
    dateOfBirth: '2008-12-03',
    grade: 'Grade 12',
    section: 'B',
    rollNumber: '1218',
    guardianName: 'Beatrice Montague',
    guardianPhone: '+1 (617) 555-0245',
    guardianEmail: 'bmontague@somerville.gov',
    address: '34 Elm St, Somerville, MA',
    status: 'enrolled',
    attendanceRate: 94.6,
    feeStatus: 'paid',
    createdAt: '2023-08-12T11:00:00.000Z',
  },
];

const initialAttendance: AttendanceRecord[] = [
  {
    id: 'att_001',
    schoolId: DEFAULT_SCHOOL_ID,
    studentId: 'stu_001',
    studentName: 'Sophia Thorne',
    grade: 'Grade 11',
    section: 'A',
    date: '2026-10-04',
    status: 'present',
    markedBy: 'Prof. Marcus Vance',
    timestamp: '2026-10-04T08:05:00.000Z',
  },
  {
    id: 'att_002',
    schoolId: DEFAULT_SCHOOL_ID,
    studentId: 'stu_002',
    studentName: 'Alexander Chen',
    grade: 'Grade 11',
    section: 'A',
    date: '2026-10-04',
    status: 'present',
    markedBy: 'Prof. Marcus Vance',
    timestamp: '2026-10-04T08:05:00.000Z',
  },
  {
    id: 'att_003',
    schoolId: DEFAULT_SCHOOL_ID,
    studentId: 'stu_003',
    studentName: 'Amara Okafor',
    grade: 'Grade 11',
    section: 'A',
    date: '2026-10-04',
    status: 'late',
    remarks: 'Bus route delayed by municipal roadwork',
    markedBy: 'Prof. Marcus Vance',
    timestamp: '2026-10-04T08:22:00.000Z',
  },
  {
    id: 'att_004',
    schoolId: DEFAULT_SCHOOL_ID,
    studentId: 'stu_004',
    studentName: 'Julian Thorne',
    grade: 'Grade 9',
    section: 'B',
    date: '2026-10-04',
    status: 'present',
    markedBy: 'Prof. Marcus Vance',
    timestamp: '2026-10-04T08:08:00.000Z',
  },
  {
    id: 'att_005',
    schoolId: DEFAULT_SCHOOL_ID,
    studentId: 'stu_005',
    studentName: 'Maya Lin-Desai',
    grade: 'Grade 12',
    section: 'A',
    date: '2026-10-04',
    status: 'present',
    markedBy: 'Prof. Marcus Vance',
    timestamp: '2026-10-04T08:02:00.000Z',
  },
  {
    id: 'att_006',
    schoolId: DEFAULT_SCHOOL_ID,
    studentId: 'stu_006',
    studentName: 'Lucas Montague',
    grade: 'Grade 12',
    section: 'B',
    date: '2026-10-04',
    status: 'excused',
    remarks: 'All-State Orchestra auditions',
    markedBy: 'Prof. Marcus Vance',
    timestamp: '2026-10-04T08:15:00.000Z',
  },
];

const initialFees: FeeInvoice[] = [
  {
    id: 'fee_001',
    schoolId: DEFAULT_SCHOOL_ID,
    studentId: 'stu_001',
    studentName: 'Sophia Thorne',
    grade: 'Grade 11',
    title: 'Fall Semester Comprehensive Tuition',
    amount: 7250.00,
    paidAmount: 7250.00,
    dueAmount: 0.00,
    dueDate: '2026-10-01',
    status: 'paid',
    ledgerId: 'led_tuition_01',
    paymentDate: '2026-09-28',
    paymentMethod: 'bank_transfer',
    receiptNumber: 'REC-2026-0041',
    createdAt: '2026-08-01T00:00:00.000Z',
  },
  {
    id: 'fee_002',
    schoolId: DEFAULT_SCHOOL_ID,
    studentId: 'stu_003',
    studentName: 'Amara Okafor',
    grade: 'Grade 11',
    title: 'Fall Semester Comprehensive Tuition',
    amount: 7250.00,
    paidAmount: 0.00,
    dueAmount: 7250.00,
    dueDate: '2026-10-15',
    status: 'pending',
    ledgerId: 'led_tuition_01',
    createdAt: '2026-08-01T00:00:00.000Z',
  },
  {
    id: 'fee_003',
    schoolId: DEFAULT_SCHOOL_ID,
    studentId: 'stu_005',
    studentName: 'Maya Lin-Desai',
    grade: 'Grade 12',
    title: 'Senior Laboratory & AP Examination Levy',
    amount: 1450.00,
    paidAmount: 0.00,
    dueAmount: 1450.00,
    dueDate: '2026-09-15',
    status: 'overdue',
    ledgerId: 'led_stationery_05',
    createdAt: '2026-08-01T00:00:00.000Z',
  },
  {
    id: 'fee_004',
    schoolId: DEFAULT_SCHOOL_ID,
    studentId: 'stu_004',
    studentName: 'Julian Thorne',
    grade: 'Grade 9',
    title: 'Annual STEM Robotics Consumables & Lab Kit',
    amount: 850.00,
    paidAmount: 850.00,
    dueAmount: 0.00,
    dueDate: '2026-09-30',
    status: 'paid',
    ledgerId: 'led_stationery_05',
    paymentDate: '2026-09-24',
    paymentMethod: 'online_gateway',
    receiptNumber: 'REC-2026-0029',
    createdAt: '2026-08-01T00:00:00.000Z',
  },
];

const initialExams: Exam[] = [
  {
    id: 'ex_001',
    schoolId: DEFAULT_SCHOOL_ID,
    title: 'Autumn Mid-Term Assessment 2026',
    term: 'Term 1',
    academicYear: '2026-2027',
    startDate: '2026-10-18',
    endDate: '2026-10-24',
    grade: 'Grade 11',
    status: 'scheduled',
    subjects: [
      { subjectName: 'AP Physics C: Mechanics', totalMarks: 100, passMarks: 60, date: '2026-10-18' },
      { subjectName: 'Multivariable Calculus', totalMarks: 100, passMarks: 60, date: '2026-10-20' },
      { subjectName: 'World Literature & Rhetoric', totalMarks: 100, passMarks: 50, date: '2026-10-22' },
      { subjectName: 'Inorganic Chemistry', totalMarks: 100, passMarks: 55, date: '2026-10-24' },
    ],
  },
  {
    id: 'ex_002',
    schoolId: DEFAULT_SCHOOL_ID,
    title: 'Senior Honors Qualifying Examination',
    term: 'Pre-Term',
    academicYear: '2026-2027',
    startDate: '2026-09-10',
    endDate: '2026-09-14',
    grade: 'Grade 12',
    status: 'published',
    subjects: [
      { subjectName: 'Advanced Linear Algebra', totalMarks: 100, passMarks: 65, date: '2026-09-10' },
      { subjectName: 'AP Biology & Genetics', totalMarks: 100, passMarks: 60, date: '2026-09-12' },
      { subjectName: 'Macroeconomics & Public Policy', totalMarks: 100, passMarks: 50, date: '2026-09-14' },
    ],
  },
];

const initialExamResults: ExamResult[] = [
  {
    id: 'res_001',
    schoolId: DEFAULT_SCHOOL_ID,
    examId: 'ex_002',
    examTitle: 'Senior Honors Qualifying Examination',
    studentId: 'stu_005',
    studentName: 'Maya Lin-Desai',
    grade: 'Grade 12',
    section: 'A',
    marks: [
      { subjectName: 'Advanced Linear Algebra', obtainedMarks: 96, totalMarks: 100, grade: 'A+' },
      { subjectName: 'AP Biology & Genetics', obtainedMarks: 94, totalMarks: 100, grade: 'A' },
      { subjectName: 'Macroeconomics & Public Policy', obtainedMarks: 91, totalMarks: 100, grade: 'A-' },
    ],
    totalMarks: 300,
    obtainedMarks: 281,
    percentage: 93.7,
    overallGrade: 'A+',
    rank: 1,
    published: true,
  },
  {
    id: 'res_002',
    schoolId: DEFAULT_SCHOOL_ID,
    examId: 'ex_002',
    examTitle: 'Senior Honors Qualifying Examination',
    studentId: 'stu_006',
    studentName: 'Lucas Montague',
    grade: 'Grade 12',
    section: 'B',
    marks: [
      { subjectName: 'Advanced Linear Algebra', obtainedMarks: 88, totalMarks: 100, grade: 'B+' },
      { subjectName: 'AP Biology & Genetics', obtainedMarks: 90, totalMarks: 100, grade: 'A-' },
      { subjectName: 'Macroeconomics & Public Policy', obtainedMarks: 87, totalMarks: 100, grade: 'B+' },
    ],
    totalMarks: 300,
    obtainedMarks: 265,
    percentage: 88.3,
    overallGrade: 'A-',
    rank: 4,
    published: true,
  },
];

const initialAuditLogs: AuditLog[] = [
  {
    id: 'aud_001',
    schoolId: DEFAULT_SCHOOL_ID,
    userId: 'usr_accountant_01',
    userName: 'Nolan Hayes, CPA',
    userRole: 'accountant',
    action: 'CREATE',
    resource: 'LedgerTransaction',
    resourceId: 'tx_001',
    details: 'Recorded tuition wire transfer WT-2026-88192 ($14,500.00)',
    ipAddress: '192.168.1.42',
    timestamp: '2026-10-03T09:16:00.000Z',
  },
  {
    id: 'aud_002',
    schoolId: DEFAULT_SCHOOL_ID,
    userId: 'usr_teacher_01',
    userName: 'Prof. Marcus Vance',
    userRole: 'teacher',
    action: 'UPDATE',
    resource: 'Attendance',
    resourceId: 'att_003',
    details: 'Marked Amara Okafor as LATE with note on municipal transit delay',
    ipAddress: '192.168.1.18',
    timestamp: '2026-10-04T08:22:00.000Z',
  },
  {
    id: 'aud_003',
    schoolId: DEFAULT_SCHOOL_ID,
    userId: 'usr_admin_01',
    userName: 'Elena Rostova, M.Ed.',
    userRole: 'school_admin',
    action: 'UPDATE',
    resource: 'ExamSchedule',
    resourceId: 'ex_001',
    details: 'Confirmed proctors and room assignments for Autumn Mid-Terms',
    ipAddress: '192.168.1.10',
    timestamp: '2026-10-04T10:00:00.000Z',
  },
];

// Singleton In-Memory Datastore
class InMemoryDatabase {
  private state: DatabaseState = {
    schools: [...initialSchools],
    users: [...initialUsers],
    ledgers: [...initialLedgers],
    transactions: [...initialTransactions],
    students: [...initialStudents],
    attendance: [...initialAttendance],
    fees: [...initialFees],
    exams: [...initialExams],
    examResults: [...initialExamResults],
    auditLogs: [...initialAuditLogs],
  };

  // User & Auth
  getUsers() { return this.state.users; }
  getUserById(id: string) { return this.state.users.find(u => u.id === id); }
  getUserByRole(role: UserRole) { return this.state.users.find(u => u.role === role); }
  getUserByEmail(email: string) { return this.state.users.find(u => u.email.toLowerCase() === email.toLowerCase()); }

  // School
  getSchool() { return this.state.schools[0]; }

  // Ledgers
  getLedgers() { return this.state.ledgers; }
  getLedgerById(id: string) { return this.state.ledgers.find(l => l.id === id); }
  
  createLedger(data: Omit<Ledger, 'id' | 'currentBalance' | 'createdAt' | 'updatedAt' | 'schoolId' | 'status'> & { openingBalance?: number }) {
    const id = `led_${Date.now()}`;
    const newLedger: Ledger = {
      id,
      schoolId: DEFAULT_SCHOOL_ID,
      name: data.name,
      code: data.code,
      type: data.type,
      description: data.description || '',
      openingBalance: Number(data.openingBalance || 0),
      currentBalance: Number(data.openingBalance || 0),
      status: 'active',
      createdBy: data.createdBy,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.state.ledgers.unshift(newLedger);
    this.logAudit({
      userId: 'usr_accountant_01',
      userName: data.createdBy,
      userRole: 'accountant',
      action: 'CREATE',
      resource: 'Ledger',
      resourceId: id,
      details: `Created new ledger "${data.name}" (${data.code}) with opening balance $${Number(data.openingBalance || 0).toLocaleString()}`,
    });
    return newLedger;
  }

  // Transactions with authoritative server-side double entry balance update
  getTransactions(ledgerId?: string) {
    if (ledgerId) {
      return this.state.transactions.filter(t => t.ledgerId === ledgerId);
    }
    return this.state.transactions;
  }

  createTransaction(data: {
    ledgerId: string;
    type: 'income' | 'expense' | 'transfer' | 'adjustment';
    amount: number;
    date: string;
    category: string;
    paymentMethod: any;
    referenceNumber: string;
    description: string;
    createdBy: string;
  }) {
    const ledger = this.state.ledgers.find(l => l.id === data.ledgerId);
    if (!ledger) {
      throw new Error(`Ledger with ID ${data.ledgerId} not found`);
    }

    const numericAmount = Math.round(Number(data.amount) * 100) / 100;
    
    // Authoritative balance recalculation
    let newBalance = ledger.currentBalance;
    if (ledger.type === 'revenue' || ledger.type === 'asset') {
      if (data.type === 'income') newBalance += numericAmount;
      else if (data.type === 'expense') newBalance -= numericAmount;
      else if (data.type === 'adjustment') newBalance += numericAmount;
    } else {
      // Expense or liability accounts
      if (data.type === 'expense') newBalance += numericAmount;
      else if (data.type === 'income') newBalance -= numericAmount;
      else if (data.type === 'adjustment') newBalance -= numericAmount;
    }

    ledger.currentBalance = Math.round(newBalance * 100) / 100;
    ledger.updatedAt = new Date().toISOString();

    const transactionId = `tx_${Date.now()}`;
    const newTransaction: LedgerTransaction = {
      id: transactionId,
      schoolId: DEFAULT_SCHOOL_ID,
      ledgerId: ledger.id,
      ledgerName: ledger.name,
      type: data.type,
      amount: numericAmount,
      date: data.date,
      category: data.category,
      paymentMethod: data.paymentMethod,
      referenceNumber: data.referenceNumber,
      description: data.description,
      balanceAfter: ledger.currentBalance,
      createdBy: data.createdBy,
      createdAt: new Date().toISOString(),
    };

    this.state.transactions.unshift(newTransaction);

    this.logAudit({
      userId: 'usr_accountant_01',
      userName: data.createdBy,
      userRole: 'accountant',
      action: 'PAYMENT',
      resource: 'LedgerTransaction',
      resourceId: transactionId,
      details: `${data.type.toUpperCase()}: $${numericAmount.toLocaleString()} under ${ledger.name} [Ref: ${data.referenceNumber}]`,
    });

    return { transaction: newTransaction, updatedLedger: ledger };
  }

  // Students
  getStudents() { return this.state.students; }
  getStudentById(id: string) { return this.state.students.find(s => s.id === id); }
  
  createStudent(data: Omit<Student, 'id' | 'schoolId' | 'status' | 'attendanceRate' | 'feeStatus' | 'createdAt' | 'admissionNumber'>) {
    const id = `stu_${Date.now()}`;
    const admissionNumber = `AET-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newStudent: Student = {
      ...data,
      id,
      schoolId: DEFAULT_SCHOOL_ID,
      admissionNumber,
      status: 'enrolled',
      attendanceRate: 100.0,
      feeStatus: 'pending',
      createdAt: new Date().toISOString(),
    };
    this.state.students.unshift(newStudent);
    this.logAudit({
      userId: 'usr_admin_01',
      userName: 'Elena Rostova, M.Ed.',
      userRole: 'school_admin',
      action: 'CREATE',
      resource: 'Student',
      resourceId: id,
      details: `Enrolled new student ${data.firstName} ${data.lastName} (Adm: ${admissionNumber}) to ${data.grade}-${data.section}`,
    });
    return newStudent;
  }

  // Attendance
  getAttendance(date?: string, grade?: string) {
    return this.state.attendance.filter(a => {
      if (date && a.date !== date) return false;
      if (grade && a.grade !== grade) return false;
      return true;
    });
  }

  markAttendance(records: { studentId: string; date: string; status: any; remarks?: string }[], markedBy: string) {
    const markedRecords: AttendanceRecord[] = [];
    for (const item of records) {
      const student = this.state.students.find(s => s.id === item.studentId);
      if (!student) continue;

      // Check if attendance already exists for student on this date
      const existingIndex = this.state.attendance.findIndex(a => a.studentId === item.studentId && a.date === item.date);
      if (existingIndex >= 0) {
        this.state.attendance[existingIndex].status = item.status;
        this.state.attendance[existingIndex].remarks = item.remarks || '';
        this.state.attendance[existingIndex].timestamp = new Date().toISOString();
        markedRecords.push(this.state.attendance[existingIndex]);
      } else {
        const newRecord: AttendanceRecord = {
          id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          schoolId: DEFAULT_SCHOOL_ID,
          studentId: student.id,
          studentName: `${student.firstName} ${student.lastName}`,
          grade: student.grade,
          section: student.section,
          date: item.date,
          status: item.status,
          remarks: item.remarks,
          markedBy,
          timestamp: new Date().toISOString(),
        };
        this.state.attendance.unshift(newRecord);
        markedRecords.push(newRecord);
      }
    }

    this.logAudit({
      userId: 'usr_teacher_01',
      userName: markedBy,
      userRole: 'teacher',
      action: 'UPDATE',
      resource: 'AttendanceBatch',
      resourceId: records[0]?.date || 'today',
      details: `Batch marked attendance for ${records.length} students on ${records[0]?.date}`,
    });

    return markedRecords;
  }

  // Fees
  getFees(studentId?: string) {
    if (studentId) {
      return this.state.fees.filter(f => f.studentId === studentId);
    }
    return this.state.fees;
  }

  payFee(feeId: string, amount: number, paymentMethod: any, referenceNumber: string, ledgerId: string, recordedBy: string) {
    const fee = this.state.fees.find(f => f.id === feeId);
    if (!fee) throw new Error('Fee invoice not found');

    const numAmount = Number(amount);
    fee.paidAmount += numAmount;
    fee.dueAmount = Math.max(0, fee.amount - fee.paidAmount);
    fee.status = fee.dueAmount === 0 ? 'paid' : 'partial';
    fee.paymentDate = new Date().toISOString().split('T')[0];
    fee.paymentMethod = paymentMethod;
    fee.receiptNumber = referenceNumber;

    // Synchronize directly with accounting ledger
    this.createTransaction({
      ledgerId,
      type: 'income',
      amount: numAmount,
      date: new Date().toISOString(),
      category: 'Fee Collection',
      paymentMethod,
      referenceNumber,
      description: `Collection for ${fee.title} - ${fee.studentName}`,
      createdBy: recordedBy,
    });

    // Update student fee status
    const student = this.state.students.find(s => s.id === fee.studentId);
    if (student) {
      student.feeStatus = fee.status;
    }

    return fee;
  }

  // Exams & Results
  getExams() { return this.state.exams; }
  getExamResults(examId?: string, studentId?: string) {
    return this.state.examResults.filter(r => {
      if (examId && r.examId !== examId) return false;
      if (studentId && r.studentId !== studentId) return false;
      return true;
    });
  }

  // Audit Logs
  getAuditLogs() { return this.state.auditLogs; }
  logAudit(data: Omit<AuditLog, 'id' | 'schoolId' | 'timestamp' | 'ipAddress'> & { ipAddress?: string }) {
    const entry: AuditLog = {
      id: `aud_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      schoolId: DEFAULT_SCHOOL_ID,
      userId: data.userId,
      userName: data.userName,
      userRole: data.userRole,
      action: data.action,
      resource: data.resource,
      resourceId: data.resourceId,
      details: data.details,
      ipAddress: data.ipAddress || '127.0.0.1',
      timestamp: new Date().toISOString(),
    };
    this.state.auditLogs.unshift(entry);
    return entry;
  }

  // Aggregated analytics overview for Dashboard
  getAnalyticsOverview() {
    const totalStudents = this.state.students.length;
    const totalTeachers = this.state.users.filter(u => u.role === 'teacher').length;
    const today = '2026-10-04';
    const todayAttendance = this.state.attendance.filter(a => a.date === today);
    const presentCount = todayAttendance.filter(a => a.status === 'present' || a.status === 'late').length;
    const attendancePercentage = todayAttendance.length > 0 
      ? Math.round((presentCount / todayAttendance.length) * 100) 
      : 96;

    // Financial aggregates
    const pendingFees = this.state.fees.reduce((acc, f) => acc + f.dueAmount, 0);
    const revenueLedger = this.state.ledgers.find(l => l.code === 'REV-101');
    const monthlyRevenue = revenueLedger ? revenueLedger.currentBalance : 894500;
    
    const expenseLedgers = this.state.ledgers.filter(l => l.type === 'expense');
    const monthlyExpenses = expenseLedgers.reduce((acc, l) => acc + l.currentBalance, 0);

    const upcomingExams = this.state.exams.filter(e => e.status === 'scheduled');

    return {
      totalStudents,
      totalTeachers: totalTeachers || 18,
      attendanceToday: {
        percentage: attendancePercentage,
        present: presentCount,
        totalTracked: todayAttendance.length || totalStudents,
      },
      pendingFees,
      monthlyRevenue,
      monthlyExpenses,
      netSurplus: monthlyRevenue - monthlyExpenses,
      upcomingExamsCount: upcomingExams.length,
      upcomingExams,
      recentActivities: this.state.auditLogs.slice(0, 5),
    };
  }
}

export const db = new InMemoryDatabase();
