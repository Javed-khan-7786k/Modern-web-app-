import React, { useState } from 'react';
import { ShieldCheck, Search, Download, Filter, User } from 'lucide-react';
import { AuditLog } from '../../types/index.js';
import { Button } from '../common/Button.js';

interface AuditLogsTabProps {
  logs: AuditLog[];
}

export const AuditLogsTab: React.FC<AuditLogsTabProps> = ({ logs }) => {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('all');

  const filteredLogs = logs.filter(l => {
    if (actionFilter !== 'all' && l.action !== actionFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        l.details.toLowerCase().includes(q) ||
        l.userName.toLowerCase().includes(q) ||
        l.resource.toLowerCase().includes(q) ||
        l.ipAddress.includes(q)
      );
    }
    return true;
  });

  const handleExportLogs = () => {
    const headers = ['Timestamp', 'User', 'Role', 'Action', 'Resource', 'Details', 'IP Address'];
    const rows = filteredLogs.map(l => [
      l.timestamp,
      `"${l.userName}"`,
      l.userRole,
      l.action,
      l.resource,
      `"${l.details}"`,
      l.ipAddress,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aethel_audit_trail_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const actionColors: Record<string, string> = {
    CREATE: 'text-emerald-700 bg-emerald-50',
    UPDATE: 'text-blue-700 bg-blue-50',
    DELETE: 'text-rose-700 bg-rose-50',
    PAYMENT: 'text-purple-700 bg-purple-50',
    LOGIN: 'text-slate-700 bg-slate-100',
    EXPORT: 'text-amber-700 bg-amber-50',
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span>Enterprise Compliance & Forensic Records</span>
            <span>·</span>
            <span className="text-slate-900 font-medium">{logs.length} Immutable Events</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
            Security & Operational Audit Trail
          </h2>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={handleExportLogs}
          icon={<Download className="h-3.5 w-3.5" />}
        >
          Export Forensic Log
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
              placeholder="Search user, action details, IP address..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 outline-none focus:border-slate-400 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={actionFilter}
              onChange={e => setActionFilter(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 outline-none"
            >
              <option value="all">All Sensitive Actions</option>
              <option value="CREATE">CREATE</option>
              <option value="UPDATE">UPDATE</option>
              <option value="PAYMENT">PAYMENT</option>
              <option value="LOGIN">LOGIN</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 font-medium font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4">Timestamp (UTC)</th>
                <th className="py-3 px-4">Staff / User</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Resource</th>
                <th className="py-3 px-4">Forensic Details</th>
                <th className="py-3 px-4 text-right">Origin IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal text-slate-800">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-500 whitespace-nowrap text-[11px]">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900 leading-tight">{log.userName}</p>
                    <p className="text-[10px] text-slate-400 capitalize">{log.userRole.replace('_', ' ')}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${actionColors[log.action] || 'bg-slate-100 text-slate-700'}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700">
                    {log.resource}
                  </td>
                  <td className="py-3 px-4 max-w-md text-slate-700">
                    {log.details}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate-400">
                    {log.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
