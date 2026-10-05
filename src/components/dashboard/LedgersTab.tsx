import React, { useState, useMemo } from 'react';
import { 
  Receipt, 
  Plus, 
  Search, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Download, 
  Printer, 
  Filter, 
  FileSpreadsheet,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { Ledger, LedgerTransaction, LedgerType, PaymentMethod, TransactionType } from '../../types/index.js';
import { Button } from '../common/Button.js';
import { Modal } from '../common/Modal.js';
import { EmptyState } from '../common/EmptyState.js';

interface LedgersTabProps {
  ledgers: Ledger[];
  transactions: LedgerTransaction[];
  onCreateLedger: (data: {
    name: string;
    code: string;
    type: LedgerType;
    description: string;
    openingBalance: number;
  }) => Promise<void>;
  onCreateTransaction: (data: {
    ledgerId: string;
    type: TransactionType;
    amount: number;
    date: string;
    category: string;
    paymentMethod: PaymentMethod;
    referenceNumber: string;
    description: string;
  }) => Promise<void>;
  isModalOpen?: boolean;
  onCloseModal?: () => void;
}

export const LedgersTab: React.FC<LedgersTabProps> = ({
  ledgers,
  transactions,
  onCreateLedger,
  onCreateTransaction,
}) => {
  const [selectedLedgerId, setSelectedLedgerId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  // Modals
  const [isLedgerModalOpen, setIsLedgerModalOpen] = useState(false);
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // New Ledger Form State
  const [ledgerForm, setLedgerForm] = useState({
    name: '',
    code: '',
    type: 'expense' as LedgerType,
    description: '',
    openingBalance: 0,
  });

  // New Transaction Form State
  const [txForm, setTxForm] = useState({
    ledgerId: ledgers[0]?.id || '',
    type: 'expense' as TransactionType,
    amount: 100,
    date: new Date().toISOString().split('T')[0],
    category: 'Operational',
    paymentMethod: 'bank_transfer' as PaymentMethod,
    referenceNumber: `REF-${Math.floor(10000 + Math.random() * 90000)}`,
    description: '',
  });

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      if (selectedLedgerId !== 'all' && t.ledgerId !== selectedLedgerId) return false;
      if (typeFilter !== 'all' && t.type !== typeFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          t.referenceNumber.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.ledgerName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [transactions, selectedLedgerId, typeFilter, searchQuery]);

  // Aggregate totals
  const totalBalance = useMemo(() => {
    return ledgers.reduce((acc, l) => acc + l.currentBalance, 0);
  }, [ledgers]);

  const handleCreateLedgerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onCreateLedger(ledgerForm);
      setIsLedgerModalOpen(false);
      setSuccessToast(`Ledger ${ledgerForm.name} created successfully`);
      setTimeout(() => setSuccessToast(null), 3500);
      setLedgerForm({ name: '', code: '', type: 'expense', description: '', openingBalance: 0 });
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateTxSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onCreateTransaction({
        ...txForm,
        amount: Number(txForm.amount),
      });
      setIsTxModalOpen(false);
      setSuccessToast('Transaction recorded & ledger balance verified');
      setTimeout(() => setSuccessToast(null), 3500);
      setTxForm({
        ledgerId: ledgers[0]?.id || '',
        type: 'expense',
        amount: 100,
        date: new Date().toISOString().split('T')[0],
        category: 'Operational',
        paymentMethod: 'bank_transfer',
        referenceNumber: `REF-${Math.floor(10000 + Math.random() * 90000)}`,
        description: '',
      });
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Date', 'Reference', 'Ledger', 'Type', 'Category', 'Payment Method', 'Amount', 'Balance After', 'Description'];
    const rows = filteredTransactions.map(t => [
      t.date.split('T')[0],
      t.referenceNumber,
      `"${t.ledgerName}"`,
      t.type,
      `"${t.category}"`,
      t.paymentMethod,
      t.amount,
      t.balanceAfter,
      `"${t.description}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aethel_ledger_statement_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintStatement = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {successToast && (
        <div className="p-4 rounded-xl bg-slate-900 text-white text-xs flex items-center justify-between shadow-lg animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>{successToast}</span>
          </div>
        </div>
      )}

      {/* Top Banner & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span>Chart of Accounts</span>
            <span>·</span>
            <span className="text-slate-900 font-medium">8 Cost Centers</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
            General Accounting & Ledger Statement
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleExportCSV}
            icon={<Download className="h-3.5 w-3.5" />}
          >
            Export CSV
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handlePrintStatement}
            icon={<Printer className="h-3.5 w-3.5" />}
          >
            Print Statement
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsLedgerModalOpen(true)}
            icon={<Plus className="h-3.5 w-3.5" />}
          >
            New Ledger
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsTxModalOpen(true)}
            icon={<Plus className="h-3.5 w-3.5" />}
          >
            Post Transaction
          </Button>
        </div>
      </div>

      {/* Ledgers Summary Grid (Tuition, Electricity, Salary, Transport, Stationery, Maintenance, Rent, Other) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ledgers.map(ledger => {
          const isSelected = selectedLedgerId === ledger.id;
          const isRev = ledger.type === 'revenue' || ledger.type === 'asset';
          return (
            <div
              key={ledger.id}
              onClick={() => setSelectedLedgerId(isSelected ? 'all' : ledger.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer select-none ${
                isSelected
                  ? 'border-slate-900 bg-slate-50/90 ring-1 ring-slate-900'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{ledger.code}</span>
                <span className="capitalize text-[10px] text-slate-500">{ledger.type}</span>
              </div>
              <h4 className="text-xs font-semibold text-slate-900 mt-1 line-clamp-1">
                {ledger.name}
              </h4>
              <div className="mt-2.5 flex items-baseline justify-between">
                <span className="text-sm font-bold font-mono text-slate-900 tabular-nums">
                  ${ledger.currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                <span className={`text-[10px] font-mono ${isRev ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {isRev ? 'CR' : 'DR'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Transactions Section & Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Table Filters & Search */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search reference, description, ledger..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 outline-none focus:border-slate-400 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Ledger selector */}
            <select
              value={selectedLedgerId}
              onChange={e => setSelectedLedgerId(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 outline-none"
            >
              <option value="all">All Ledgers</option>
              {ledgers.map(l => (
                <option key={l.id} value={l.id}>
                  {l.code} - {l.name}
                </option>
              ))}
            </select>

            {/* Type selector */}
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 outline-none"
            >
              <option value="all">All Types</option>
              <option value="income">Income / Credit</option>
              <option value="expense">Expense / Debit</option>
              <option value="transfer">Transfer</option>
              <option value="adjustment">Adjustment</option>
            </select>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          {filteredTransactions.length === 0 ? (
            <div className="p-8">
              <EmptyState
                icon={<Receipt className="h-6 w-6" />}
                title="No Transactions Found"
                description="No transactions match your current search and filter criteria. You can post a new transaction using the button above."
                actionLabel="Post First Transaction"
                onAction={() => setIsTxModalOpen(true)}
              />
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 font-medium font-mono text-[11px]">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Ref Number</th>
                  <th className="py-3 px-4">Ledger Account</th>
                  <th className="py-3 px-4">Category & Details</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4 text-right">Debit ($)</th>
                  <th className="py-3 px-4 text-right">Credit ($)</th>
                  <th className="py-3 px-4 text-right">Balance After</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal text-slate-800">
                {filteredTransactions.map(tx => {
                  const isCredit = tx.type === 'income';
                  return (
                    <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-500 whitespace-nowrap">
                        {tx.date.split('T')[0]}
                      </td>
                      <td className="py-3 px-4 font-mono font-medium text-slate-900">
                        {tx.referenceNumber}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-900">
                        {tx.ledgerName}
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <span className="font-medium text-slate-800 block truncate">{tx.category}</span>
                        <span className="text-[11px] text-slate-400 block truncate">{tx.description}</span>
                      </td>
                      <td className="py-3 px-4 capitalize text-slate-500">
                        {tx.paymentMethod.replace('_', ' ')}
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-900">
                        {!isCredit ? `$${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '—'}
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums text-emerald-700 font-medium">
                        {isCredit ? `$${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '—'}
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums font-semibold text-slate-900">
                        ${tx.balanceAfter.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal: Create New Ledger */}
      <Modal
        isOpen={isLedgerModalOpen}
        onClose={() => setIsLedgerModalOpen(false)}
        title="Establish New Institutional Ledger"
        subtitle="Chart of Accounts configuration with server-enforced double-entry validation"
      >
        <form onSubmit={handleCreateLedgerSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Ledger Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Science Laboratory Maintenance"
              value={ledgerForm.name}
              onChange={e => setLedgerForm({ ...ledgerForm, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-slate-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Account Code *</label>
              <input
                type="text"
                required
                placeholder="e.g. EXP-602"
                value={ledgerForm.code}
                onChange={e => setLedgerForm({ ...ledgerForm, code: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-mono focus:border-slate-400"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Ledger Type *</label>
              <select
                value={ledgerForm.type}
                onChange={e => setLedgerForm({ ...ledgerForm, type: e.target.value as LedgerType })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none bg-white"
              >
                <option value="expense">Expense (Cost Center)</option>
                <option value="revenue">Revenue (Income Center)</option>
                <option value="asset">Asset</option>
                <option value="liability">Liability</option>
                <option value="equity">Equity</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Opening Balance ($)</label>
            <input
              type="number"
              step="0.01"
              value={ledgerForm.openingBalance}
              onChange={e => setLedgerForm({ ...ledgerForm, openingBalance: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Description</label>
            <textarea
              rows={2}
              placeholder="Operational scope, compliance guidelines, or audit notes..."
              value={ledgerForm.description}
              onChange={e => setLedgerForm({ ...ledgerForm, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsLedgerModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
              Create Ledger
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Post New Transaction */}
      <Modal
        isOpen={isTxModalOpen}
        onClose={() => setIsTxModalOpen(false)}
        title="Post General Ledger Transaction"
        subtitle="Server-validated debit/credit entry with audit logging"
      >
        <form onSubmit={handleCreateTxSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Target Ledger *</label>
            <select
              required
              value={txForm.ledgerId}
              onChange={e => setTxForm({ ...txForm, ledgerId: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none bg-white"
            >
              {ledgers.map(l => (
                <option key={l.id} value={l.id}>
                  {l.code} - {l.name} (${l.currentBalance.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Transaction Type *</label>
              <select
                value={txForm.type}
                onChange={e => setTxForm({ ...txForm, type: e.target.value as TransactionType })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none bg-white"
              >
                <option value="expense">Expense (Debit)</option>
                <option value="income">Income (Credit)</option>
                <option value="transfer">Transfer</option>
                <option value="adjustment">Adjustment</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Amount ($) *</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                value={txForm.amount}
                onChange={e => setTxForm({ ...txForm, amount: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Reference / Voucher Number *</label>
              <input
                type="text"
                required
                value={txForm.referenceNumber}
                onChange={e => setTxForm({ ...txForm, referenceNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-mono"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Payment Method *</label>
              <select
                value={txForm.paymentMethod}
                onChange={e => setTxForm({ ...txForm, paymentMethod: e.target.value as PaymentMethod })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none bg-white"
              >
                <option value="bank_transfer">Bank Wire / ACH</option>
                <option value="online_gateway">Online Payment Gateway</option>
                <option value="credit_card">Corporate Credit Card</option>
                <option value="cheque">Bank Cheque</option>
                <option value="cash">Petty Cash</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Category *</label>
              <input
                type="text"
                required
                placeholder="e.g. Utility, Tuition, Payroll"
                value={txForm.category}
                onChange={e => setTxForm({ ...txForm, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Effective Date *</label>
              <input
                type="date"
                required
                value={txForm.date}
                onChange={e => setTxForm({ ...txForm, date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Audit Description</label>
            <input
              type="text"
              placeholder="e.g. Eversource monthly power invoice or lab reagent procurement"
              value={txForm.description}
              onChange={e => setTxForm({ ...txForm, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsTxModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
              Confirm & Post Entry
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
