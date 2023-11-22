import User from '../models/user';
import { AuthValidationService } from './validations/auth';
import * as error from 'http-errors';
import { comparePassword, hashPassword } from '../helpers/bcrypt';
import { signAccessToken } from '../helpers/jwt';

export class AuthService {
  static create = async (
    user: Map<string, any>,
  ): Promise<Error | { user: IUser; accessToken: string }> => {
    return new Promise<Error | { user: IUser; accessToken: string }>(
      async (resolve, reject) => {
        try {
          const validUser: IUser =
            await AuthValidationService.register.validateAsync(user);

          if (validUser) {
            const isExist = await User.findOne({
              where: { email: validUser.email },
            });

            if (!isExist) {
              const hash = await hashPassword(validUser.password);

              const newUser = await User.create({ ...user, password: hash });

              const accessToken = await signAccessToken(
                { name: newUser.name, email: newUser.email, id: newUser.id },
                process.env.ACCESS_TOKEN_SECRET,
              );

              resolve({
                user: newUser,
                accessToken,
              });
            } else {
              reject(
                error.Conflict(
                  'A user with the same adress email already exists',
                ),
              );
            }
          }
        } catch (error) {
          reject(error);
        }
      },
    );
  };

  static login = async (credetials: {
    email: string;
    password: string;
  }): Promise<Error | { user: IUser; accessToken: string }> => {
    return new Promise<Error | { user: IUser; accessToken: string }>(
      async (resolve, reject) => {
        try {
          const validCredentials =
            await AuthValidationService.login.validateAsync(credetials);

          console.log(4);

          if (validCredentials) {
            const user = await User.findOne({
              where: { email: validCredentials.email },
            });

            if (user) {
              const passwordMatch = await comparePassword(
                validCredentials.password,
                user.password,
              );

              if (passwordMatch) {
                const accessToken = await signAccessToken(
                  { name: user.name, email: user.email },
                  process.env.ACCESS_TOKEN_SECRET,
                );

                resolve({
                  user,
                  accessToken,
                });
              } else {
                reject(error.NotFound('Email or password incorect'));
              }
            } else {
              reject(error.NotFound('Email or password incorect'));
            }
          }
        } catch (error) {
          reject(error);
        }
      },
    );
  };
}
