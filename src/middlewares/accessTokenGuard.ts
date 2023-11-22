import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../helpers/jwt';
import * as error from 'http-errors';

dotenv.config();

export const tokenGuard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req?.headers?.authorization?.split(' ')[1];

    if (token) {
      const payload = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET);

      req.auth = payload as IUser;

      next();
    } else {
      next(error.Unauthorized('Unauthorized'));
    }
  } catch (error) {
    next(error);
  }
};
