import React from 'react';
import { X, CheckCircle2, AlertCircle, Info, Bell } from 'lucide-react';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white border-l border-slate-200 shadow-xl flex flex-col animate-in slide-in-from-right duration-200">
      <div className="flex items-center justify-between p-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-slate-700" />
          <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
          <span className="text-xs text-slate-400 font-mono">({notifications.filter(n => !n.read).length})</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onMarkAllAsRead}
            className="text-xs text-slate-500 hover:text-slate-900 transition-colors"
          >
            Mark read
          </button>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            aria-label="Close notifications"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            No notifications at this time
          </div>
        ) : (
          notifications.map(item => (
            <div
              key={item.id}
              className={`p-4 transition-colors hover:bg-slate-50/70 flex gap-3 ${
                !item.read ? 'bg-slate-50/40' : ''
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {item.type === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                {item.type === 'warning' && <AlertCircle className="h-4 w-4 text-amber-500" />}
                {item.type === 'info' && <Info className="h-4 w-4 text-blue-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.description}</p>
                <span className="text-[11px] text-slate-400 mt-1.5 block font-mono">{item.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
