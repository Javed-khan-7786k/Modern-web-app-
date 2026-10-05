import React, { useState } from 'react';
import { BookOpen, Plus, Calendar, CheckCircle2, Search } from 'lucide-react';
import { Homework } from '../../types/index.js';
import { Button } from '../common/Button.js';
import { Modal } from '../common/Modal.js';
import { EmptyState } from '../common/EmptyState.js';

interface HomeworkTabProps {
  homework: Homework[];
  onAssignHomework: (data: any) => Promise<void>;
}

export const HomeworkTab: React.FC<HomeworkTabProps> = ({ homework, onAssignHomework }) => {
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    subject: 'AP Physics C',
    grade: 'Grade 11',
    section: 'A',
    description: '',
    dueDate: '2026-10-15',
    assignedBy: 'Prof. Marcus Vance',
  });

  const filtered = homework.filter(h => {
    if (gradeFilter !== 'all' && h.grade !== gradeFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        h.title.toLowerCase().includes(q) ||
        h.subject.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onAssignHomework(form);
      setIsModalOpen(false);
      setToastMessage('Homework coursework assigned to cohort');
      setTimeout(() => setToastMessage(null), 3500);
      setForm({
        title: '',
        subject: 'AP Physics C',
        grade: 'Grade 11',
        section: 'A',
        description: '',
        dueDate: '2026-10-15',
        assignedBy: 'Prof. Marcus Vance',
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

      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span>Academic Coursework & Assignments</span>
            <span>·</span>
            <span className="text-slate-900 font-medium">{homework.length} Active Problem Sets</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
            Homework & Digital Submissions
          </h2>
        </div>
        <Button
          size="sm"
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          icon={<Plus className="h-3.5 w-3.5" />}
        >
          Publish Assignment
        </Button>
      </div>

      {/* Homework Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(item => {
          const submissionRate = Math.round((item.submissionsCount / item.totalStudents) * 100);
          return (
            <div key={item.id} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>{item.subject}</span>
                  <span>{item.grade} - {item.section}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-1">{item.title}</h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="flex justify-between text-xs mb-1.5 font-mono">
                  <span className="text-slate-500">Submissions</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    {item.submissionsCount} / {item.totalStudents} ({submissionRate}%)
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden mb-3">
                  <div
                    className="h-full bg-slate-900 rounded-full"
                    style={{ width: `${submissionRate}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono">Due: {item.dueDate}</span>
                  <span>By {item.assignedBy}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Publish Assignment */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Publish Coursework Assignment"
        subtitle="Notifies students and guardians with coursework criteria and due date"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Assignment Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Newton Laws of Motion Problem Set 2"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Subject *</label>
              <input
                type="text"
                required
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Due Date *</label>
              <input
                type="date"
                required
                value={form.dueDate}
                onChange={e => setForm({ ...form, dueDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Grade Cohort *</label>
              <select
                value={form.grade}
                onChange={e => setForm({ ...form, grade: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none bg-white"
              >
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Section *</label>
              <input
                type="text"
                required
                value={form.section}
                onChange={e => setForm({ ...form, section: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none uppercase font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Instructions & Problem Set Details *</label>
            <textarea
              rows={3}
              required
              placeholder="List problem numbers, references to textbook chapters, and submission format..."
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
              Publish & Notify Students
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
