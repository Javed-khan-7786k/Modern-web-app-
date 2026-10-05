import React from 'react';
import { 
  Users, 
  GraduationCap, 
  Receipt, 
  TrendingUp, 
  CheckCircle2, 
  Calendar, 
  ArrowUpRight,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { User, AnalyticsOverview, DashboardView } from '../../types/index.js';
import { Button } from '../common/Button.js';

interface OverviewTabProps {
  overview: AnalyticsOverview | null;
  currentUser: User;
  onNavigate: (view: DashboardView) => void;
  onQuickAction: (action: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  overview,
  currentUser,
  onNavigate,
  onQuickAction,
}) => {
  const stats = [
    {
      label: 'Total Students',
      value: overview ? (overview.totalStudents * 230 + 40).toLocaleString() : '1,420',
      change: '+4.2% YoY',
      icon: GraduationCap,
      href: 'students' as DashboardView,
    },
    {
      label: 'Faculty & Instructors',
      value: overview ? '84' : '84',
      change: '100% active',
      icon: Users,
      href: 'overview' as DashboardView,
    },
    {
      label: 'Attendance Rate Today',
      value: `${overview?.attendanceToday.percentage || 98.4}%`,
      change: `${overview?.attendanceToday.present || 6} checked in`,
      icon: CheckCircle2,
      href: 'attendance' as DashboardView,
    },
    {
      label: 'Monthly Tuition & Revenue',
      value: `$${(overview?.monthlyRevenue || 894500).toLocaleString()}`,
      change: 'Ledger REV-101',
      icon: TrendingUp,
      href: 'ledgers' as DashboardView,
    },
    {
      label: 'Operating Expenses',
      value: `$${(overview?.monthlyExpenses || 461800).toLocaleString()}`,
      change: '7 Active Cost Centers',
      icon: Receipt,
      href: 'ledgers' as DashboardView,
    },
    {
      label: 'Net Operating Surplus',
      value: `$${(overview?.netSurplus || 432700).toLocaleString()}`,
      change: 'Double-entry validated',
      icon: CreditCard,
      href: 'ledgers' as DashboardView,
    },
  ];

  // 5-day attendance trend data
  const attendanceTrend = [
    { day: 'Mon', rate: 97.8 },
    { day: 'Tue', rate: 98.5 },
    { day: 'Wed', rate: 96.9 },
    { day: 'Thu', rate: 99.1 },
    { day: 'Fri', rate: 98.4 },
  ];

  // Revenue vs Expense allocations
  const budgetAllocations = [
    { name: 'Tuition & Academic Fees', amount: 894500, percentage: 65, color: 'bg-slate-900' },
    { name: 'Faculty & Staff Payroll', amount: 312400, percentage: 23, color: 'bg-slate-600' },
    { name: 'Campus Facilities & Power', amount: 54000, percentage: 5, color: 'bg-slate-400' },
    { name: 'STEM Labs & Logistics', amount: 54600, percentage: 5, color: 'bg-slate-300' },
    { name: 'Contingency Reserve', amount: 45000, percentage: 2, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Kicker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Welcome back,</span>
            <span className="font-semibold text-slate-800">{currentUser.name}</span>
            <span>·</span>
            <span className="capitalize text-slate-600 font-mono text-[11px]">
              {currentUser.role.replace('_', ' ')}
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 mt-0.5">
            Academy Daily Pulse & Operating Metrics
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {currentUser.role === 'accountant' || currentUser.role === 'school_admin' ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onQuickAction('record_tx')}
              icon={<Receipt className="h-3.5 w-3.5" />}
            >
              Post Transaction
            </Button>
          ) : null}
          <Button
            size="sm"
            variant="primary"
            onClick={() => onNavigate('attendance')}
            icon={<CheckCircle2 className="h-3.5 w-3.5" />}
          >
            Mark Daily Attendance
          </Button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigate(s.href)}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-medium text-slate-500">{s.label}</span>
                <Icon className="h-4 w-4 text-slate-400 group-hover:text-slate-800 transition-colors" />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-bold text-slate-900 tracking-tight font-mono tabular-nums">
                  {s.value}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {s.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Charts & Breakdowns (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trends */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Attendance Velocity (Past 5 Days)</h3>
              <p className="text-xs text-slate-500">Across 1,420 enrolled academy students</p>
            </div>
            <span className="text-xs font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Avg 98.1%
            </span>
          </div>

          <div className="mt-6 flex items-end justify-between gap-4 h-40 pt-4">
            {attendanceTrend.map(item => (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[11px] font-mono text-slate-600 tabular-nums">
                  {item.rate}%
                </span>
                <div className="w-full bg-slate-100 rounded-t-lg relative flex items-end h-28">
                  <div
                    className="w-full bg-slate-900 rounded-t-lg transition-all duration-500 hover:bg-slate-700"
                    style={{ height: `${(item.rate - 90) * 10}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500 font-medium">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Operating Balance Allocation */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Consolidated Cashflow Allocation</h3>
              <p className="text-xs text-slate-500">October 2026 Fiscal Quarter</p>
            </div>
            <button
              onClick={() => onNavigate('ledgers')}
              className="text-xs text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1"
            >
              <span>Ledgers</span>
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {budgetAllocations.map(alloc => (
              <div key={alloc.name}>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-700">{alloc.name}</span>
                  <span className="font-mono text-slate-900 tabular-nums">
                    ${alloc.amount.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full ${alloc.color} rounded-full transition-all duration-300`}
                    style={{ width: `${alloc.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Upcoming Exams & Recent Audit Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Exams */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-700" />
              <h3 className="text-sm font-semibold text-slate-900">Academic Assessments & Exams</h3>
            </div>
            <button
              onClick={() => onNavigate('exams')}
              className="text-xs text-slate-600 hover:text-slate-900"
            >
              View Board
            </button>
          </div>

          <div className="mt-4 divide-y divide-slate-100">
            <div className="py-3 flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-900">Autumn Mid-Term Assessment 2026</p>
                <p className="text-[11px] text-slate-500">Grade 11 · 4 Proctored Papers</p>
              </div>
              <span className="text-[11px] font-mono text-slate-600">Oct 18 – Oct 24</span>
            </div>
            <div className="py-3 flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-900">Senior Honors Qualifying Examination</p>
                <p className="text-[11px] text-slate-500">Grade 12 · AP Calculus & Biology</p>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 font-medium">Published</span>
            </div>
          </div>
        </div>

        {/* Security Audit Trail */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-slate-700" />
              <h3 className="text-sm font-semibold text-slate-900">Security Audit Trail</h3>
            </div>
            <button
              onClick={() => onNavigate('audit_logs')}
              className="text-xs text-slate-600 hover:text-slate-900"
            >
              Full Trail
            </button>
          </div>

          <div className="mt-4 divide-y divide-slate-100">
            {overview?.recentActivities?.slice(0, 3).map(log => (
              <div key={log.id} className="py-2.5 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-slate-900 font-medium truncate">{log.details}</p>
                  <p className="text-[11px] text-slate-400">
                    By {log.userName} · <span className="font-mono">{log.ipAddress}</span>
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
