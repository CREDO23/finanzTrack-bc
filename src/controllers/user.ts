import { UUID } from 'crypto';
import { UserService } from '../services/user';
import { Request, Response, NextFunction } from 'express';

const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const users = await UserService.getAll();

    res.json(<IClientResponse>{
      message: 'Users',
      data: users,
      error: null,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const getOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await UserService.getOne(id as UUID);

    res.json(<IClientResponse>{
      message: 'User',
      data: user,
      error: null,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
export { getAllUsers, getOneUser };
