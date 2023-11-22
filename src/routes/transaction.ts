import * as express from 'express';
import {
  createTransaction,
  getAllTransactions,
} from '../controllers/transaction';
import { tokenGuard } from '../middlewares/accessTokenGuard';

const transactionsRouter = express.Router();

transactionsRouter.use(tokenGuard);
transactionsRouter.post('/', createTransaction);
transactionsRouter.get('/', getAllTransactions);

export default transactionsRouter;
