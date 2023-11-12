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

  interface ITransactionCategoryType {
    label: string;
    description: string;
  }

  interface ITransactionCategory {
    id?: string;
    name: string;
    description: string;
    type_id?: string;
    type?: ITransactionCategoryType;
  }

  interface ITransaction {
    id?: string;
    amount: number;
    description: string;
    category_id?: string;
    catedory?: ITransactionCategory;
  }
}

export {};
