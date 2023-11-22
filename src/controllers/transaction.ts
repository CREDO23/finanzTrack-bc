import { Request, Response, NextFunction } from 'express';
import { TransactionService } from '../services/transaction';
import { UUID } from 'crypto';

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
    const user_id = req.auth.id;

    const transactions = await TransactionService.getAll(user_id as UUID);

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
