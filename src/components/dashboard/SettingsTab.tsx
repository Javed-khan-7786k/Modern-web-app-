import React, { useState } from 'react';
import { Settings, School, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button.js';

export const SettingsTab: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    schoolName: 'Aethel Academy of Science & Arts',
    code: 'AETHEL-01',
    academicYear: '2026-2027',
    currency: 'USD ($)',
    address: '450 University Crest Ave, Cambridge, MA 02138',
    phone: '+1 (617) 890-4421',
    email: 'admissions@aethelacademy.edu',
    retentionDays: '365',
    strictDoubleEntry: true,
    twoFactorRequired: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage('Institutional settings updated');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {toastMessage && (
        <div className="p-4 rounded-xl bg-slate-900 text-white text-xs flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Institutional Configuration</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Academy profile, global accounting currencies, and compliance policies
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4 text-xs">
          <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">
            Academy Profile
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Institution Legal Name</label>
              <input
                type="text"
                value={form.schoolName}
                onChange={e => setForm({ ...form, schoolName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Institutional Code</label>
              <input
                type="text"
                value={form.code}
                onChange={e => setForm({ ...form, code: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Active Academic Year</label>
              <input
                type="text"
                value={form.academicYear}
                onChange={e => setForm({ ...form, academicYear: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Accounting Base Currency</label>
              <input
                type="text"
                value={form.currency}
                onChange={e => setForm({ ...form, currency: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Campus Address</label>
            <input
              type="text"
              value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
            />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4 text-xs">
          <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">
            Financial & Security Governance
          </h3>

          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <p className="font-semibold text-slate-900">Enforce Strict Double-Entry Reconciliation</p>
              <p className="text-slate-500 text-[11px]">Require balanced debit/credit voucher before committing ledger transactions</p>
            </div>
            <input
              type="checkbox"
              checked={form.strictDoubleEntry}
              onChange={e => setForm({ ...form, strictDoubleEntry: e.target.checked })}
              className="h-4 w-4 rounded text-slate-900"
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-semibold text-slate-900">Two-Factor Security for Financial Disbursals</p>
              <p className="text-slate-500 text-[11px]">Enforce hardware token or authenticator app for transactions over $10,000</p>
            </div>
            <input
              type="checkbox"
              checked={form.twoFactorRequired}
              onChange={e => setForm({ ...form, twoFactorRequired: e.target.checked })}
              className="h-4 w-4 rounded text-slate-900"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="md">
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
};
