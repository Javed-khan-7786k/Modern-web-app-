import React, { useState } from 'react';
import { Bell, Plus, Pin, Calendar, CheckCircle2, Search } from 'lucide-react';
import { Notice } from '../../types/index.js';
import { Button } from '../common/Button.js';
import { Modal } from '../common/Modal.js';

interface NoticesTabProps {
  notices: Notice[];
  onBroadcastNotice: (data: any) => Promise<void>;
}

export const NoticesTab: React.FC<NoticesTabProps> = ({ notices, onBroadcastNotice }) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    content: '',
    category: 'academic' as const,
    targetAudience: 'all' as const,
    author: 'Elena Rostova, M.Ed.',
    pinned: false,
  });

  const filtered = notices.filter(n => {
    if (categoryFilter !== 'all' && n.category !== categoryFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q);
    }
    return true;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onBroadcastNotice(form);
      setIsModalOpen(false);
      setToastMessage('Institutional bulletin dispatched to audience');
      setTimeout(() => setToastMessage(null), 3500);
      setForm({
        title: '',
        content: '',
        category: 'academic',
        targetAudience: 'all',
        author: 'Elena Rostova, M.Ed.',
        pinned: false,
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
            <span>Academy Communications & Circulars</span>
            <span>·</span>
            <span className="text-slate-900 font-medium">{notices.length} Bulletins Active</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
            Notices & Campus Broadcasts
          </h2>
        </div>
        <Button
          size="sm"
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          icon={<Plus className="h-3.5 w-3.5" />}
        >
          Broadcast Notice
        </Button>
      </div>

      {/* Notices Feed */}
      <div className="space-y-4">
        {filtered.map(item => (
          <div
            key={item.id}
            className={`p-6 rounded-2xl bg-white border transition-all ${
              item.pinned ? 'border-slate-900 shadow-sm ring-1 ring-slate-900/10' : 'border-slate-200 shadow-2xs'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <span className="uppercase font-semibold text-slate-700">{item.category}</span>
                  <span>·</span>
                  <span>Audience: {item.targetAudience.toUpperCase()}</span>
                  <span>·</span>
                  <span>{item.date}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1 flex items-center gap-2">
                  {item.title}
                  {item.pinned && (
                    <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-normal flex items-center gap-1">
                      <Pin className="h-3 w-3" /> Pinned
                    </span>
                  )}
                </h3>
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-600 leading-relaxed max-w-4xl">
              {item.content}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Authorized by {item.author}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Broadcast Notice */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Broadcast Institutional Notice"
        subtitle="Dispatches circular to target audience and notifies student/parent portals"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Notice Headline *</label>
            <input
              type="text"
              required
              placeholder="e.g. Schedule Update for Term 1 Final Examinations"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Category *</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none bg-white"
              >
                <option value="academic">Academic Circular</option>
                <option value="administrative">Administrative & Facilities</option>
                <option value="sports">Athletics & Extracurricular</option>
                <option value="urgent">Urgent Advisory</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Target Audience *</label>
              <select
                value={form.targetAudience}
                onChange={e => setForm({ ...form, targetAudience: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none bg-white"
              >
                <option value="all">Entire Academy Community</option>
                <option value="teachers">Faculty & Staff Only</option>
                <option value="students">Students Only</option>
                <option value="parents">Parents / Guardians Only</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Circular Content *</label>
            <textarea
              rows={4}
              required
              placeholder="Full text of the institutional advisory..."
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none leading-relaxed"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="pinnedNotice"
              checked={form.pinned}
              onChange={e => setForm({ ...form, pinned: e.target.checked })}
              className="h-4 w-4 rounded text-slate-900"
            />
            <label htmlFor="pinnedNotice" className="text-slate-700 font-medium">
              Pin to top of campus dashboard feeds
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
              Broadcast Notice
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
