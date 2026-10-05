import React from 'react';
import { 
  Users, 
  CalendarCheck, 
  BookOpen, 
  Clock, 
  Award, 
  ArrowUpRight 
} from 'lucide-react';
import { User, Student, Homework } from '../../types/index.js';
import { Button } from '../common/Button.js';

interface TeacherPortalViewProps {
  currentUser: User;
  students: Student[];
  homework: Homework[];
  onTakeAttendance: () => void;
  onPostHomework: () => void;
}

export const TeacherPortalView: React.FC<TeacherPortalViewProps> = ({
  currentUser,
  students,
  homework,
  onTakeAttendance,
  onPostHomework,
}) => {
  const myStudents = students.filter(s => s.grade === 'Grade 11' && s.section === 'A');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-slate-400">FACULTY INSTRUCTIONAL CONSOLE</span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Good morning, {currentUser.name}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Chair of Physics & Robotics Lab Director · Grade 11-A & Grade 12-A
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={onPostHomework} icon={<BookOpen className="h-3.5 w-3.5" />}>
            Assign Homework
          </Button>
          <Button size="sm" variant="primary" onClick={onTakeAttendance} icon={<CalendarCheck className="h-3.5 w-3.5" />}>
            Start Daily Roll Call
          </Button>
        </div>
      </div>

      {/* Faculty Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium">Assigned Class Cohorts</span>
          <p className="text-2xl font-bold font-mono text-slate-900 mt-1">2 Classes</p>
          <span className="text-[11px] text-slate-400">Grade 11-A & Grade 12-A</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium">Total Enrolled Scholars</span>
          <p className="text-2xl font-bold font-mono text-slate-900 mt-1">52 Students</p>
          <span className="text-[11px] text-emerald-600 font-medium">98.4% attendance today</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium">Active Problem Sets</span>
          <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{homework.length} Published</p>
          <span className="text-[11px] text-slate-400">Next due Oct 8</span>
        </div>
      </div>

      {/* Cohort Roster Snippet */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-900">Assigned Cohort: Grade 11 - Section A</h3>
          <span className="text-xs font-mono text-slate-400">{myStudents.length} Scholars</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {myStudents.map(s => (
            <div key={s.id} className="py-2.5 flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-900">{s.firstName} {s.lastName}</span>
                <span className="text-[11px] text-slate-400 font-mono ml-2">Roll #{s.rollNumber}</span>
              </div>
              <span className="font-mono text-emerald-700 font-semibold">{s.attendanceRate}% Attendance</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
