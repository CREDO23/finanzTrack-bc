import * as express from 'express';
import { getAllTransactionCategoryTypes } from '../controllers/transCtgryType';
import { tokenGuard } from '../middlewares/accessTokenGuard';

const transCtgryTypesRouter = express.Router();

transCtgryTypesRouter.use(tokenGuard);
transCtgryTypesRouter.get('/', getAllTransactionCategoryTypes);

export default transCtgryTypesRouter;
