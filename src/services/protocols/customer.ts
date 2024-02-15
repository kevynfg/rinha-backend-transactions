import { Transaction } from "../../data/models/transaction";

export interface ICustomer {
  createTransaction: (transaction: Transaction) => Promise<TransactionResponse>;
  getCustomer: (id: number) => Promise<any>;
}

export type TransactionResponse = {
  limite: number;
  saldo: number;
}