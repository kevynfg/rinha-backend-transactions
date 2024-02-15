import { Transaction } from "../../models/transaction";

export interface CustomerRepository {
  createTransaction: (transaction: Transaction) => Promise<Transaction>;
  getCustomerLastTransactions: (id: number) => Promise<FundsResponse>;
  getCustomer: (id: number) => Promise<any>;
}

export type FundsResponse = {
  saldo: {
    total: number;
    data_extrato: string;
    limite: number;
  },
  ultimas_transacoes: {
    valor: number;
    tipo: "d" | "c";
    descricao: string;
    realizada_em: string;
  }[]
}