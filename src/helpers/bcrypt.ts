/* eslint-disable @typescript-eslint/no-shadow */
import * as bcrypt from 'bcrypt';

const comparePassword = (plaintext: string, hash: string): Promise<boolean> =>
  new Promise<boolean>((resolve, reject) => {
    bcrypt.compare(plaintext, hash, (err, result) => {
      if (err) {
        reject(err);
      }

      resolve(result);
    });
  });

const hashPassword = (password: string): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      }

      bcrypt.hash(password, salt, (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  });

export { hashPassword, comparePassword };
