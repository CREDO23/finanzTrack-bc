import * as express from 'express';
import {
  createTransaction,
  getAllTransactions,
} from '../controllers/transaction';

const transactionsRouter = express.Router();

transactionsRouter.post('/', createTransaction);
transactionsRouter.get('/', getAllTransactions);

export default transactionsRouter;
