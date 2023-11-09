import { Request, Response, NextFunction } from 'express';
import { TransCtgyTypeService } from '../services/transCtgryType';

const getAllTransactionCategoryTypes = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const transactionCategoryTypes = await TransCtgyTypeService.getAll();

    res.json(<IClientResponse>{
      message: 'Transaction category types',
      data: transactionCategoryTypes,
      error: null,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export { getAllTransactionCategoryTypes };
