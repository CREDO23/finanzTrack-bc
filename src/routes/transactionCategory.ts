import * as express from 'express';
import {
  createTransactionCategory,
  getAllTransactionCategories,
} from '../controllers/transactionCategory';

const transactionCategoryRouter = express.Router();

transactionCategoryRouter.post('/', createTransactionCategory);
transactionCategoryRouter.get('/', getAllTransactionCategories);

export default transactionCategoryRouter;
