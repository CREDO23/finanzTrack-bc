import { UUID } from 'crypto';
import { User } from '../models/user';
import * as error from 'http-errors';

export class UserService {
  static getAll = async (): Promise<Error | IUser[]> => {
    return new Promise<Error | IUser[]>(async (resolve, reject) => {
      try {
        const users = await User.findAll({ raw: true });

        resolve(users);
      } catch (error) {
        reject(error);
      }
    });
  };

  static getOne = async (id: UUID): Promise<Error | IUser> => {
    return new Promise<Error | IUser>(async (resolve, reject) => {
      try {
        const user = await User.findByPk(id);

        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  };
}
