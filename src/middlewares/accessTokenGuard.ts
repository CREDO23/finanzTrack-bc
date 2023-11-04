import * as dotenv from 'dotenv';
import { expressjwt } from 'express-jwt';

dotenv.config();

export const verifyToken = () =>
  expressjwt({
    secret: process.env.SECRET_KEY_ACCESS_TOKEN as string,
    algorithms: ['HS256'],
  }).unless({
    path: ['/api/auth/register', '/api/auth/login'],
  });
