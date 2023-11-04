import * as jwt from 'jsonwebtoken';

const signAccessToken = (payload: object, KEY: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      KEY,
      {
        expiresIn: '25d',
      },
      (error, token) => {
        if (error) {
          reject(error);
        }

        resolve(token);
      },
    );
  });
};

const verifyToken = (token: string, KEY: string): Promise<jwt.JwtPayload> => {
  return new Promise<jwt.JwtPayload>((resolve, reject) => {
    jwt.verify(token, KEY, (err, decoded) => {
      if (err) {
        reject(err);
      }

      resolve(decoded as jwt.JwtPayload);
    });
  });
};

export { verifyToken, signAccessToken };
