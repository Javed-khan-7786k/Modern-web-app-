import React, { useState, useMemo } from 'react';
import { 
  CalendarCheck, 
  Check, 
  Clock, 
  X, 
  FileText, 
  Save, 
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { Student, AttendanceRecord, AttendanceStatus } from '../../types/index.js';
import { Button } from '../common/Button.js';

interface AttendanceTabProps {
  students: Student[];
  initialAttendance: AttendanceRecord[];
  onSaveAttendance: (records: { studentId: string; date: string; status: AttendanceStatus; remarks?: string }[]) => Promise<void>;
}

export const AttendanceTab: React.FC<AttendanceTabProps> = ({
  students,
  initialAttendance,
  onSaveAttendance,
}) => {
  const [selectedDate, setSelectedDate] = useState('2026-10-04');
  const [selectedGrade, setSelectedGrade] = useState('Grade 11');
  const [selectedSection, setSelectedSection] = useState('A');
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter students for the current grade/section
  const cohortStudents = useMemo(() => {
    return students.filter(s => s.grade === selectedGrade && s.section === selectedSection);
  }, [students, selectedGrade, selectedSection]);

  // Local state map for attendance marks: studentId -> { status, remarks }
  const [attendanceMap, setAttendanceMap] = useState<Record<string, { status: AttendanceStatus; remarks: string }>>(() => {
    const map: Record<string, { status: AttendanceStatus; remarks: string }> = {};
    cohortStudents.forEach(s => {
      const existing = initialAttendance.find(a => a.studentId === s.id && a.date === '2026-10-04');
      map[s.id] = {
        status: existing ? existing.status : 'present',
        remarks: existing?.remarks || '',
      };
    });
    return map;
  });

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceMap(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status,
      },
    }));
  };

  const handleRemarksChange = (studentId: string, remarks: string) => {
    setAttendanceMap(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        remarks,
      },
    }));
  };

  const handleMarkAll = (status: AttendanceStatus) => {
    setAttendanceMap(prev => {
      const updated = { ...prev };
      cohortStudents.forEach(s => {
        updated[s.id] = {
          status,
          remarks: updated[s.id]?.remarks || '',
        };
      });
      return updated;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = cohortStudents.map(s => ({
        studentId: s.id,
        date: selectedDate,
        status: attendanceMap[s.id]?.status || 'present',
        remarks: attendanceMap[s.id]?.remarks || '',
      }));

      await onSaveAttendance(payload);
      setToastMessage(`Attendance for ${payload.length} students confirmed & logged`);
      setTimeout(() => setToastMessage(null), 3500);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Metrics
  const stats = useMemo(() => {
    let present = 0;
    let late = 0;
    let absent = 0;
    let excused = 0;

    cohortStudents.forEach(s => {
      const mark = attendanceMap[s.id]?.status || 'present';
      if (mark === 'present') present++;
      else if (mark === 'late') late++;
      else if (mark === 'absent') absent++;
      else if (mark === 'excused') excused++;
    });

    const total = cohortStudents.length || 1;
    return {
      present,
      late,
      absent,
      excused,
      presentRate: Math.round(((present + late) / total) * 100),
    };
  }, [cohortStudents, attendanceMap]);

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="p-4 rounded-xl bg-slate-900 text-white text-xs flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span>Classroom Clock & Roll Call</span>
            <span>·</span>
            <span className="text-slate-900 font-medium">{cohortStudents.length} Students in Cohort</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
            Daily Attendance Register
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleMarkAll('present')}
          >
            Mark All Present
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={handleSave}
            isLoading={isSaving}
            icon={<Save className="h-3.5 w-3.5" />}
          >
            Save Register
          </Button>
        </div>
      </div>

      {/* Control Filters Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span className="font-medium">Date:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="px-2.5 py-1 text-xs rounded-xl border border-slate-200 font-mono text-slate-900 outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="font-medium">Grade:</span>
            <select
              value={selectedGrade}
              onChange={e => setSelectedGrade(e.target.value)}
              className="px-2.5 py-1 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 outline-none"
            >
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 11">Grade 11</option>
              <option value="Grade 12">Grade 12</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="font-medium">Section:</span>
            <select
              value={selectedSection}
              onChange={e => setSelectedSection(e.target.value)}
              className="px-2.5 py-1 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 outline-none"
            >
              <option value="A">Section A</option>
              <option value="B">Section B</option>
            </select>
          </div>
        </div>

        {/* Quick Rate Indicator */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-emerald-700 font-semibold">{stats.present} Present</span>
          <span className="text-amber-700 font-semibold">{stats.late} Late</span>
          <span className="text-rose-700 font-semibold">{stats.absent} Absent</span>
          <span className="text-slate-500 font-semibold">{stats.excused} Excused</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-900 font-bold tabular-nums">{stats.presentRate}% Total</span>
        </div>
      </div>

      {/* Roster Attendance Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 font-medium font-mono text-[11px]">
            <tr>
              <th className="py-3 px-4">Roll</th>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Attendance Status</th>
              <th className="py-3 px-4">Remarks / Reason</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-normal text-slate-800">
            {cohortStudents.map(student => {
              const currentStatus = attendanceMap[student.id]?.status || 'present';
              const currentRemarks = attendanceMap[student.id]?.remarks || '';

              return (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-500">
                    {student.rollNumber}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900 leading-tight">
                      {student.firstName} {student.lastName}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">{student.admissionNumber}</p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-[11px]">
                      <button
                        type="button"
                        onClick={() => handleStatusChange(student.id, 'present')}
                        className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                          currentStatus === 'present'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Present
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStatusChange(student.id, 'late')}
                        className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                          currentStatus === 'late'
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Late
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStatusChange(student.id, 'absent')}
                        className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                          currentStatus === 'absent'
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Absent
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStatusChange(student.id, 'excused')}
                        className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                          currentStatus === 'excused'
                            ? 'bg-slate-700 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Excused
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      placeholder="Add proctor remarks if late/absent..."
                      value={currentRemarks}
                      onChange={e => handleRemarksChange(student.id, e.target.value)}
                      className="w-full max-w-sm px-2.5 py-1 text-xs rounded-lg border border-slate-200 outline-none focus:border-slate-400 bg-white"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
