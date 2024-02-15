import { Transaction } from "../../data/models/transaction";

export interface ICustomer {
  createTransaction: (id: string, transaction: Transaction) => Promise<TransactionResponse | number>;
  getCustomer: (id: number) => Promise<any>;
}

export type TransactionResponse = {
  limite: number;
  saldo: number;
}