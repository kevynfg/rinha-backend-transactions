
export interface CustomerRepository {
  createTransaction: (transaction: TransactionRequest) => Promise<any>;
  getCustomerLastTransactions: (id: number) => Promise<any>;
  getCustomer: (id: number) => Promise<any>;
}

export type TransactionRequest = {
  cliente_id: number;
  valor: number;
  tipo: "d" | "c";
  descricao: string;
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