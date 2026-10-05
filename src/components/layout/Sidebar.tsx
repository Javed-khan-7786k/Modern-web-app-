import React from 'react';
import { 
  LayoutDashboard, 
  Receipt, 
  Users, 
  CalendarCheck, 
  CreditCard, 
  GraduationCap, 
  Clock, 
  ShieldCheck, 
  Settings, 
  LogOut,
  ChevronRight,
  ExternalLink,
  Briefcase,
  DollarSign,
  BookOpen,
  Bell,
  Bus
} from 'lucide-react';
import { User, UserRole, DashboardView } from '../../types/index.js';

interface SidebarProps {
  currentView: DashboardView;
  onSelectView: (view: DashboardView) => void;
  currentUser: User;
  onLogout: () => void;
  onReturnToLanding: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  currentUser,
  onLogout,
  onReturnToLanding,
}) => {
  // Role based filtering of navigation items
  const navItems: { id: DashboardView; label: string; icon: any; roles: UserRole[] }[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      roles: ['super_admin', 'school_admin', 'accountant', 'teacher', 'student', 'parent'],
    },
    {
      id: 'ledgers',
      label: 'Financial Ledgers',
      icon: Receipt,
      roles: ['super_admin', 'school_admin', 'accountant'],
    },
    {
      id: 'students',
      label: 'Student Directory',
      icon: Users,
      roles: ['super_admin', 'school_admin', 'teacher'],
    },
    {
      id: 'teachers',
      label: 'Faculty Directory',
      icon: Briefcase,
      roles: ['super_admin', 'school_admin'],
    },
    {
      id: 'attendance',
      label: 'Attendance & Clock',
      icon: CalendarCheck,
      roles: ['super_admin', 'school_admin', 'teacher', 'student', 'parent'],
    },
    {
      id: 'fees',
      label: 'Fees & Invoicing',
      icon: CreditCard,
      roles: ['super_admin', 'school_admin', 'accountant', 'student', 'parent'],
    },
    {
      id: 'payroll',
      label: 'Faculty Payroll',
      icon: DollarSign,
      roles: ['super_admin', 'school_admin', 'accountant'],
    },
    {
      id: 'exams',
      label: 'Exams & Reports',
      icon: GraduationCap,
      roles: ['super_admin', 'school_admin', 'teacher', 'student', 'parent'],
    },
    {
      id: 'homework',
      label: 'Homework & Tasks',
      icon: BookOpen,
      roles: ['super_admin', 'school_admin', 'teacher', 'student', 'parent'],
    },
    {
      id: 'timetable',
      label: 'Class Schedules',
      icon: Clock,
      roles: ['super_admin', 'school_admin', 'teacher', 'student', 'parent'],
    },
    {
      id: 'notices',
      label: 'Notices & Circulars',
      icon: Bell,
      roles: ['super_admin', 'school_admin', 'teacher', 'student', 'parent'],
    },
    {
      id: 'library',
      label: 'Library Catalog',
      icon: BookOpen,
      roles: ['super_admin', 'school_admin', 'teacher', 'student'],
    },
    {
      id: 'transport',
      label: 'Fleet Transport',
      icon: Bus,
      roles: ['super_admin', 'school_admin', 'student', 'parent'],
    },
    {
      id: 'audit_logs',
      label: 'Audit & Compliance',
      icon: ShieldCheck,
      roles: ['super_admin', 'school_admin', 'accountant'],
    },
    {
      id: 'settings',
      label: 'Academy Settings',
      icon: Settings,
      roles: ['super_admin', 'school_admin'],
    },
  ];

  const allowedItems = navItems.filter(item => item.roles.includes(currentUser.role));

  const roleLabels: Record<UserRole, string> = {
    super_admin: 'Super Administrator',
    school_admin: 'School Principal',
    accountant: 'Financial Comptroller',
    teacher: 'Academic Faculty',
    student: 'Student Scholar',
    parent: 'Guardian / Parent',
  };

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col shrink-0 min-h-screen">
      {/* Brand lockup */}
      <div className="h-16 px-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-mono font-bold">
            Æ
          </div>
          <div>
            <span className="text-xs font-bold tracking-tight text-slate-900 block leading-tight">
              Aethel OS
            </span>
            <span className="text-[10px] text-slate-400 font-mono block leading-tight">
              v2.4 Enterprise
            </span>
          </div>
        </div>
        <button
          onClick={onReturnToLanding}
          title="View Public Landing Page"
          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Institution indicator */}
      <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50">
        <p className="text-[11px] font-semibold text-slate-900 truncate">
          Aethel Academy of Science
        </p>
        <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-slate-500 font-mono">
          <span>AY 2026-2027</span>
          <span>·</span>
          <span className="text-emerald-600 font-medium">Synced</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Core Workflows
        </div>
        {allowedItems.map(item => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'}`} />
                <span>{item.label}</span>
              </div>
              {isActive && <ChevronRight className="h-3 w-3 text-slate-300" />}
            </button>
          );
        })}
      </nav>

      {/* Current user card & logout */}
      <div className="p-3 border-t border-slate-200">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-semibold shrink-0">
            {currentUser.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-900 truncate">{currentUser.name}</p>
            <p className="text-[10px] text-slate-500 truncate">{roleLabels[currentUser.role]}</p>
          </div>
          <button
            onClick={onLogout}
            title="Sign Out"
            className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-white transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
