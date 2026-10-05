import { Request, Response } from 'express';
import { LedgerService } from '../services/ledgerService.js';
import { ledgerCreateSchema, transactionCreateSchema } from '../validators/joiSchemas.js';

export class LedgerController {
  static getLedgers(req: Request, res: Response) {
    try {
      const ledgers = LedgerService.getLedgers();
      return res.status(200).json({
        success: true,
        message: 'Ledgers retrieved successfully',
        data: ledgers,
        meta: { total: ledgers.length },
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: err.message || 'Error fetching ledgers',
      });
    }
  }

  static getLedgerById(req: Request, res: Response) {
    try {
      const result = LedgerService.getLedgerById(req.params.id);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (err: any) {
      return res.status(404).json({
        success: false,
        message: err.message,
      });
    }
  }

  static createLedger(req: Request, res: Response) {
    const { error, value } = ledgerCreateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        errors: error.details,
      });
    }

    try {
      const createdBy = (req.body.createdBy as string) || 'Nolan Hayes, CPA';
      const newLedger = LedgerService.createLedger({
        name: value.name,
        code: value.code,
        type: value.type,
        description: value.description,
        openingBalance: value.openingBalance,
        createdBy,
      });

      return res.status(201).json({
        success: true,
        message: `Ledger "${newLedger.name}" created successfully`,
        data: newLedger,
      });
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message || 'Failed to create ledger',
      });
    }
  }

  static getTransactions(req: Request, res: Response) {
    try {
      const ledgerId = req.query.ledgerId as string | undefined;
      const transactions = LedgerService.getTransactions(ledgerId);
      return res.status(200).json({
        success: true,
        data: transactions,
        meta: { total: transactions.length },
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  static createTransaction(req: Request, res: Response) {
    const { error, value } = transactionCreateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        errors: error.details,
      });
    }

    try {
      const createdBy = (req.body.createdBy as string) || 'Nolan Hayes, CPA';
      const result = LedgerService.createTransaction({
        ledgerId: value.ledgerId,
        type: value.type,
        amount: value.amount,
        date: value.date,
        category: value.category,
        paymentMethod: value.paymentMethod,
        referenceNumber: value.referenceNumber,
        description: value.description,
        createdBy,
      });

      return res.status(201).json({
        success: true,
        message: 'Transaction verified and ledger balance synchronized',
        data: result,
      });
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }

  static getFinancialSummary(req: Request, res: Response) {
    try {
      const summary = LedgerService.getFinancialSummary();
      return res.status(200).json({
        success: true,
        data: summary,
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}
