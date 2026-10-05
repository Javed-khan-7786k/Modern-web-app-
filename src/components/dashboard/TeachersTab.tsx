import React, { useState } from 'react';
import { Users, Plus, Search, Mail, Phone, BookOpen, CheckCircle2 } from 'lucide-react';
import { Teacher } from '../../types/index.js';
import { Button } from '../common/Button.js';
import { Modal } from '../common/Modal.js';
import { EmptyState } from '../common/EmptyState.js';

interface TeachersTabProps {
  teachers: Teacher[];
  onAppointTeacher: (data: any) => Promise<void>;
}

export const TeachersTab: React.FC<TeachersTabProps> = ({ teachers, onAppointTeacher }) => {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Natural Sciences & AP Physics',
    designation: 'Faculty Instructor',
    salary: 7500,
    assignedClasses: 'Grade 11 - Section A',
    assignedSubjects: 'Physics',
  });

  const filtered = teachers.filter(t => {
    if (deptFilter !== 'all' && !t.department.toLowerCase().includes(deptFilter.toLowerCase())) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.employeeCode.toLowerCase().includes(q) ||
        t.department.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onAppointTeacher({
        ...form,
        assignedClasses: form.assignedClasses.split(',').map(s => s.trim()),
        assignedSubjects: form.assignedSubjects.split(',').map(s => s.trim()),
        salary: Number(form.salary),
      });
      setIsModalOpen(false);
      setToastMessage(`Faculty ${form.name} appointed successfully`);
      setTimeout(() => setToastMessage(null), 3500);
      setForm({
        name: '',
        email: '',
        phone: '',
        department: 'Natural Sciences & AP Physics',
        designation: 'Faculty Instructor',
        salary: 7500,
        assignedClasses: 'Grade 11 - Section A',
        assignedSubjects: 'Physics',
      });
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="p-4 rounded-xl bg-slate-900 text-white text-xs flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span>Academic Faculty & Staff Directory</span>
            <span>·</span>
            <span className="text-slate-900 font-medium">{teachers.length} Active Educators</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
            Faculty Directory & Department Roster
          </h2>
        </div>
        <Button
          size="sm"
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          icon={<Plus className="h-3.5 w-3.5" />}
        >
          Appoint Faculty
        </Button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search faculty name, code, department..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 outline-none focus:border-slate-400 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={deptFilter}
              onChange={e => setDeptFilter(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 outline-none"
            >
              <option value="all">All Departments</option>
              <option value="physics">Natural Sciences / Physics</option>
              <option value="math">Mathematics</option>
              <option value="humanities">Humanities</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          {filtered.length === 0 ? (
            <div className="p-8">
              <EmptyState
                icon={<Users className="h-6 w-6" />}
                title="No Faculty Found"
                description="No faculty members match your search criteria. Appoint an educator to get started."
                actionLabel="Appoint First Faculty"
                onAction={() => setIsModalOpen(true)}
              />
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 font-medium font-mono text-[11px]">
                <tr>
                  <th className="py-3 px-4">Faculty Member</th>
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Department & Designation</th>
                  <th className="py-3 px-4">Assigned Subjects</th>
                  <th className="py-3 px-4 text-right">Compensation ($)</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal text-slate-800">
                {filtered.map(tch => (
                  <tr key={tch.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-semibold text-xs shrink-0">
                          {tch.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 leading-tight">{tch.name}</p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                            <span>{tch.email}</span>
                            <span>·</span>
                            <span>{tch.phone}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500 font-medium">
                      {tch.employeeCode}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-slate-900">{tch.designation}</p>
                      <p className="text-[11px] text-slate-500">{tch.department}</p>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {tch.assignedSubjects.map((sub, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-900 font-medium">
                      ${tch.salary.toLocaleString(undefined, { minimumFractionDigits: 2 })}/mo
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span>Active</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal: Appoint Faculty */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Appoint Academic Faculty"
        subtitle="Registers faculty instructor into institutional roster and payroll ledger"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Full Legal Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Prof. Arthur Vance, Ph.D."
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Faculty Email *</label>
              <input
                type="email"
                required
                placeholder="faculty@aethel.edu"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Direct Phone *</label>
              <input
                type="tel"
                required
                placeholder="+1 (617) 555-0100"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Department *</label>
              <input
                type="text"
                required
                value={form.department}
                onChange={e => setForm({ ...form, department: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Designation *</label>
              <input
                type="text"
                required
                value={form.designation}
                onChange={e => setForm({ ...form, designation: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Monthly Base Salary ($) *</label>
              <input
                type="number"
                required
                value={form.salary}
                onChange={e => setForm({ ...form, salary: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-mono"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Assigned Subjects (comma separated)</label>
              <input
                type="text"
                value={form.assignedSubjects}
                onChange={e => setForm({ ...form, assignedSubjects: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
              Appoint & Issue Credentials
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
