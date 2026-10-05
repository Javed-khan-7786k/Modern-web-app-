import React, { useState, useEffect } from 'react';
import { 
  User, 
  UserRole, 
  DashboardView, 
  Ledger, 
  LedgerTransaction, 
  Student, 
  AttendanceRecord, 
  FeeInvoice, 
  Exam, 
  ExamResult, 
  AuditLog, 
  AnalyticsOverview 
} from './types/index.js';
import { api } from './services/api.js';

// Layout & Common
import { LandingPage } from './components/landing/LandingPage.js';
import { Sidebar } from './components/layout/Sidebar.js';
import { TopBar } from './components/layout/TopBar.js';
import { CommandPalette } from './components/common/CommandPalette.js';
import { NotificationCenter, NotificationItem } from './components/common/NotificationCenter.js';
import { Modal } from './components/common/Modal.js';
import { Button } from './components/common/Button.js';

// Dashboard Tabs
import { OverviewTab } from './components/dashboard/OverviewTab.js';
import { LedgersTab } from './components/dashboard/LedgersTab.js';
import { StudentsTab } from './components/dashboard/StudentsTab.js';
import { AttendanceTab } from './components/dashboard/AttendanceTab.js';
import { FeesTab } from './components/dashboard/FeesTab.js';
import { ExamsTab } from './components/dashboard/ExamsTab.js';
import { TimetableTab } from './components/dashboard/TimetableTab.js';
import { AuditLogsTab } from './components/dashboard/AuditLogsTab.js';
import { SettingsTab } from './components/dashboard/SettingsTab.js';

