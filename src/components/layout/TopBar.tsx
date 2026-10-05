import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Shield, 
  UserCheck, 
  Menu
} from 'lucide-react';
import { User, UserRole, DashboardView } from '../../types/index.js';

interface TopBarProps {
  currentView: DashboardView;
  currentUser: User;
  onSwitchRole: (role: UserRole) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  unreadCount: number;
  onToggleMobileMenu?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentView,
  currentUser,
  onSwitchRole,
  onOpenSearch,
  onOpenNotifications,
  unreadCount,
  onToggleMobileMenu,
}) => {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const viewTitles: Record<DashboardView, { title: string; category: string }> = {
    overview: { title: 'Executive Control & Daily Pulse', category: 'Academy Console' },
    ledgers: { title: 'Multi-Ledger Double-Entry Accounts', category: 'Finance & Comptroller' },
    students: { title: 'Student Information System', category: 'Academic Registrar' },
    attendance: { title: 'Classroom & Faculty Attendance', category: 'Campus Operations' },
    fees: { title: 'Fee Schedules & Payment Processing', category: 'Finance & Bursar' },
    exams: { title: 'Term Assessments & Grade Reports', category: 'Examination Board' },
    timetable: { title: 'Master Schedule & Faculty Timetable', category: 'Instructional Planning' },
    teachers: { title: 'Faculty & Instructor Directory', category: 'Human Resources' },
    payroll: { title: 'Faculty Compensation & Vouchers', category: 'Treasury & Comptroller' },
    homework: { title: 'Coursework & Digital Submissions', category: 'Instructional Board' },
    notices: { title: 'Institutional Bulletins & Circulars', category: 'Campus Communications' },
    library: { title: 'Library Catalog & Circulation Desk', category: 'Academic Resources' },
    transport: { title: 'Student Transit & Fleet Logistics', category: 'Campus Operations' },
    audit_logs: { title: 'Immutable Security Audit Trail', category: 'Governance & Compliance' },
    settings: { title: 'Institution Global Preferences', category: 'Administration' },
  };

  const rolesList: { role: UserRole; title: string; description: string }[] = [
    { role: 'school_admin', title: 'School Principal / Admin', description: 'Complete institutional governance' },
    { role: 'super_admin', title: 'Super Admin', description: 'Multi-school oversight and system audit' },
    { role: 'accountant', title: 'Financial Comptroller', description: 'Ledgers, double-entry, fees & payroll' },
    { role: 'teacher', title: 'Faculty / Teacher', description: 'Class attendance, exams & gradebooks' },
    { role: 'student', title: 'Student Scholar', description: 'Coursework, grades, attendance & fee status' },
    { role: 'parent', title: 'Guardian / Parent', description: 'Child progress, tuition payments & notices' },
  ];

  const currentInfo = viewTitles[currentView] || { title: 'Dashboard', category: 'System' };

  return (
    <header className="h-16 border-b border-slate-200 bg-white px-4 sm:px-6 flex items-center justify-between z-20 shrink-0">
      {/* Left: Mobile trigger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label="Toggle Navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <div className="hidden sm:block">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span>Aethel Academy</span>
            <span>/</span>
            <span>{currentInfo.category}</span>
          </div>
          <h1 className="text-sm font-semibold text-slate-900 tracking-tight">
            {currentInfo.title}
          </h1>
        </div>
      </div>

      {/* Right: Search, Role Switcher, Notifications, Profile */}
      <div className="flex items-center gap-3">
        {/* Command Search button */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-100/80 text-slate-500 text-xs transition-colors cursor-pointer"
        >
          <Search className="h-3.5 w-3.5 text-slate-400" />
          <span className="hidden md:inline">Quick Jump...</span>
          <kbd className="hidden md:inline-block text-[10px] font-mono px-1 py-0.5 bg-white border border-slate-200 rounded text-slate-400">
            ⌘K
          </kbd>
        </button>

        {/* Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors shadow-2xs"
          >
            <Shield className="h-3.5 w-3.5 text-slate-500" />
            <span className="capitalize">{currentUser.role.replace('_', ' ')}</span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Switch Role Profile (RBAC Test)
              </div>
              <div className="divide-y divide-slate-50 max-h-80 overflow-y-auto">
                {rolesList.map(item => {
                  const isCurrent = currentUser.role === item.role;
                  return (
                    <button
                      key={item.role}
                      onClick={() => {
                        onSwitchRole(item.role);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 hover:bg-slate-50 transition-colors flex items-start gap-2.5 ${
                        isCurrent ? 'bg-slate-50/70' : ''
                      }`}
                    >
                      <UserCheck
                        className={`h-4 w-4 mt-0.5 shrink-0 ${
                          isCurrent ? 'text-slate-900' : 'text-slate-400'
                        }`}
                      />
                      <div className="min-w-0">
                        <p className={`text-xs font-semibold ${isCurrent ? 'text-slate-900' : 'text-slate-700'}`}>
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-400 leading-snug">{item.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Icon */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          aria-label="View notifications"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500" />
          )}
        </button>
      </div>
    </header>
  );
};
