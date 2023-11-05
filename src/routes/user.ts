import * as express from 'express';
import { getAllUsers } from '../controllers/user';

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);

export default usersRouter;
