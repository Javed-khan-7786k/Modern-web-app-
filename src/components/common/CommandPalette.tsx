import React, { useEffect, useState } from 'react';
import { Search, ArrowRight, UserPlus, Receipt, BookOpen, Layers } from 'lucide-react';
import { DashboardView } from '../../types/index.js';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: DashboardView) => void;
  onAction: (actionKey: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onAction,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickActions = [
    { id: 'view_overview', label: 'Go to Executive Overview', icon: Layers, view: 'overview' as DashboardView },
    { id: 'view_ledgers', label: 'Go to Financial Ledgers & Cashflow', icon: Receipt, view: 'ledgers' as DashboardView },
    { id: 'new_transaction', label: 'Record New Ledger Transaction', icon: Receipt, action: 'record_tx' },
    { id: 'new_student', label: 'Enroll New Student Record', icon: UserPlus, action: 'new_student' },
    { id: 'view_attendance', label: 'Take Classroom Attendance', icon: BookOpen, view: 'attendance' as DashboardView },
    { id: 'view_fees', label: 'Review Outstanding Fee Invoices', icon: Receipt, view: 'fees' as DashboardView },
    { id: 'view_exams', label: 'Exams & Assessment Term Schedule', icon: BookOpen, view: 'exams' as DashboardView },
  ];

  const filtered = quickActions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-100">
        <div className="flex items-center px-4 border-b border-slate-100">
          <Search className="h-4 w-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search commands, ledgers, or students... (ESC to exit)"
            className="w-full px-3 py-3.5 text-sm bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
            autoFocus
          />
          <kbd className="hidden sm:inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded border border-slate-200">ESC</kbd>
        </div>

        <div className="p-2 max-h-72 overflow-y-auto">
          <div className="px-2 py-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Navigation & Quick Workflows
          </div>
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400">No matching command found</div>
          ) : (
            filtered.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.view) onNavigate(item.view);
                    if (item.action) onAction(item.action);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-slate-50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-slate-500 group-hover:text-slate-900 transition-colors" />
                    <span className="text-xs font-medium text-slate-800 group-hover:text-slate-900">
                      {item.label}
                    </span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-700 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
