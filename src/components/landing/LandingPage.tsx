import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  CheckCircle2, 
  Receipt, 
  Users, 
  GraduationCap, 
  CalendarCheck, 
  CreditCard, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  ChevronRight,
  HelpCircle,
  Building2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Button } from '../common/Button.js';
import { Navbar } from '../layout/Navbar.js';
import { UserRole } from '../../types/index.js';

interface LandingPageProps {
  onEnterDashboard: (role?: UserRole) => void;
  onBookDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterDashboard,
  onBookDemo,
}) => {
  const [activeRoleTab, setActiveRoleTab] = useState<UserRole>('school_admin');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const stats = [
    { value: '1,200+', label: 'Global K-12 & Higher Ed Academies' },
    { value: '99.98%', label: 'Daily Attendance Audit Integrity' },
    { value: '$140M+', label: 'Annual School Tuition Processed' },
    { value: '6 Roles', label: 'Granular Access Control (RBAC)' },
  ];

  const roleProfiles: Record<UserRole, { title: string; subtitle: string; benefits: string[] }> = {
    school_admin: {
      title: 'School Administrators & Principals',
      subtitle: 'Complete institutional governance across academics, faculty, students, and campus facilities.',
      benefits: [
        'Centralized dashboard tracking daily attendance velocity, enrollment growth, and pending fee arrears',
        'Academic cohort assignment, section balancing, and faculty proctor scheduling',
        'Direct compliance reporting and instant cryptographic audit log verification',
      ],
    },
    super_admin: {
      title: 'District Superintendents & Board Trustees',
      subtitle: 'Multi-campus network oversight with cross-institutional billing and regulatory governance.',
      benefits: [
        'Consolidated ledger rollups across multiple academy branches and municipal school districts',
        'Global permission provisioning, single sign-on (SSO), and role-based policy enforcement',
        'Cross-district analytics benchmarking academic outcomes and operational overhead',
      ],
    },
    accountant: {
      title: 'Bursars & Financial Comptrollers',
      subtitle: 'Double-entry general ledgers with real-time debit and credit reconciliation.',
      benefits: [
        'Multi-ledger cost accounting for Tuition, Payroll, Power Grid Utilities, Lab Consumables, and Transport Fleet',
        'Server-validated ledger transactions preventing unauthorized client-side state manipulation',
        'Instant receipt generation, invoice aging reports, and automated CSV/PDF export statements',
      ],
    },
    teacher: {
      title: 'Academic Faculty & Instructors',
      subtitle: 'Streamlined classroom workflows allowing educators to focus on teaching rather than bureaucracy.',
      benefits: [
        'Rapid 30-second roll call with instant Present, Late, Absent, and Excused state toggling',
        'Standardized markbooks, term weighting rubrics, and automated report card generation',
        'Live bell timetable synchronization with assigned lecture halls and laboratory stations',
      ],
    },
    student: {
      title: 'Scholars & Enrolled Students',
      subtitle: 'A clean, modern personal portal for schedules, assignment deadlines, and official report cards.',
      benefits: [
        'Transparent transcript view with subject marks, percentage rankings, and cumulative GPA',
        'Daily bell schedule and classroom location guides accessible from any smartphone',
        'Attendance tracking and verified student credential verification',
      ],
    },
    parent: {
      title: 'Guardians & Families',
      subtitle: 'Continuous transparency into your child’s academic journey and fee settlement history.',
      benefits: [
        'Real-time attendance notification if your student is marked late or unexcused',
        'One-click digital tuition payment with instant bank wire and card receipt downloads',
        'Direct teacher communications, term progress reports, and school event calendar',
      ],
    },
  };

  const coreModules = [
    {
      icon: Receipt,
      name: 'Multi-Ledger Accounting',
      description: 'Server-enforced double-entry bookkeeping across separate cost centers including Tuition, Payroll, Electricity, Maintenance, and Fleet Transport.',
    },
    {
      icon: Users,
      name: 'Student Information System',
      description: 'Comprehensive student dossiers from admission to alumni status, tracking guardian contacts, medical notes, roll numbers, and cohort assignments.',
    },
    {
      icon: CalendarCheck,
      name: 'Clock & Roll Call Attendance',
      description: 'High-speed classroom registers supporting Present, Late, Absent, and Excused status with automated guardian notification dispatch.',
    },
    {
      icon: CreditCard,
      name: 'Fee Invoicing & Bursar Desk',
      description: 'Automated term schedules, partial payments, receipt issuance, and instant credit synchronization with school general ledgers.',
    },
    {
      icon: GraduationCap,
      name: 'Examinations & Report Cards',
      description: 'Proctored assessments, subject markbooks, grading curves, rank generation, and printable official institutional transcripts.',
    },
    {
      icon: ShieldCheck,
      name: 'Forensic Audit & Compliance',
      description: 'Immutable record keeping tracking every user login, grade change, tuition collection, and ledger adjustment with timestamp and IP address.',
    },
  ];

  const faqs = [
    {
      q: 'What is Aethel School OS and how does it replace spreadsheet silos?',
      a: 'Aethel School OS is an enterprise-grade School Management System that unifies academic student management, daily attendance registers, examination grading, and multi-ledger double-entry accounting into one coherent, server-validated platform. Instead of operating fragmented spreadsheets, administrative and financial teams share a single cryptographic audit trail.',
    },
    {
      q: 'How does the multi-ledger accounting module safeguard school finances?',
      a: 'Unlike generic school software that merely records fee payments, Aethel School OS implements a true double-entry chart of accounts. Every fee invoice paid, faculty payroll run, or electricity bill posted creates balanced debit and credit entries with running balances computed authoritatively on the backend, preventing client-side tampering.',
    },
    {
      q: 'Can our staff test different roles like Teacher, Accountant, and Parent?',
      a: 'Yes. Aethel School OS features a live Role Switcher in the top bar. You can switch between Super Admin, School Principal, Teacher, Student, Parent, and Accountant with a single click to review each profile’s tailored user experience and RBAC permissions.',
    },
    {
      q: 'Does Aethel School OS support mobile and tablet devices?',
      a: 'Yes. Designed around the Great White design system, the interface is fully responsive across desktop, tablet, and mobile (360px to 1920px+). Faculty can take attendance on tablets during morning roll call, while parents can review report cards and pay tuition from mobile browsers.',
    },
    {
      q: 'How does the platform ensure data privacy and regulatory compliance?',
      a: 'All data mutations are governed by strict Role-Based Access Control (RBAC). Passwords and tokens are hashed, student records are isolated by institutional IDs, and every sensitive action is logged with an immutable audit timestamp and IP origin.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* 1. Header (Strict Top Bar Contract) */}
      <Navbar onEnterDashboard={() => onEnterDashboard()} onBookDemo={onBookDemo} />

      {/* 2. Hero Section */}
      <section id="hero" className="relative pt-20 pb-24 md:pt-32 md:pb-36 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Unboxed natural editorial kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 mb-6">
            <span>Next-Generation School Operating System</span>
            <span aria-hidden="true">·</span>
            <span>Release 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.08] text-balance">
            Everything Your School Needs. One Powerful Platform.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Unite student information systems, automated attendance, proctored examinations, and double-entry financial ledgers into an ultra-clean, enterprise-grade operating system.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              variant="primary"
              onClick={() => onEnterDashboard()}
              icon={<ArrowUpRight className="h-4 w-4" />}
            >
              Start Free Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onBookDemo}
            >
              Book an Institutional Walkthrough
            </Button>
          </div>

          {/* Clean minimal metadata trust markers */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-400 font-mono">
            <span>Instant Role Simulation</span>
            <span aria-hidden="true">·</span>
            <span>No Credit Card Required</span>
            <span aria-hidden="true">·</span>
            <span>WCAG 2.2 AA Accessible</span>
          </div>
        </div>
      </section>

      {/* 3. Trusted Schools / Statistics */}
      <section className="py-16 border-b border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight tabular-nums">
                  {s.value}
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 & 5. Core School Management Modules */}
      <section id="features" className="py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <div className="text-xs font-mono text-slate-500 mb-2">01. Architectural Capabilities</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Built for institutional scale and precision.
            </h2>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              Every workflow has been re-architected with zero superfluous decoration. Clean lines, tabular data, and sub-100ms response times.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreModules.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 transition-all shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-800 mb-5">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">{m.name}</h3>
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed">{m.description}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-slate-900 group cursor-pointer" onClick={() => onEnterDashboard()}>
                    <span>Explore module in console</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Interactive Live Dashboard Preview */}
      <section className="py-24 border-b border-slate-100 bg-slate-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-mono text-slate-500 mb-2">02. Live Console Experience</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              A minimalist, high-velocity command center.
            </h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Experience the Great White aesthetic: zero-pill typography, unified charts, and instantaneous record switching.
            </p>
          </div>

          {/* Interactive Preview Container */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
            {/* Fake Browser Window Bar */}
            <div className="h-11 bg-slate-50 border-b border-slate-200/80 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-200" />
                <span className="w-3 h-3 rounded-full bg-slate-200" />
                <span className="w-3 h-3 rounded-full bg-slate-200" />
              </div>
              <div className="px-6 py-1 bg-white rounded-lg border border-slate-200 text-[11px] font-mono text-slate-500">
                https://console.aethel.edu/academic-registrar
              </div>
              <Button size="sm" variant="primary" onClick={() => onEnterDashboard()}>
                Open Interactive Console
              </Button>
            </div>

            {/* Dashboard Sample Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/30">
                  <span className="text-xs text-slate-500">Enrolled Scholars</span>
                  <p className="text-2xl font-bold font-mono text-slate-900 mt-1">1,420</p>
                  <span className="text-[11px] text-emerald-600 font-medium">+4.2% YoY</span>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/30">
                  <span className="text-xs text-slate-500">Daily Attendance</span>
                  <p className="text-2xl font-bold font-mono text-slate-900 mt-1">98.4%</p>
                  <span className="text-[11px] text-slate-400">Synchronized</span>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/30">
                  <span className="text-xs text-slate-500">Active Tuition Ledger</span>
                  <p className="text-2xl font-bold font-mono text-slate-900 mt-1">$894,500</p>
                  <span className="text-[11px] text-emerald-600 font-medium">Balanced CR</span>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/30">
                  <span className="text-xs text-slate-500">Net Operational Surplus</span>
                  <p className="text-2xl font-bold font-mono text-slate-900 mt-1">$432,700</p>
                  <span className="text-[11px] text-slate-400">Audit verified</span>
                </div>
              </div>

              {/* Sample Table Snippet */}
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <div className="p-3 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>Recent Ledger & Academic Events</span>
                  <span className="font-mono text-slate-400 text-[10px]">Real-time stream</span>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">Tuition Wire Settlement #WT-2026-88192</p>
                      <p className="text-slate-400 text-[11px]">Ledger: Academic Tuition & Admissions (REV-101)</p>
                    </div>
                    <span className="font-mono font-bold text-emerald-700">+$14,500.00</span>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">Faculty Payroll Direct ACH #PAY-SEP-26A</p>
                      <p className="text-slate-400 text-[11px]">Ledger: Faculty & Staff Payroll (EXP-201)</p>
                    </div>
                    <span className="font-mono font-bold text-slate-900">-$52,400.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Role-Based Experience Showcase */}
      <section id="roles" className="py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-mono text-slate-500 mb-2">03. Role-Based Architecture (RBAC)</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              One platform. Six tailored perspectives.
            </h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Every participant in the educational ecosystem receives a purposeful, unpolluted workspace tailored strictly to their obligations.
            </p>
          </div>

          {/* Role selector tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl max-w-fit mb-8">
            {(Object.keys(roleProfiles) as UserRole[]).map(role => (
              <button
                key={role}
                onClick={() => setActiveRoleTab(role)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all capitalize cursor-pointer ${
                  activeRoleTab === role
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {role.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Active Role Content Card */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {roleProfiles[activeRoleTab].title}
                </h3>
                <p className="mt-1 text-xs text-slate-500 max-w-xl leading-relaxed">
                  {roleProfiles[activeRoleTab].subtitle}
                </p>
              </div>
              <Button
                size="sm"
                variant="primary"
                onClick={() => onEnterDashboard(activeRoleTab)}
                icon={<ArrowUpRight className="h-3.5 w-3.5" />}
              >
                Launch As {activeRoleTab.replace('_', ' ')}
              </Button>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {roleProfiles[activeRoleTab].benefits.map((benefit, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600 leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8, 9, 10. Deep-Dive: Accounting & Ledger System */}
      <section id="ledgers" className="py-24 border-b border-slate-100 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-mono text-slate-500 mb-2">04. Double-Entry Accounting</div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Institutional general ledgers without spreadsheet guesswork.
              </h2>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                Schools have complex cost centers: campus electricity, faculty remuneration, bus fleet logistics, stationery procurement, and tuition collections. Aethel School OS treats every monetary flow as a formal double-entry transaction.
              </p>

              <div className="mt-6 space-y-3">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                  <h4 className="text-xs font-semibold text-slate-900">Multi-Ledger Segmentation</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Maintain distinct ledger books for Electricity, Staff Payroll, STEM Labs, and Campus Maintenance with running balances.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                  <h4 className="text-xs font-semibold text-slate-900">Server-Authoritative Calculations</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Balances are strictly computed and verified on the backend, safeguarding against tampering and rounding discrepancies.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                  <h4 className="text-xs font-semibold text-slate-900">Instant Statement Export & Auditing</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Generate printable ledger statements, debit/credit audit summaries, and CSV exports for board presentations.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Ledger Mock Display */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-900">Cost Center Ledgers</span>
                <span className="text-[10px] font-mono text-slate-400">OCTOBER 2026</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-900">Academic Tuition & Admissions</span>
                    <span className="block text-[10px] text-slate-400 font-mono">REV-101 · Revenue</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">$894,500.00</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-900">Faculty & Staff Payroll</span>
                    <span className="block text-[10px] text-slate-400 font-mono">EXP-201 · Expense</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">$312,400.00</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-900">School Electricity & Grid Power</span>
                    <span className="block text-[10px] text-slate-400 font-mono">EXP-301 · Expense</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">$24,850.00</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-900">Student Transit & Fleet Logistics</span>
                    <span className="block text-[10px] text-slate-400 font-mono">EXP-401 · Expense</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">$38,200.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. Testimonials (Attributable & Rigorous) */}
      <section className="py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-mono text-slate-500 mb-2">05. Educational Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Trusted by leading superintendents and academic directors.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
              <p className="text-xs text-slate-600 leading-relaxed italic">
                “Replacing our disconnected fee spreadsheets with Aethel’s multi-ledger architecture saved our bursar team 30 hours per month and completely eliminated reconciliation variances.”
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-900">Dr. Alistair Sterling</p>
                <p className="text-[11px] text-slate-400">Headmaster, Cambridge Preparatory Academy</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
              <p className="text-xs text-slate-600 leading-relaxed italic">
                “Our faculty took to the attendance and exam markbook within 10 minutes. The pure white, uncluttered UI removes fatigue and makes roll call an effortless 30-second ritual.”
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-900">Marianne Croft, M.Ed.</p>
                <p className="text-[11px] text-slate-400">Dean of Academic Instruction, Oakridge International</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
              <p className="text-xs text-slate-600 leading-relaxed italic">
                “Parents love being able to check real-time attendance marks and download fee tax receipts directly from their phone. Our inbound support calls dropped by 72% in one term.”
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-900">Jonathan Wei</p>
                <p className="text-[11px] text-slate-400">Director of Systems & Compliance, St. Jude Schools</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 15. Transparent Institutional Pricing */}
      <section id="pricing" className="py-24 border-b border-slate-100 bg-slate-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-mono text-slate-500 mb-2">06. Predictable Pricing</div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Clear, transparent licensing for academies of every size.
            </h2>
            <p className="mt-3 text-xs text-slate-500">
              All plans include complete double-entry ledgers, SIS, attendance, exams, and audit trail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500">For Emerging Academies</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Foundation Tier</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold font-mono text-slate-900">$49</span>
                  <span className="text-xs text-slate-500 font-mono">/month billed annually</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-900 shrink-0" />
                    Up to 300 Enrolled Students
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-900 shrink-0" />
                    Full SIS & Attendance Register
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-900 shrink-0" />
                    5 Multi-Ledger Cost Centers
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-900 shrink-0" />
                    Standard Email Support
                  </li>
                </ul>
              </div>
              <Button size="sm" variant="outline" className="mt-8 w-full" onClick={() => onEnterDashboard()}>
                Start With Foundation
              </Button>
            </div>

            {/* Growth Tier */}
            <div className="p-7 rounded-2xl bg-white border-2 border-slate-900 shadow-lg relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-900">For Growing K-12 Schools</span>
                  <span className="text-[10px] font-mono bg-slate-900 text-white px-2 py-0.5 rounded font-medium">
                    Most Popular
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Institutional Pro</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold font-mono text-slate-900">$149</span>
                  <span className="text-xs text-slate-500 font-mono">/month billed annually</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-900 shrink-0" />
                    Up to 1,500 Enrolled Students
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-900 shrink-0" />
                    Unlimited Multi-Ledger Accounting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-900 shrink-0" />
                    All 6 Role-Based Portals (RBAC)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-900 shrink-0" />
                    Automated Fee Reminders & Receipts
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-900 shrink-0" />
                    Immutable Forensic Audit Trail
                  </li>
                </ul>
              </div>
              <Button size="sm" variant="primary" className="mt-8 w-full" onClick={() => onEnterDashboard()}>
                Start Pro Trial
              </Button>
            </div>

            {/* Enterprise Tier */}
            <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500">For Multi-Campus Districts</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">District Network</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold font-mono text-slate-900">$299</span>
                  <span className="text-xs text-slate-500 font-mono">/month billed annually</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-900 shrink-0" />
                    Unlimited Students & Multiple Campuses
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-900 shrink-0" />
                    Dedicated Comptroller Ledger Setup
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-900 shrink-0" />
                    Custom SIS Ingest & SIS Migration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-slate-900 shrink-0" />
                    24/7 SLA & Forensic Archive Export
                  </li>
                </ul>
              </div>
              <Button size="sm" variant="outline" className="mt-8 w-full" onClick={onBookDemo}>
                Contact District Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 16. FAQ (AEO & GEO Optimized) */}
      <section id="faq" className="py-24 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-xs font-mono text-slate-500 mb-2">07. Answer Engine Knowledge Base</div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-xs text-slate-500">
              Authoritative definitions and answers designed for educational leaders and technical search systems.
            </p>
          </div>

          <div className="divide-y divide-slate-200">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-5">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left text-sm font-semibold text-slate-900 hover:text-slate-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronRight
                    className={`h-4 w-4 text-slate-400 transition-transform ${
                      activeFaq === idx ? 'rotate-90 text-slate-900' : ''
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <p className="mt-3 text-xs text-slate-600 leading-relaxed pr-8 animate-in fade-in duration-150">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 17. Final CTA */}
      <section className="py-24 border-b border-slate-100 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-2xl mx-auto">
            Ready to elevate your institution’s operations?
          </h2>
          <p className="mt-4 text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join hundreds of forward-thinking schools that have simplified attendance, modernized SIS records, and implemented double-entry ledger security.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              variant="outline"
              onClick={() => onEnterDashboard()}
              className="bg-white text-slate-900 hover:bg-slate-100 border-white"
              icon={<ArrowUpRight className="h-4 w-4" />}
            >
              Start Free Demo
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={onBookDemo}
              className="text-white hover:bg-slate-800"
            >
              Book an Institutional Demo
            </Button>
          </div>
        </div>
      </section>

      {/* 18. Quiet Footer */}
      <footer className="py-12 bg-white text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-slate-900 text-white flex items-center justify-center text-[10px] font-mono">
              Æ
            </span>
            <span className="font-semibold text-slate-900">Aethel School OS</span>
            <span>·</span>
            <span>Enterprise Academic & Financial Systems</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px] text-slate-400">
            <span>ISO 27001 Certified</span>
            <span>·</span>
            <span>FERPA & GDPR Compliant</span>
            <span>·</span>
            <span>© 2026 Aethel Systems Inc.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
