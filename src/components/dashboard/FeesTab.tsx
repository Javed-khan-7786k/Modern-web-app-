import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  Receipt, 
  CheckCircle2, 
  ArrowUpRight,
  DollarSign
} from 'lucide-react';
import { FeeInvoice, Ledger, PaymentMethod } from '../../types/index.js';
import { Button } from '../common/Button.js';
import { Modal } from '../common/Modal.js';
import { StatusIndicator } from '../common/Badge.js';

interface FeesTabProps {
  fees: FeeInvoice[];
  ledgers: Ledger[];
  onCollectPayment: (data: {
    feeId: string;
    amount: number;
    paymentMethod: PaymentMethod;
    referenceNumber: string;
    ledgerId: string;
  }) => Promise<void>;
}

export const FeesTab: React.FC<FeesTabProps> = ({
  fees,
  ledgers,
  onCollectPayment,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedFee, setSelectedFee] = useState<FeeInvoice | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Payment form state
  const [paymentForm, setPaymentForm] = useState({
    amount: 0,
    paymentMethod: 'bank_transfer' as PaymentMethod,
    referenceNumber: `REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    ledgerId: ledgers.find(l => l.code === 'REV-101')?.id || ledgers[0]?.id || '',
  });

  const filteredFees = fees.filter(f => {
    if (statusFilter !== 'all' && f.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        f.studentName.toLowerCase().includes(q) ||
        f.title.toLowerCase().includes(q) ||
        (f.receiptNumber && f.receiptNumber.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const totalOutstanding = fees.reduce((acc, f) => acc + f.dueAmount, 0);
  const totalCollected = fees.reduce((acc, f) => acc + f.paidAmount, 0);

  const handleOpenPayment = (fee: FeeInvoice) => {
    setSelectedFee(fee);
    setPaymentForm({
      amount: fee.dueAmount,
      paymentMethod: 'bank_transfer',
      referenceNumber: `REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      ledgerId: fee.ledgerId || ledgers[0]?.id || '',
    });
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFee) return;

    setIsSubmitting(true);
    try {
      await onCollectPayment({
        feeId: selectedFee.id,
        amount: Number(paymentForm.amount),
        paymentMethod: paymentForm.paymentMethod,
        referenceNumber: paymentForm.referenceNumber,
        ledgerId: paymentForm.ledgerId,
      });

      setSelectedFee(null);
      setToastMessage('Payment successfully captured & general ledger credited');
      setTimeout(() => setToastMessage(null), 3500);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
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
            <span>Bursar & Revenue Operations</span>
            <span>·</span>
            <span className="text-slate-900 font-medium">Synced with General Ledger</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
            Student Fee Schedules & Invoices
          </h2>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-400 block text-[10px]">Total Collected</span>
            <span className="font-bold text-emerald-700 tabular-nums">
              ${totalCollected.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="border-l border-slate-200 pl-4">
            <span className="text-slate-400 block text-[10px]">Total Due / Outstanding</span>
            <span className="font-bold text-rose-700 tabular-nums">
              ${totalOutstanding.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Search & Filter */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search scholar name, title, receipt..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 outline-none focus:border-slate-400 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 outline-none"
            >
              <option value="all">All Invoice Statuses</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
              <option value="paid">Paid in Full</option>
            </select>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 font-medium font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4">Invoice Schedule</th>
                <th className="py-3 px-4">Student Scholar</th>
                <th className="py-3 px-4">Grade</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4 text-right">Invoice ($)</th>
                <th className="py-3 px-4 text-right">Paid ($)</th>
                <th className="py-3 px-4 text-right">Balance Due</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal text-slate-800">
              {filteredFees.map(fee => (
                <tr key={fee.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900 leading-tight">{fee.title}</p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {fee.receiptNumber ? `Receipt: ${fee.receiptNumber}` : 'Pending Settlement'}
                    </p>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900">
                    {fee.studentName}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {fee.grade}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500">
                    {fee.dueDate}
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-900">
                    ${fee.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums text-emerald-700 font-medium">
                    ${fee.paidAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums font-semibold text-slate-900">
                    ${fee.dueAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4">
                    <StatusIndicator status={fee.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    {fee.dueAmount > 0 ? (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleOpenPayment(fee)}
                      >
                        Collect
                      </Button>
                    ) : (
                      <span className="text-[11px] font-mono text-emerald-600 font-medium">Settled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collect Fee Modal */}
      {selectedFee && (
        <Modal
          isOpen={!!selectedFee}
          onClose={() => setSelectedFee(null)}
          title={`Collect Payment for ${selectedFee.studentName}`}
          subtitle={`${selectedFee.title} · Outstanding Due: $${selectedFee.dueAmount.toLocaleString()}`}
        >
          <form onSubmit={handlePaymentSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Target Revenue Ledger *</label>
              <select
                required
                value={paymentForm.ledgerId}
                onChange={e => setPaymentForm({ ...paymentForm, ledgerId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none bg-white"
              >
                {ledgers.map(l => (
                  <option key={l.id} value={l.id}>
                    {l.code} - {l.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Collection Amount ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  max={selectedFee.dueAmount}
                  required
                  value={paymentForm.amount}
                  onChange={e => setPaymentForm({ ...paymentForm, amount: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Payment Method *</label>
                <select
                  value={paymentForm.paymentMethod}
                  onChange={e => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value as PaymentMethod })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none bg-white"
                >
                  <option value="bank_transfer">Direct Bank Wire / ACH</option>
                  <option value="online_gateway">Online Card Gateway</option>
                  <option value="cash">Bursar Cash Office</option>
                  <option value="cheque">Cashier Cheque</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Receipt / Voucher Number *</label>
              <input
                type="text"
                required
                value={paymentForm.referenceNumber}
                onChange={e => setPaymentForm({ ...paymentForm, referenceNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-mono"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="outline" size="sm" onClick={() => setSelectedFee(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
                Record & Issue Receipt
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
