import * as express from 'express';
import {
  createTransactionCategory,
  getAllTransactionCategories,
} from '../controllers/transactionCategory';
import { tokenGuard } from '../middlewares/accessTokenGuard';

const transactionCategoryRouter = express.Router();

transactionCategoryRouter.use(tokenGuard);
transactionCategoryRouter.post('/', createTransactionCategory);
transactionCategoryRouter.get('/', getAllTransactionCategories);

export default transactionCategoryRouter;
