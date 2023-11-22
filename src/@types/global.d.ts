declare global {
  interface IClientResponse {
    message: string;
    data: unknown;
    error: unknown;
    success: boolean;
  }

  interface IUser {
    id?: string;
    name: string;
    email: string;
    password?: string;
  }

  interface ITransactionCategoryType {
    label: string;
    description: string;
  }

  interface ITransactionCategory {
    id?: string;
    name: string;
    description: string;
    type_id?: string;
    owner_id?: string;
    type?: ITransactionCategoryType;
    owner?: IUser;
  }

  interface ITransaction {
    id?: string;
    amount: number;
    description: string;
    category_id?: string;
    category?: ITransactionCategory;
  }

  // Add user to Req in express namespace
  namespace Express {
    interface Request {
      auth: IUser;
    }
  }
}

export {};
