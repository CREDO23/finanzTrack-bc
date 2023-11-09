import { Request, Response, NextFunction } from 'express';
import { TransactionService } from '../services/transaction';

const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { transaction, category_id } = req.body;

    const newTransaction = await TransactionService.create(
      transaction,
      category_id,
    );

    res.json(<IClientResponse>{
      message: 'Transaction created successfully',
      data: newTransaction,
      error: null,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const getAllTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const transactions = await TransactionService.getAll();

    res.json(<IClientResponse>{
      message: 'Transactions',
      data: transactions,
      error: null,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export { createTransaction, getAllTransactions };
