import React from 'react';
import { 
  GraduationCap, 
  CalendarCheck, 
  CreditCard, 
  BookOpen, 
  Printer, 
  Award, 
  ArrowUpRight 
} from 'lucide-react';
import { Student, ExamResult, FeeInvoice, Homework } from '../../types/index.js';
import { Button } from '../common/Button.js';
import { StatusIndicator } from '../common/Badge.js';

interface StudentPortalViewProps {
  student: Student;
  results: ExamResult[];
  fees: FeeInvoice[];
  homework: Homework[];
}

export const StudentPortalView: React.FC<StudentPortalViewProps> = ({
  student,
  results,
  fees,
  homework,
}) => {
  return (
    <div className="space-y-6">
      {/* Student Scholar ID Card & Welcome Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scholar Institutional Badge Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-900 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-900">AETHEL ACADEMY OF SCIENCE</span>
              <span className="text-[10px] font-mono bg-slate-900 text-white px-2 py-0.5 rounded">SCHOLAR</span>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center font-bold text-2xl shrink-0 font-mono">
                {student.firstName.charAt(0)}{student.lastName.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  {student.firstName} {student.lastName}
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{student.admissionNumber}</p>
                <p className="text-xs text-slate-700 font-medium">{student.grade} · Section {student.section}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <div>
              <span className="block text-[10px] text-slate-400">Class Roll</span>
              <span className="font-bold text-slate-900">#{student.rollNumber}</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-400">Attendance</span>
              <span className="font-bold text-emerald-700">{student.attendanceRate}%</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-400">Status</span>
              <span className="capitalize font-semibold text-slate-900">{student.status}</span>
            </div>
          </div>
        </div>

        {/* Academic Overview Kicker */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono text-slate-400">ACADEMIC TERM 2026-2027</span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Welcome to your Academic Portal, {student.firstName}
            </h2>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed max-w-xl">
              You are currently enrolled in Grade 11 Honors with active course registration in AP Physics C, Multivariable Calculus, Inorganic Chemistry, and World Literature.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] font-mono text-slate-400 block">Cumulative GPA</span>
              <span className="text-lg font-bold font-mono text-slate-900">3.94 / 4.0</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] font-mono text-slate-400 block">Class Rank</span>
              <span className="text-lg font-bold font-mono text-slate-900">Top 3%</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] font-mono text-slate-400 block">Pending Assignments</span>
              <span className="text-lg font-bold font-mono text-slate-900">{homework.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Official Transcripts & Report Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Term Assessment Transcripts</h3>
            <p className="text-xs text-slate-500">Official proctored examination marks</p>
          </div>
          <Button size="sm" variant="outline" onClick={() => window.print()} icon={<Printer className="h-3.5 w-3.5" />}>
            Print Official Transcript
          </Button>
        </div>

        <div className="p-5">
          {results.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              Your mid-term exam marks are currently being compiled by the examination board.
            </div>
          ) : (
            <div className="space-y-4">
              {results.map(res => (
                <div key={res.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-slate-900 text-xs">{res.examTitle}</span>
                    <span className="font-mono text-xs font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      Grade {res.overallGrade} ({res.percentage}%)
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                    {res.marks.map((m, idx) => (
                      <div key={idx} className="p-2 bg-white rounded-lg border border-slate-100">
                        <span className="text-[10px] text-slate-400 block line-clamp-1">{m.subjectName}</span>
                        <span className="font-bold text-slate-900">{m.obtainedMarks} / {m.totalMarks} ({m.grade})</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pending Coursework & Homework */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Active Coursework Due</h3>
        <div className="divide-y divide-slate-100 text-xs">
          {homework.map(hw => (
            <div key={hw.id} className="py-3 flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900">{hw.title}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{hw.subject} · Assigned by {hw.assignedBy}</p>
              </div>
              <span className="font-mono text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                Due: {hw.dueDate}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
