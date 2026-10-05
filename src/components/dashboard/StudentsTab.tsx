import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  GraduationCap, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  FileText,
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import { Student } from '../../types/index.js';
import { Button } from '../common/Button.js';
import { Modal } from '../common/Modal.js';
import { StatusIndicator } from '../common/Badge.js';
import { EmptyState } from '../common/EmptyState.js';

interface StudentsTabProps {
  students: Student[];
  onEnrollStudent: (data: any) => Promise<void>;
}

export const StudentsTab: React.FC<StudentsTabProps> = ({
  students,
  onEnrollStudent,
}) => {
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form State
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    gender: 'female',
    dateOfBirth: '2009-05-12',
    grade: 'Grade 11',
    section: 'A',
    rollNumber: '1109',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    address: '',
  });

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      if (gradeFilter !== 'all' && s.grade !== gradeFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          s.firstName.toLowerCase().includes(q) ||
          s.lastName.toLowerCase().includes(q) ||
          s.admissionNumber.toLowerCase().includes(q) ||
          s.rollNumber.toLowerCase().includes(q) ||
          s.guardianName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [students, gradeFilter, search]);

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onEnrollStudent(form);
      setIsEnrollModalOpen(false);
      setSuccessToast(`Student ${form.firstName} ${form.lastName} enrolled successfully`);
      setTimeout(() => setSuccessToast(null), 3500);
      setForm({
        firstName: '',
        lastName: '',
        gender: 'female',
        dateOfBirth: '2009-05-12',
        grade: 'Grade 11',
        section: 'A',
        rollNumber: '1109',
        guardianName: '',
        guardianPhone: '',
        guardianEmail: '',
        address: '',
      });
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {successToast && (
        <div className="p-4 rounded-xl bg-slate-900 text-white text-xs flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>{successToast}</span>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span>Student Information System (SIS)</span>
            <span>·</span>
            <span className="text-slate-900 font-medium">{students.length} Enrolled Scholars</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
            Academic Roster & Student Profiles
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsEnrollModalOpen(true)}
            icon={<Plus className="h-3.5 w-3.5" />}
          >
            Enroll New Student
          </Button>
        </div>
      </div>

      {/* Roster Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Search & Grade Filter */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search name, admission #, roll #, guardian..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 outline-none focus:border-slate-400 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={gradeFilter}
              onChange={e => setGradeFilter(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 outline-none"
            >
              <option value="all">All Cohorts / Grades</option>
              <option value="Grade 9">Grade 9 (Freshman)</option>
              <option value="Grade 10">Grade 10 (Sophomore)</option>
              <option value="Grade 11">Grade 11 (Junior)</option>
              <option value="Grade 12">Grade 12 (Senior)</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {filteredStudents.length === 0 ? (
            <div className="p-8">
              <EmptyState
                icon={<Users className="h-6 w-6" />}
                title="No Students Found"
                description="No student profiles match your search criteria. You can enroll a new student using the button above."
                actionLabel="Enroll First Student"
                onAction={() => setIsEnrollModalOpen(true)}
              />
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 font-medium font-mono text-[11px]">
                <tr>
                  <th className="py-3 px-4">Student Scholar</th>
                  <th className="py-3 px-4">Adm #</th>
                  <th className="py-3 px-4">Class & Sec</th>
                  <th className="py-3 px-4">Roll</th>
                  <th className="py-3 px-4">Primary Guardian</th>
                  <th className="py-3 px-4 text-center">Attendance</th>
                  <th className="py-3 px-4">Fee Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal text-slate-800">
                {filteredStudents.map(student => (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-semibold text-xs shrink-0">
                          {student.firstName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 leading-tight">
                            {student.firstName} {student.lastName}
                          </p>
                          <p className="text-[10px] text-slate-400 capitalize">{student.gender}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {student.admissionNumber}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">
                      {student.grade} - {student.section}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">
                      {student.rollNumber}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-slate-900 leading-tight">{student.guardianName}</p>
                      <p className="text-[11px] text-slate-400">{student.guardianPhone}</p>
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-medium text-slate-900 tabular-nums">
                      {student.attendanceRate}%
                    </td>
                    <td className="py-3 px-4">
                      <StatusIndicator status={student.feeStatus} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="text-xs font-medium text-slate-600 hover:text-slate-900 hover:underline cursor-pointer"
                      >
                        Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal: Enroll New Student */}
      <Modal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        title="Institutional Student Enrollment"
        subtitle="Registers student into academic roster and generates admission credential"
      >
        <form onSubmit={handleEnrollSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">First Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Liam"
                value={form.firstName}
                onChange={e => setForm({ ...form, firstName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Last Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Bennett"
                value={form.lastName}
                onChange={e => setForm({ ...form, lastName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Gender *</label>
              <select
                value={form.gender}
                onChange={e => setForm({ ...form, gender: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none bg-white"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Date of Birth *</label>
              <input
                type="date"
                required
                value={form.dateOfBirth}
                onChange={e => setForm({ ...form, dateOfBirth: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-mono"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Roll Number *</label>
              <input
                type="text"
                required
                placeholder="1108"
                value={form.rollNumber}
                onChange={e => setForm({ ...form, rollNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Grade / Cohort *</label>
              <select
                value={form.grade}
                onChange={e => setForm({ ...form, grade: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none bg-white"
              >
                <option value="Grade 9">Grade 9 (Freshman)</option>
                <option value="Grade 10">Grade 10 (Sophomore)</option>
                <option value="Grade 11">Grade 11 (Junior)</option>
                <option value="Grade 12">Grade 12 (Senior)</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Section *</label>
              <input
                type="text"
                required
                placeholder="A or B"
                value={form.section}
                onChange={e => setForm({ ...form, section: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none uppercase font-mono"
              />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3">
            <h4 className="font-semibold text-slate-900 mb-2">Guardian / Family Contact</h4>
            <div className="space-y-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Guardian Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Richard & Sarah Bennett"
                  value={form.guardianName}
                  onChange={e => setForm({ ...form, guardianName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Guardian Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (617) 555-0199"
                    value={form.guardianPhone}
                    onChange={e => setForm({ ...form, guardianPhone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Guardian Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="guardian@email.com"
                    value={form.guardianEmail}
                    onChange={e => setForm({ ...form, guardianEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Residential Address *</label>
                <input
                  type="text"
                  required
                  placeholder="Street, City, State, Postal Code"
                  value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsEnrollModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
              Complete Enrollment
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Student Profile Details */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`${selectedStudent.firstName} ${selectedStudent.lastName}`}
          subtitle={`Admission ID: ${selectedStudent.admissionNumber} · ${selectedStudent.grade}-${selectedStudent.section}`}
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 block">Class Roll</span>
                <span className="font-mono font-semibold text-slate-800">{selectedStudent.rollNumber}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Attendance Rate</span>
                <span className="font-mono font-semibold text-emerald-700">{selectedStudent.attendanceRate}%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Tuition Status</span>
                <StatusIndicator status={selectedStudent.feeStatus} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Enrollment</span>
                <span className="capitalize font-medium text-slate-800">{selectedStudent.status}</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <h4 className="font-semibold text-slate-900">Guardian & Household</h4>
              <div className="p-3 rounded-xl border border-slate-100 space-y-1.5">
                <p className="font-medium text-slate-800">{selectedStudent.guardianName}</p>
                <div className="flex items-center gap-4 text-slate-500">
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Phone className="h-3 w-3" /> {selectedStudent.guardianPhone}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Mail className="h-3 w-3" /> {selectedStudent.guardianEmail}
                  </span>
                </div>
                <p className="flex items-center gap-1 text-slate-500 text-[11px]">
                  <MapPin className="h-3 w-3 shrink-0" /> {selectedStudent.address}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button size="sm" variant="outline" onClick={() => setSelectedStudent(null)}>
                Close Record
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
