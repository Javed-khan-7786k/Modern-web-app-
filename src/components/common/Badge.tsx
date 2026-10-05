import React from 'react';

interface StatusIndicatorProps {
  status: 'active' | 'paid' | 'partial' | 'pending' | 'overdue' | 'enrolled' | 'present' | 'absent' | 'late' | 'excused' | 'scheduled' | 'published' | 'grading' | 'in_progress';
  label?: string;
  showDot?: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, label, showDot = true }) => {
  const displayLabel = label || status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');

  const config: Record<string, { dot: string; text: string }> = {
    active: { dot: 'bg-emerald-500', text: 'text-emerald-700' },
    paid: { dot: 'bg-emerald-500', text: 'text-emerald-700' },
    present: { dot: 'bg-emerald-500', text: 'text-emerald-700' },
    enrolled: { dot: 'bg-emerald-500', text: 'text-emerald-700' },
    published: { dot: 'bg-emerald-500', text: 'text-emerald-700' },
    partial: { dot: 'bg-blue-500', text: 'text-blue-700' },
    grading: { dot: 'bg-amber-500', text: 'text-amber-700' },
    in_progress: { dot: 'bg-blue-500', text: 'text-blue-700' },
    pending: { dot: 'bg-amber-500', text: 'text-amber-700' },
    late: { dot: 'bg-amber-500', text: 'text-amber-700' },
    scheduled: { dot: 'bg-blue-500', text: 'text-blue-700' },
    overdue: { dot: 'bg-rose-500', text: 'text-rose-700' },
    absent: { dot: 'bg-rose-500', text: 'text-rose-700' },
    excused: { dot: 'bg-slate-400', text: 'text-slate-600' },
  };

  const current = config[status] || { dot: 'bg-slate-400', text: 'text-slate-600' };

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${current.text}`}>
      {showDot && <span className={`h-1.5 w-1.5 rounded-full ${current.dot}`} aria-hidden="true" />}
      <span>{displayLabel}</span>
    </span>
  );
};
