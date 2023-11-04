declare global {
  interface IClientResponse {
    message: string;
    data: unknown;
    error: unknown;
    success: boolean;
  }

  interface IUser {
    name: string;
    email: string;
    password?: string;
  }
}

export {};
