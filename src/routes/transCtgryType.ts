import * as express from 'express';
import { getAllTransactionCategoryTypes } from '../controllers/transCtgryType';

const transCtgryTypesRouter = express.Router();

transCtgryTypesRouter.get('/', getAllTransactionCategoryTypes);

export default transCtgryTypesRouter;
