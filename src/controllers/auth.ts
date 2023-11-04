import { AuthService } from '../services/auth';
import { Request, Response, NextFunction } from 'express';

const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const newUser = await AuthService.create(req.body);

    res.json(<IClientResponse>{
      message: 'User created successfully',
      data: newUser,
      error: null,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await AuthService.login(req.body);

    res.json(<IClientResponse>{
      message: 'Logged in successfully',
      data: result,
      error: null,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export { register, login };
