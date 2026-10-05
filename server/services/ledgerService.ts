import { db } from '../models/mockDb.js';
import { Ledger, LedgerTransaction, LedgerType, PaymentMethod, TransactionType } from '../types/index.js';

export class LedgerService {
  static getLedgers() {
    return db.getLedgers();
  }

  static getLedgerById(id: string) {
    const ledger = db.getLedgerById(id);
    if (!ledger) throw new Error('Ledger not found');
    const transactions = db.getTransactions(id);
    return { ledger, transactions };
  }

  static createLedger(data: {
    name: string;
    code: string;
    type: LedgerType;
    description: string;
    openingBalance: number;
    createdBy: string;
  }) {
    // Ensure code uniqueness
    const existing = db.getLedgers().find(l => l.code.toUpperCase() === data.code.toUpperCase());
    if (existing) {
      throw new Error(`Ledger with code ${data.code} already exists`);
    }

    return db.createLedger(data);
  }

  static getTransactions(ledgerId?: string) {
    return db.getTransactions(ledgerId);
  }

  static createTransaction(data: {
    ledgerId: string;
    type: TransactionType;
    amount: number;
    date: string;
    category: string;
    paymentMethod: PaymentMethod;
    referenceNumber: string;
    description: string;
    createdBy: string;
  }) {
    return db.createTransaction(data);
  }

  static getFinancialSummary() {
    const ledgers = db.getLedgers();
    const transactions = db.getTransactions();

    const revenueLedgers = ledgers.filter(l => l.type === 'revenue');
    const expenseLedgers = ledgers.filter(l => l.type === 'expense');

    const totalRevenue = revenueLedgers.reduce((acc, l) => acc + l.currentBalance, 0);
    const totalExpenses = expenseLedgers.reduce((acc, l) => acc + l.currentBalance, 0);
    const netSurplus = totalRevenue - totalExpenses;

    const recentTransactions = transactions.slice(0, 10);

    return {
      totalRevenue,
      totalExpenses,
      netSurplus,
      activeLedgersCount: ledgers.filter(l => l.status === 'active').length,
      recentTransactions,
    };
  }
}
