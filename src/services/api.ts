import { 
  User, 
  UserRole, 
  Ledger, 
  LedgerTransaction, 
  Student, 
  AttendanceRecord, 
  FeeInvoice, 
  Exam, 
  ExamResult, 
  AuditLog, 
  AnalyticsOverview 
} from '../types/index.js';

const API_BASE = '/api/v1';

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('aethel_jwt_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  });

  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.message || 'API request failed');
  }
  return body.data;
}

export const api = {
  // Auth
  async login(email: string, role?: UserRole): Promise<{ user: User; token: string }> {
    return fetchJson('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, role }),
    });
  },

  async switchRole(role: UserRole): Promise<{ user: User; token: string }> {
    return fetchJson('/auth/switch-role', {
      method: 'POST',
      body: JSON.stringify({ role }),
    });
  },

  async getMe(): Promise<{ user: User }> {
    return fetchJson('/auth/me');
  },

  // Health
  async getHealth(): Promise<any> {
    return fetchJson('/health');
  },

  // Ledgers
  async getLedgers(): Promise<Ledger[]> {
    return fetchJson('/ledgers');
  },

  async getLedgerById(id: string): Promise<{ ledger: Ledger; transactions: LedgerTransaction[] }> {
    return fetchJson(`/ledgers/${id}`);
  },

  async createLedger(data: {
    name: string;
    code: string;
    type: string;
    description: string;
    openingBalance: number;
    createdBy?: string;
  }): Promise<Ledger> {
    return fetchJson('/ledgers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getTransactions(ledgerId?: string): Promise<LedgerTransaction[]> {
    const query = ledgerId ? `?ledgerId=${ledgerId}` : '';
    return fetchJson(`/transactions${query}`);
  },

  async createTransaction(data: {
    ledgerId: string;
    type: 'income' | 'expense' | 'transfer' | 'adjustment';
    amount: number;
    date: string;
    category: string;
    paymentMethod: string;
    referenceNumber: string;
    description: string;
    createdBy?: string;
  }): Promise<{ transaction: LedgerTransaction; updatedLedger: Ledger }> {
    return fetchJson('/transactions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getFinancialSummary(): Promise<any> {
    return fetchJson('/ledgers/summary');
  },

  // Students
  async getStudents(params?: { grade?: string; search?: string }): Promise<Student[]> {
    const q = new URLSearchParams();
    if (params?.grade && params.grade !== 'all') q.set('grade', params.grade);
    if (params?.search) q.set('search', params.search);
    const queryStr = q.toString() ? `?${q.toString()}` : '';
    return fetchJson(`/students${queryStr}`);
  },

  async getStudentById(id: string): Promise<{
    student: Student;
    attendance: AttendanceRecord[];
    fees: FeeInvoice[];
    examResults: ExamResult[];
  }> {
    return fetchJson(`/students/${id}`);
  },

  async createStudent(data: any): Promise<Student> {
    return fetchJson('/students', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Attendance
  async getAttendance(date?: string, grade?: string): Promise<AttendanceRecord[]> {
    const q = new URLSearchParams();
    if (date) q.set('date', date);
    if (grade && grade !== 'all') q.set('grade', grade);
    const queryStr = q.toString() ? `?${q.toString()}` : '';
    return fetchJson(`/attendance${queryStr}`);
  },

  async markAttendance(records: { studentId: string; date: string; status: string; remarks?: string }[], markedBy?: string): Promise<AttendanceRecord[]> {
    return fetchJson('/attendance', {
      method: 'POST',
      body: JSON.stringify({ records, markedBy }),
    });
  },

  // Fees
  async getFees(studentId?: string): Promise<FeeInvoice[]> {
    const q = studentId ? `?studentId=${studentId}` : '';
    return fetchJson(`/fees${q}`);
  },

  async payFee(data: {
    feeId: string;
    amount: number;
    paymentMethod: string;
    referenceNumber: string;
    ledgerId: string;
    recordedBy?: string;
  }): Promise<FeeInvoice> {
    return fetchJson('/fees/pay', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Exams
  async getExams(): Promise<Exam[]> {
    return fetchJson('/exams');
  },

  async getExamResults(examId?: string, studentId?: string): Promise<ExamResult[]> {
    const q = new URLSearchParams();
    if (examId) q.set('examId', examId);
    if (studentId) q.set('studentId', studentId);
    const queryStr = q.toString() ? `?${q.toString()}` : '';
    return fetchJson(`/exams/results${queryStr}`);
  },

  // Audit Logs
  async getAuditLogs(): Promise<AuditLog[]> {
    return fetchJson('/audit-logs');
  },

  // Analytics Overview
  async getOverview(): Promise<AnalyticsOverview> {
    return fetchJson('/analytics/overview');
  },
};
