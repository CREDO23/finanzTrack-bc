import { TransactionCategoryService } from '../services/transactionCategory';
import { Request, Response, NextFunction } from 'express';

const createTransactionCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { category, type_id, owner_id } = req.body;

    const newTransactionCategory = await TransactionCategoryService.create(
      category,
      type_id,
      owner_id,
    );

    res.json(<IClientResponse>{
      message: 'Transaction category created successfully',
      data: newTransactionCategory,
      error: null,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const getAllTransactionCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const transactionCategories = await TransactionCategoryService.getAll();

    res.json(<IClientResponse>{
      message: 'Transaction categories',
      data: transactionCategories,
      error: null,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export { createTransactionCategory, getAllTransactionCategories };
