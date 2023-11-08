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
    label: 'expense' | 'income';
    description: string;
  }

  interface ITransactionCategory {
    name: string;
    description: string;
  }

  interface ITransaction {
    amount: number;
    description: string;
  }
}

export {};
