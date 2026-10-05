import React, { useState } from 'react';
import { CreditCard, CheckCircle2, Search, Printer, DollarSign, ArrowUpRight } from 'lucide-react';
import { PayrollRecord } from '../../types/index.js';
import { Button } from '../common/Button.js';
import { Modal } from '../common/Modal.js';
import { StatusIndicator } from '../common/Badge.js';

interface PayrollTabProps {
  payroll: PayrollRecord[];
  onDisbursePayroll: (id: string) => Promise<void>;
}

export const PayrollTab: React.FC<PayrollTabProps> = ({ payroll, onDisbursePayroll }) => {
  const [search, setSearch] = useState('');
  const [selectedSlip, setSelectedSlip] = useState<PayrollRecord | null>(null);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filtered = payroll.filter(p => {
    if (search) {
      const q = search.toLowerCase();
      return (
        p.employeeName.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q) ||
        p.month.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalDisbursed = payroll
    .filter(p => p.status === 'paid')
    .reduce((acc, p) => acc + p.netPayable, 0);

  const totalPending = payroll
    .filter(p => p.status === 'pending')
    .reduce((acc, p) => acc + p.netPayable, 0);

  const handleDisburse = async (id: string) => {
    setIsProcessing(id);
    try {
      await onDisbursePayroll(id);
      setToastMessage('Compensation disbursed and debited to General Ledger EXP-201');
      setTimeout(() => setToastMessage(null), 3500);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsProcessing(null);
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
            <span>Treasury & Human Resources</span>
            <span>·</span>
            <span className="text-slate-900 font-medium">Synced with Ledger EXP-201</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
            Faculty & Staff Payroll Register
          </h2>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-400 block text-[10px]">Total Disbursed</span>
            <span className="font-bold text-slate-900 tabular-nums">
              ${totalDisbursed.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="border-l border-slate-200 pl-4">
            <span className="text-slate-400 block text-[10px]">Pending Approval</span>
            <span className="font-bold text-amber-700 tabular-nums">
              ${totalPending.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search faculty name, department, month..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 outline-none focus:border-slate-400 focus:bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 font-medium font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4">Pay Period</th>
                <th className="py-3 px-4">Faculty Member</th>
                <th className="py-3 px-4">Department & Title</th>
                <th className="py-3 px-4 text-right">Base ($)</th>
                <th className="py-3 px-4 text-right">Allowances</th>
                <th className="py-3 px-4 text-right">Deductions</th>
                <th className="py-3 px-4 text-right">Net Payable ($)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal text-slate-800">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-500">
                    {item.month} {item.year}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {item.employeeName}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-slate-900">{item.designation}</p>
                    <p className="text-[10px] text-slate-400">{item.department}</p>
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-900">
                    ${item.basicSalary.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums text-emerald-700">
                    +${item.allowances.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums text-rose-700">
                    -${item.deductions.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums font-bold text-slate-900">
                    ${item.netPayable.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4">
                    <StatusIndicator status={item.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    {item.status === 'pending' ? (
                      <Button
                        size="sm"
                        variant="primary"
                        isLoading={isProcessing === item.id}
                        onClick={() => handleDisburse(item.id)}
                      >
                        Disburse
                      </Button>
                    ) : (
                      <button
                        onClick={() => setSelectedSlip(item)}
                        className="text-xs font-medium text-slate-600 hover:text-slate-900 hover:underline cursor-pointer"
                      >
                        Payslip
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Official Payslip Voucher */}
      {selectedSlip && (
        <Modal
          isOpen={!!selectedSlip}
          onClose={() => setSelectedSlip(null)}
          title={`Official Remuneration Payslip: ${selectedSlip.employeeName}`}
          subtitle={`Pay Period: ${selectedSlip.month} ${selectedSlip.year} · Ref: ${selectedSlip.voucherNumber}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">{selectedSlip.employeeName}</p>
                <p className="text-[11px] text-slate-500">{selectedSlip.designation} · {selectedSlip.department}</p>
              </div>
              <div className="text-right font-mono">
                <span className="text-[10px] text-slate-400 block">Net Disbursed</span>
                <span className="text-base font-bold text-slate-900">
                  ${selectedSlip.netPayable.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="border border-slate-100 rounded-xl divide-y divide-slate-100">
              <div className="p-2.5 flex justify-between">
                <span className="text-slate-500">Base Contract Salary</span>
                <span className="font-mono text-slate-900">${selectedSlip.basicSalary.toLocaleString()}</span>
              </div>
              <div className="p-2.5 flex justify-between">
                <span className="text-slate-500">Academic & Lab Allowances</span>
                <span className="font-mono text-emerald-700">+${selectedSlip.allowances.toLocaleString()}</span>
              </div>
              <div className="p-2.5 flex justify-between">
                <span className="text-slate-500">Statutory Tax & Pension Deductions</span>
                <span className="font-mono text-rose-700">-${selectedSlip.deductions.toLocaleString()}</span>
              </div>
              <div className="p-2.5 flex justify-between bg-slate-50 font-bold">
                <span className="text-slate-900">Total Net Disbursed</span>
                <span className="font-mono text-slate-900">${selectedSlip.netPayable.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button size="sm" variant="outline" onClick={() => setSelectedSlip(null)}>
                Close
              </Button>
              <Button size="sm" variant="primary" onClick={() => window.print()} icon={<Printer className="h-3.5 w-3.5" />}>
                Print Official Payslip
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