export default function App() {
  const [mode, setMode] = useState<'landing' | 'dashboard'>('landing');
  const [currentView, setCurrentView] = useState<DashboardView>('overview');
  
  // Active user profile (defaults to Principal / School Admin)
  const [currentUser, setCurrentUser] = useState<User>({
    id: 'usr_admin_01',
    name: 'Elena Rostova, M.Ed.',
    email: 'principal@aethel.edu',
    role: 'school_admin',
    schoolId: 'sch_aethel_01',
    department: 'Headmaster Administration',
    phone: '+1 (617) 555-0101',
    isActive: true,
    createdAt: '2026-01-15T08:30:00.000Z',
  });

  // State data caches
  const [ledgers, setLedgers] = useState<Ledger[]>([]);
  const [transactions, setTransactions] = useState<LedgerTransaction[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [fees, setFees] = useState<FeeInvoice[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);

  // UI state
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoEmail, setDemoEmail] = useState('');
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // In-app notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif_1',
      title: 'Tuition Wire Reconciled',
      description: 'Sophia Thorne fall semester tuition ($7,250.00) verified under REV-101.',
      time: '12m ago',
      type: 'success',
      read: false,
    },
    {
      id: 'notif_2',
      title: 'Attendance Alert',
      description: 'Amara Okafor marked LATE due to transit delay.',
      time: '1h ago',
      type: 'warning',
      read: false,
    },
    {
      id: 'notif_3',
      title: 'Exam Schedule Published',
      description: 'Autumn Mid-Term assessment proctors assigned for Grade 11.',
      time: '3h ago',
      type: 'info',
      read: true,
    },
  ]);

  // Load initial data from API
  const loadData = async () => {
    try {
      const [
        ledgersData,
        transactionsData,
        studentsData,
        attendanceData,
        feesData,
        examsData,
        resultsData,
        logsData,
        overviewData
      ] = await Promise.all([
        api.getLedgers().catch(() => []),
        api.getTransactions().catch(() => []),
        api.getStudents().catch(() => []),
        api.getAttendance().catch(() => []),
        api.getFees().catch(() => []),
        api.getExams().catch(() => []),
        api.getExamResults().catch(() => []),
        api.getAuditLogs().catch(() => []),
        api.getOverview().catch(() => null),
      ]);

      if (ledgersData?.length) setLedgers(ledgersData);
      if (transactionsData?.length) setTransactions(transactionsData);
      if (studentsData?.length) setStudents(studentsData);
      if (attendanceData?.length) setAttendance(attendanceData);
      if (feesData?.length) setFees(feesData);
      if (examsData?.length) setExams(examsData);
      if (resultsData?.length) setExamResults(resultsData);
      if (logsData?.length) setAuditLogs(logsData);
      if (overviewData) setOverview(overviewData);
    } catch (err) {
      console.warn('Backend loading note (mock data active):', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Keyboard shortcut for Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Switch role handler (RBAC)
  const handleSwitchRole = async (newRole: UserRole) => {
    try {
      const res = await api.switchRole(newRole);
      setCurrentUser(res.user);
    } catch {
      // Direct local role fallback
      const roleDefaults: Record<UserRole, Partial<User>> = {
        super_admin: { name: 'Dr. Arthur Sterling', email: 'superadmin@aethel.edu', department: 'Chancellor Office' },
        school_admin: { name: 'Elena Rostova, M.Ed.', email: 'principal@aethel.edu', department: 'Headmaster Administration' },
        accountant: { name: 'Nolan Hayes, CPA', email: 'finance@aethel.edu', department: 'Treasury & Comptroller Office' },
        teacher: { name: 'Prof. Marcus Vance', email: 'marcus.vance@aethel.edu', department: 'Natural Sciences & AP Physics' },
        student: { name: 'Sophia Thorne', email: 'sophia.thorne@student.aethel.edu', department: 'Grade 11 - Section A' },
        parent: { name: 'David & Catherine Thorne', email: 'thorne.family@guardian.edu', department: 'Parent Association Council' },
      };

      setCurrentUser(prev => ({
        ...prev,
        ...roleDefaults[newRole],
        role: newRole,
      }));
    }

    // Role-appropriate initial view
    if (newRole === 'accountant') {
      setCurrentView('ledgers');
    } else if (newRole === 'teacher') {
      setCurrentView('attendance');
    } else if (newRole === 'student') {
      setCurrentView('exams');
    } else if (newRole === 'parent') {
      setCurrentView('fees');
    } else {
      setCurrentView('overview');
    }
  };

  // Ledger actions
  const handleCreateLedger = async (data: Parameters<typeof api.createLedger>[0]) => {
    const newLedger = await api.createLedger({
      ...data,
      createdBy: currentUser.name,
    });
    setLedgers(prev => [newLedger, ...prev]);
    loadData();
  };

  const handleCreateTransaction = async (data: Parameters<typeof api.createTransaction>[0]) => {
    const result = await api.createTransaction({
      ...data,
      createdBy: currentUser.name,
    });
    setTransactions(prev => [result.transaction, ...prev]);
    setLedgers(prev => prev.map(l => l.id === result.updatedLedger.id ? result.updatedLedger : l));
    loadData();
  };

  // Student actions
  const handleEnrollStudent = async (data: any) => {
    const newStudent = await api.createStudent(data);
    setStudents(prev => [newStudent, ...prev]);
    loadData();
  };

  // Attendance actions
  const handleSaveAttendance = async (records: Parameters<typeof api.markAttendance>[0]) => {
    const updated = await api.markAttendance(records, currentUser.name);
    setAttendance(prev => {
      const copy = [...prev];
      updated.forEach(u => {
        const idx = copy.findIndex(item => item.studentId === u.studentId && item.date === u.date);
        if (idx >= 0) copy[idx] = u;
        else copy.unshift(u);
      });
      return copy;
    });
    loadData();
  };

  // Fee collection actions
  const handleCollectPayment = async (data: Parameters<typeof api.payFee>[0]) => {
    const updatedFee = await api.payFee({
      ...data,
      recordedBy: currentUser.name,
    });
    setFees(prev => prev.map(f => f.id === updatedFee.id ? updatedFee : f));
    loadData();
  };

  const handleBookDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSubmitted(true);
    setTimeout(() => {
      setIsDemoModalOpen(false);
      setDemoSubmitted(false);
      setDemoEmail('');
    }, 2500);
  };

  // If in landing page mode, render Landing Page
  if (mode === 'landing') {
    return (
      <>
        <LandingPage
          onEnterDashboard={(role) => {
            if (role) handleSwitchRole(role);
            setMode('dashboard');
          }}
          onBookDemo={() => setIsDemoModalOpen(true)}
        />

        {/* Book Demo Modal */}
        <Modal
          isOpen={isDemoModalOpen}
          onClose={() => setIsDemoModalOpen(false)}
          title="Schedule an Institutional Walkthrough"
          subtitle="Explore Aethel School OS customized for your institution's governance and chart of accounts"
        >
          {demoSubmitted ? (
            <div className="py-8 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                ✓
              </div>
              <h4 className="text-sm font-semibold text-slate-900">Walkthrough Request Received</h4>
              <p className="text-xs text-slate-500">
                An academic solutions engineer will contact your office at <strong>{demoEmail}</strong> within 1 business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBookDemoSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Institutional Email *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. chancellor@university.edu"
                  value={demoEmail}
                  onChange={e => setDemoEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Institution Type</label>
                <select className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none bg-white">
                  <option>Private K-12 Academy</option>
                  <option>Independent Boarding School</option>
                  <option>Public / Municipal School District</option>
                  <option>Higher Education College / Faculty</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsDemoModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Confirm Walkthrough
                </Button>
              </div>
            </form>
          )}
        </Modal>
      </>
    );
  }

  // Dashboard Mode
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-slate-900 flex font-sans antialiased">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          currentView={currentView}
          onSelectView={setCurrentView}
          currentUser={currentUser}
          onLogout={() => setMode('landing')}
          onReturnToLanding={() => setMode('landing')}
        />
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-slate-900/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative z-10 w-72 bg-white h-full shadow-2xl">
            <Sidebar
              currentView={currentView}
              onSelectView={(v) => {
                setCurrentView(v);
                setIsMobileMenuOpen(false);
              }}
              currentUser={currentUser}
              onLogout={() => {
                setMode('landing');
                setIsMobileMenuOpen(false);
              }}
              onReturnToLanding={() => {
                setMode('landing');
                setIsMobileMenuOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#FFFFFF]">
        <TopBar
          currentView={currentView}
          currentUser={currentUser}
          onSwitchRole={handleSwitchRole}
          onOpenSearch={() => setIsCommandOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          unreadCount={notifications.filter(n => !n.read).length}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* Viewport Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {currentView === 'overview' && (
            <OverviewTab
              overview={overview}
              currentUser={currentUser}
              onNavigate={setCurrentView}
              onQuickAction={(action) => {
                if (action === 'record_tx') setCurrentView('ledgers');
              }}
            />
          )}

          {currentView === 'ledgers' && (
            <LedgersTab
              ledgers={ledgers}
              transactions={transactions}
              onCreateLedger={handleCreateLedger}
              onCreateTransaction={handleCreateTransaction}
            />
          )}

          {currentView === 'students' && (
            <StudentsTab
              students={students}
              onEnrollStudent={handleEnrollStudent}
            />
          )}

          {currentView === 'attendance' && (
            <AttendanceTab
              students={students}
              initialAttendance={attendance}
              onSaveAttendance={handleSaveAttendance}
            />
          )}

          {currentView === 'fees' && (
            <FeesTab
              fees={fees}
              ledgers={ledgers}
              onCollectPayment={handleCollectPayment}
            />
          )}

          {currentView === 'exams' && (
            <ExamsTab
              exams={exams}
              examResults={examResults}
            />
          )}

          {currentView === 'timetable' && (
            <TimetableTab />
          )}

          {currentView === 'audit_logs' && (
            <AuditLogsTab logs={auditLogs} />
          )}

          {currentView === 'settings' && (
            <SettingsTab />
          )}
        </main>
      </div>

      {/* Global Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onNavigate={setCurrentView}
        onAction={(action) => {
          if (action === 'record_tx') setCurrentView('ledgers');
          if (action === 'new_student') setCurrentView('students');
        }}
      />

      {/* Notification Drawer */}
      <NotificationCenter
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() => {
          setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        }}
      />
    </div>
  );
}
