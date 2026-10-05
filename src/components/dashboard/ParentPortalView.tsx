import React, { useState } from 'react';
import { 
  Users, 
  CreditCard, 
  CalendarCheck, 
  GraduationCap, 
  CheckCircle2, 
  ArrowUpRight,
  Printer
} from 'lucide-react';
import { Student, FeeInvoice, ExamResult, AttendanceRecord } from '../../types/index.js';
import { Button } from '../common/Button.js';
import { StatusIndicator } from '../common/Badge.js';

interface ParentPortalViewProps {
  childrenStudents: Student[];
  allFees: FeeInvoice[];
  allResults: ExamResult[];
  onPayChildFee: (fee: FeeInvoice) => void;
}

export const ParentPortalView: React.FC<ParentPortalViewProps> = ({
  childrenStudents,
  allFees,
  allResults,
  onPayChildFee,
}) => {
  const [selectedChildId, setSelectedChildId] = useState<string>(childrenStudents[0]?.id || '');

  const activeChild = childrenStudents.find(c => c.id === selectedChildId) || childrenStudents[0];
  const childFees = allFees.filter(f => f.studentId === activeChild?.id);
  const childResults = allResults.filter(r => r.studentId === activeChild?.id);

  if (!activeChild) {
    return <div className="p-8 text-center text-xs text-slate-400">No child records associated with this guardian profile.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Top Banner & Child Selector */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-slate-400">GUARDIAN ACADEMIC PORTAL</span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Thorne Family Household Dashboard
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Managing enrolled children at Aethel Academy of Science & Arts
          </p>
        </div>

        {/* Child Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          {childrenStudents.map(child => (
            <button
              key={child.id}
              onClick={() => setSelectedChildId(child.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedChildId === child.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {child.firstName} ({child.grade})
            </button>
          ))}
        </div>
      </div>

      {/* Selected Child Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium">Class Attendance Rate</span>
          <p className="text-2xl font-bold font-mono text-emerald-700 mt-1">
            {activeChild.attendanceRate}%
          </p>
          <span className="text-[11px] text-slate-400">Roll call verified today</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium">Cohort Placement</span>
          <p className="text-2xl font-bold font-mono text-slate-900 mt-1">
            {activeChild.grade} - {activeChild.section}
          </p>
          <span className="text-[11px] text-slate-400 font-mono">Roll: #{activeChild.rollNumber}</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium">Tuition Account Status</span>
          <div className="mt-1">
            <StatusIndicator status={activeChild.feeStatus} />
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">Synced with Bursar Desk</span>
        </div>
      </div>

      {/* Tuition Invoices & Settlement for Child */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Tuition Schedules for {activeChild.firstName}</h3>
            <p className="text-xs text-slate-500">Official term invoices and downloadable receipts</p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {childFees.map(fee => (
            <div key={fee.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
              <div>
                <p className="font-semibold text-slate-900">{fee.title}</p>
                <div className="flex items-center gap-3 text-slate-400 text-[11px] font-mono mt-0.5">
                  <span>Due: {fee.dueDate}</span>
                  <span>·</span>
                  <StatusIndicator status={fee.status} />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right font-mono">
                  <span className="text-slate-900 font-bold block">${fee.amount.toLocaleString()}</span>
                  {fee.dueAmount > 0 ? (
                    <span className="text-rose-700 text-[11px]">Due: ${fee.dueAmount.toLocaleString()}</span>
                  ) : (
                    <span className="text-emerald-700 text-[11px]">Receipt: {fee.receiptNumber}</span>
                  )}
                </div>

                {fee.dueAmount > 0 ? (
                  <Button size="sm" variant="primary" onClick={() => onPayChildFee(fee)}>
                    Pay Online
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => window.print()} icon={<Printer className="h-3 w-3" />}>
                    Receipt
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Child Examination Results */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Academic Transcripts & Grades</h3>
        {childResults.length === 0 ? (
          <p className="text-xs text-slate-400 py-4">No published examination results yet for this academic term.</p>
        ) : (
          <div className="space-y-3">
            {childResults.map(res => (
              <div key={res.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900">{res.examTitle}</p>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                    Percentage: {res.percentage}% · Class Rank: #{res.rank}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-sm text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    Grade {res.overallGrade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
